"use client"

import {cn} from "@/lib/utils";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ImageIcon, X} from "lucide-react";
import {useCoverImage} from "@/hooks/use-cover-image";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useParams} from "next/navigation";
import {Id} from "@/convex/_generated/dataModel";

type Props = {
    url?: string
    preview?: boolean
};

function Cover({url, preview}: Props) {
    const coverImage = useCoverImage()
    const params = useParams()

    const removeCover = useMutation(api.documents.removeCoverImage)

    const onRemove = () => {
        removeCover({id: params.documentId as Id<"documents">})
    }

    return (
        <div className={cn("relative w-full h-[35vh] group", !url && "h-[12vh]", url && "bg-muted")}>
            {!!url && <Image src={url} fill alt={"cover"} className={"object-cover"}/>}
            {url && !preview &&
                <div
                    className={"opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2"}>
                    <Button onClick={coverImage.onOpen}
                            className={"text-muted-foreground text-xs"}
                            size={"sm"}
                            variant={"outline"}
                    >
                        <ImageIcon className={"h-4 w-4 mr-2"}/>
                        Change cover
                    </Button>
                    <Button onClick={onRemove}
                            className={"text-muted-foreground text-xs"}
                            size={"sm"}
                            variant={"outline"}
                    >
                        <X className={"h-4 w-4 mr-2"}/>
                        Remove
                    </Button>
                </div>}
        </div>
    );
}

export default Cover;
