"use client"

import {useParams} from "next/navigation";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";
import {MenuIcon} from "lucide-react";
import Title from "@/app/(main)/_components/title";
import Banner from "@/app/(main)/_components/banner";
import Menu from "@/app/(main)/_components/menu";

type Props = {
    isCollapsed: boolean;
    onResetWidth: () => void
};

function Navbar({isCollapsed, onResetWidth}: Props) {


    const params = useParams()
    const document = useQuery(api.documents.getById, {documentId: params.documentId as Id<"documents">})

    if (document === undefined) {
        return <nav
            className={"bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4 justify-between"}>
            <Title.Skeleton/>
            <div className={"flex items-center gap-x-2"}>
                <Menu.Skeleton/>
            </div>
        </nav>
    }

    if (document === null) {
        return null
    }


    return (
        <>
            <nav className={"bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4"}>
                {isCollapsed && <MenuIcon className={"w-6 h-6 text-muted-foreground"}/>}
                <div className={"flex items-center justify-between w-full"}>
                    <Title initialData={document}/>
                    <div>
                        <Menu id={document._id}/>
                    </div>
                </div>
            </nav>
            {document.isArchived && (<Banner id={document._id}/>)}
        </>
    );
}

export default Navbar;
