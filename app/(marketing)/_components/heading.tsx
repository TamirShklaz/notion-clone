"use client";

import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import {useConvexAuth} from "convex/react";
import {Spinner} from "@/components/spinner";
import Link from "next/link";
import {SignInButton} from "@clerk/clerk-react";

type Props = {};
const Heading = (props: Props) => {
    const {isAuthenticated, isLoading} = useConvexAuth()

    return (
        <div className={"max-w-3xl space-y-4"}>
            <h1 className={"text-3xl sm:text-5xl md:text-6xl font-bold"}>Your ideas, documents & plans unified. Welcome
                to &nbsp;
                <span className={"underline"}>Jotion</span></h1>
            <h3 className={"text-base sm:text-xl md:text-2xl font-medium"}>Joion is the connected workspace where
                better, faster work happens.</h3>
            {isAuthenticated && !isLoading &&
                <Button>
                    <Link href={"/documents"}>
                        Enter Jotion
                    </Link>
                    <ArrowRight className={"h-4 w-4 ml-2"}/>

                </Button>}
            {isLoading &&
                <div className={"w-full flex items-center justify-center"}>
                    <Spinner size={"lg"}/>
                </div>
            }
            {!isAuthenticated && !isLoading &&
                <SignInButton mode={"modal"}>
                    <Button size={"lg"}>Get Jotion Free
                        <ArrowRight className={"h-4 w-4 ml-2"}/>
                    </Button>
                </SignInButton>}


        </div>
    );
};
export default Heading;
