import { create } from "zustand";

interface useClosedProps {
    closed: boolean;
    onExpand: () => void;
    onColapse: () => void;
};

export const useClosed = create<useClosedProps>((set) => ({
    closed: true,
    onExpand: () => set((state) => ({ closed: false })),
    onColapse: () => set((state) => ({ closed: true }))
}));