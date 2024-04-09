import Image from "next/image";

type Props = {};
const Heroes = (props: Props) => {
    return (
        <div className={"flex flex-col items-center justify-center max-w-5xl"}>
            <div className={"flex items-center"}>
                <div className={"relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]"}>
                    <Image src={"/documents.png"} alt={"Documents"} fill className={"object-contain dark:hidden"}/>
                    <Image src={"/documents-dark.png"} alt={"Documents"} fill className={"object-contain hidden dark:block"}/>

                </div>
                <div className={"relative h-[400px] w-[400px] hidden md:block"}>
                    <Image className={"object-contain dark:hidden"} fill src={"/reading.png"} alt={"Reading"}/>
                    <Image className={"object-contain hidden dark:block"} fill src={"/reading-dark.png"} alt={"Reading"}/>
                </div>

            </div>
        </div>
    );
};
export default Heroes;
