"use client"

import {useUser} from "@clerk/clerk-react";
import {useRouter} from "next/navigation";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useSearch} from "@/hooks/use-search";
import {useEffect, useState} from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {FileIcon} from "lucide-react";

type Props = {};

function SearchCommand({}: Props) {

    const {user} = useUser()
    const router = useRouter()
    const documents = useQuery(api.documents.getSearch)

    const [isMounted, setMounted] = useState(false)

    const toggle = useSearch((state) => state.toggle)
    const isOpen = useSearch((state) => state.isOpen)
    const onClose = useSearch((state) => state.onClose)


    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggle()
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [toggle]);


    const onSelect = (id: string) => {
        router.push(`/documents/${id}`)
        onClose()
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={"Search"}/>

            <CommandList>
                <CommandEmpty>
                    No results found
                </CommandEmpty>
                <CommandGroup heading={"Documents"}>
                    {documents?.map((doc) => (
                        <CommandItem key={doc._id} value={`${doc._id}-${doc.title}`}
                                     onSelect={onSelect}
                        >
                            {doc.icon ?
                                (<p className={"mr-2 text-[18px]"}>{doc.icon}</p>)
                                : <FileIcon className={"mr-r h-4 w-4"}/>
                            }
                            <span>
                        {doc.title}
                            </span>
                        </CommandItem>
                    ))}

                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}

export default SearchCommand;
