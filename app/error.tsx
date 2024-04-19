"use client"

import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

type Props = {};

function Error({}: Props) {
    return (
        <div className={"h-full flex flex-col items-center justify-center space-y-4"}>
            <Image
                className={"dark:hidden"}
                src={"/error.png"} alt={"Error"} height={300} width={300}/>
            <Image
                className={"hidden dark:block"}
                src={"/error.png"} alt={"Error"} height={300} width={300}/>
            <h2 className={"text-xl font-medium"}>Something went wrong</h2>
            <Button asChild>
                <Link href={"/documents"}>
                    Go back
                </Link>
            </Button>
        </div>
    );
}

export default Error;
