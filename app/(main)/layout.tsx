"use client"

import {ReactNode} from "react";
import {useConvexAuth} from "convex/react";
import {Spinner} from "@/components/spinner";
import {redirect} from "next/navigation";
import Navigation from "@/app/(main)/_components/navigation";
import SearchCommand from "@/components/search-command";

type Props = {};
const Layout = ({children}: { children: ReactNode }) => {
    const {isAuthenticated, isLoading} = useConvexAuth()

    if (isLoading) {
        return <div className={"h-full flex items-center justify-center"}><Spinner size={"lg"}/></div>
    }
    if (!isAuthenticated) {
        return redirect("/")
    }


    return (
        <div
            className={"h-full flex dark:bg-darkBg"}
        >
            <Navigation/>
            <main className={"flex-1 h-full overflow-y-auto"}>
                <SearchCommand/>
                {children}
            </main>

        </div>
    );
};
export default Layout;
