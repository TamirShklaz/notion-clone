"use client"

import Image from "next/image";
import {useUser} from "@clerk/clerk-react";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

type Props = {};
const Page = (props: Props) => {

    const {user} = useUser()
    const create = useMutation(api.documents.create)
    const router = useRouter()

    const onCreate = async () => {
        const promise = create({title: "New note"})
            .then((id) => router.push(`/documents/${id}`))
        toast.promise(promise, {
            loading: "Creating note...",
            success: "New note created",
            error: "Failed to create note"
        })
    }

    return (
        <div className={"h-full flex flex-col items-center justify-center space-y-4"}>
            <Image src={"/empty.png"} height={300} width={300} alt={"Empty"}
                   className={"dark:hidden"}
            />
            <Image src={"/empty.png"} height={300} width={300} alt={"Empty"}
                   className={"hidden dark:block"}
            />
            <h2>
                Welcome to {user?.firstName}&apos; Jotion
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className={"h-4 w-4 mr-2"}/>
                Create a note
            </Button>
        </div>

    );
};
export default Page;
