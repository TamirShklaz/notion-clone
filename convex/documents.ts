import {v} from "convex/values"
import {mutation, query} from "@/convex/_generated/server";
import arg from "arg";
import {Id} from "@/convex/_generated/dataModel";


export const getSidebar = query({
    args: {
        parentDocument: v.optional(v.id("documents"))
    }, handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthenticated")
        }
        const userId = identity.subject
        const documents = await ctx.db.query("documents")
            .withIndex("by_user_parent", (q) =>
                (q.eq("userId", userId).eq("parentDocument", args.parentDocument))
            ).filter((q) => q.eq(q.field("isArchived"), false))
            .order("desc")
            .collect()

        return documents
    }
})

export const archive = mutation({
    args: {id: v.id("documents")},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthenticated")
        }
        const userId = identity.subject
        const existingDoc = await ctx.db.get(args.id)
        if (!existingDoc) {
            throw new Error("Document not found")
        }
        if (existingDoc.userId !== userId) {
            throw new Error("Unauthorized")
        }

        const recursiveArchive = async (docId: Id<"documents">) => {
            const children = await ctx.db.query("documents")
                .withIndex("by_user_parent",
                    (q) => (
                        q.eq("userId", userId).eq("parentDocument", docId)

                    )).collect()
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: true
                })
                await recursiveArchive(child._id)
            }
        }

        const document = await ctx.db.patch(args.id, {
            isArchived: true
        })
        recursiveArchive(args.id)

        return document
    }
})

export const get = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthenticated")
        }

        const userId = identity.subject
        const documents = await ctx.db.query("documents").collect()
        return documents
    }
})

export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Unauthenticated")
        }

        const userId = identity.subject
        const document = await ctx.db.insert("documents", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId: userId,
            isArchived: false,
            isPublished: false
        })
        return document
    }
})