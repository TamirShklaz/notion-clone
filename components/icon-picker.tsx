"use client"

import {useTheme} from "next-themes";
import EmojiPicker, {Theme} from "emoji-picker-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

type Props = {
    onChange: (icon: string) => void;
    children: React.ReactNode;
    asChild?: boolean;
};

function IconPicker({onChange, children, asChild}: Props) {
    const {resolvedTheme} = useTheme()

    const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap

    const themeMap = {
        dark: Theme.DARK,
        light: Theme.LIGHT
    }

    const theme = themeMap[currentTheme]

    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className={"p-0 w-full border-none shadow-none"}>
                <EmojiPicker height={350} theme={theme} onEmojiClick={(e) => onChange(e.emoji)}/>
            </PopoverContent>
        </Popover>
    );
}

export default IconPicker;
