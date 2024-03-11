import { create } from "zustand";

interface useSelectedProps {
    selected: string;
    onSelect: (item: string) => void;
};

export const useSelected = create<useSelectedProps>((set) => ({
    selected: "/dashboard",
    onSelect: (item) => set((state) => ({ selected: item }))
}));