import {create} from "zustand";
import {SearchStore} from "@/hooks/use-search";

export type SettingsStore = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}


export const useSettings = create<SettingsStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))