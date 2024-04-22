"use client"

import {BlockNoteEditor, PartialBlock} from "@blocknote/core";
import {BlockNoteView, useBlockNote, useCreateBlockNote} from "@blocknote/react";
import {useTheme} from "next-themes";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import {useEdgeStore} from "@/lib/edgestore";

type Props = {
    onDocChange: (value: string) => void
    initialContent?: string
    editable?: boolean
};

function Editor({onDocChange, initialContent, editable}: Props) {

    const {edgestore} = useEdgeStore()
    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        })
        return response.url
    }

    const {resolvedTheme} = useTheme()
    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile: handleUpload
    })

    return (
        <BlockNoteView editor={editor}
                       theme={resolvedTheme === "dark" ? "dark" : "light"}
                       editable={editable}
                       onChange={() => {
                           onDocChange(JSON.stringify(editor.document))
                       }}/>
    );
}

export default Editor;
