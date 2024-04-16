import {ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash} from "lucide-react";
import {ElementRef, useEffect, useRef, useState} from "react";
import {useMediaQuery} from "usehooks-ts";
import {useParams, usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {UserItem} from "@/app/(main)/_components/user-item";
import {useMutation, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import Item from "@/app/(main)/_components/item";
import {toast} from "sonner";
import DocumentList from "@/app/(main)/_components/document-list";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import TrashBox from "@/app/(main)/_components/trash-box";
import {useSearch} from "@/hooks/use-search";
import {useSettings} from "@/hooks/use-settings";
import Navbar from "@/app/(main)/_components/navbar";

type Props = {};
const Navigation = (props: Props) => {
    const pathname = usePathname()
    const isMobile = useMediaQuery("(max-width: 768px)")
    const search = useSearch()
    const settings = useSettings()
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    const params = useParams()
    const create = useMutation(api.documents.create)
    const documents = useQuery(api.documents.get)


    useEffect(() => {
        if (isMobile) {
            collapse()
        } else {
            resetWidth()
        }
    }, [isMobile, pathname]);


    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()

        isResizingRef.current = true
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)

    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return
        let newWidth = e.clientX
        if (newWidth < 240) newWidth = 240
        if (newWidth > 480) newWidth = 480

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`
            navbarRef.current.style.setProperty("left", `${newWidth}px`)
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
        }
    }

    const handleMouseUp = (e: MouseEvent) => {
        isResizingRef.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false)
            setIsResetting(true)

            sidebarRef.current.style.width = isMobile ? "100%" : "240px"
            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px")
            navbarRef.current.style.setProperty("width", isMobile ? "100%" : `calc(100% - 240px)`)
            setTimeout(() => setIsResetting(false), 300)
        }
    }

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true)
            setIsResetting(true)

            sidebarRef.current.style.width = "0"
            navbarRef.current.style.setProperty("left", "0")
            navbarRef.current.style.setProperty("width", "100%")
            setTimeout(() => setIsResetting(false), 300)
        }
    }

    const handleCreate = () => {
        const promise = create({title: "Untitled"})
        toast.promise(promise, {
            loading: "Creating...",
            success: "Document created",
            error: "Failed to create document"
        })
    }


    return (
        <>
            <aside ref={sidebarRef} className={
                cn("group/sidebar h-full bg-secondary" +
                    "overflow-y-auto relative flex w-60 flex-col z-[99999]", isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0")}>
                {!isCollapsed && <>
                    <div role={"button"}
                         onClick={collapse}
                         className={
                             cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" +
                                 "opacity-0 group-hover/sidebar:opacity-100 transition cursor-pointer right-2 top-3 absolute",
                                 isMobile && "opacity-100"
                             )}
                    >
                        <ChevronsLeft className={"h-6 w-6"}/>
                    </div>
                    <UserItem/>
                    <Item label={"Search"} icon={Search} isSearch onClick={search.onOpen}/>
                    <Item label={"Settings"} icon={Settings} onClick={settings.onOpen}/>

                    <Item onClick={handleCreate} label={"New Page"} icon={PlusCircle}/>

                    <div className={"mt-4"}>
                        <DocumentList/>
                        <Item label={"New page"} onClick={handleCreate} icon={Plus}/>
                        <Popover>
                            <PopoverTrigger className={"w-full"}>
                                <Item label={"Trash"} icon={Trash}/>
                            </PopoverTrigger>
                            <PopoverContent side={isMobile ? "bottom" : "right"} className={"p-0 w-72"}>
                                <TrashBox/>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div
                        onMouseDown={handleMouseDown}
                        onClick={resetWidth}
                        className={"opacity-0 group-hover/sidebar:opacity-100 " +
                            "transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"}/>
                </>}

            </aside>
            <div ref={navbarRef} className={cn("absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                isResetting && "transition-all ease-in-out duration-300",
                isMobile && "left-0 w-full")}>
                {!!params.documentId && <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth}/>}
                {/*<nav className={"bg-transparent px-3 py-2 w-full"} onClick={resetWidth}>*/}
                {/*    {isCollapsed && <MenuIcon role={"button"} className={"h-6 w-6 text-muted-foreground"}/>}*/}
                {/*</nav>*/}
            </div>

        </>
    );
};
export default Navigation;
