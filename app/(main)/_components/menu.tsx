"use client"

import {Id} from "@/convex/_generated/dataModel";
import {useRouter} from "next/navigation";
import {useUser} from "@clerk/clerk-react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal, Trash} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";

type Props = {
    id: Id<"documents">
};

function Menu({id}: Props) {

    const router = useRouter()
    const {user} = useUser()
    const archive = useMutation(api.documents.archive)

    const onArchive = () => {
        const promise = archive({id})

        toast.promise(promise, {
            loading: "Archiving...",
            success: "Archived",
            error: "Failed to archive"
        })

    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"sm"} variant={"ghost"}>
                    <MoreHorizontal className={"h-4 w-4"}/>
                </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent
                className={"w-60"}
                align={"end"}
                alignOffset={8}
                forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className={"h-4 w-4 mr-2"}/>
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <div className={"text-xs text-muted-foreground p-2"}>
                    Last edited by: {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className={"w-10 h-10"}/>
    )
}

export default Menu;
