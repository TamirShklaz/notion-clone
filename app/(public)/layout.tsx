type Props = { children: React.ReactNode };

function Layout({children}: Props) {
    return (
        <div className={"h-full dark:bg-[#1F1F1F]"}>
            {children}
        </div>
    );
}

export default Layout;
