import { create } from "zustand";
import { persist } from "zustand/middleware";
import { JEWELS, SLOTS } from "./catalog";

type Open = [number, number, number, number];

interface CapstoneState {
  open: Open;
  core: number;
  held: string | null;
  placed: Record<string, string>;
  intro: boolean;
  setOpen: (i: number, v: number) => void;
  toggleFace: (i: number) => void;
  setAllOpen: (v: number) => void;
  setCore: (v: number) => void;
  hold: (id: string | null) => void;
  place: (slotId: string) => void;
  fill: () => void;
  clear: () => void;
  dismissIntro: () => void;
}

const emptyOpen = (): Open => [0, 0, 0, 0];

export const useSanctum = create<CapstoneState>()(
  persist(
    (set, get) => ({
      open: emptyOpen(),
      core: 0,
      held: null,
      placed: {},
      intro: true,
      setOpen: (i, v) =>
        set((s) => {
          const open: Open = [...s.open];
          open[i] = v;
          return { open };
        }),
      toggleFace: (i) =>
        set((s) => {
          const open: Open = [...s.open];
          open[i] = open[i] > 0.5 ? 0 : 1;
          return { open };
        }),
      setAllOpen: (v) => set({ open: [v, v, v, v], core: v === 0 ? 0 : get().core }),
      setCore: (v) => set({ core: v, open: v ? [1, 1, 1, 1] : get().open }),
      hold: (held) => set({ held }),
      place: (slotId) => {
        const slot = SLOTS.find((s) => s.id === slotId);
        const { held, placed, open } = get();
        const nextOpen: Open = [...open];
        if (slot && slot.face !== "shrine") nextOpen[slot.face] = 1;

        if (!held) {
          if (placed[slotId]) {
            const id = placed[slotId];
            const next = { ...placed };
            delete next[slotId];
            set({ placed: next, held: id, open: nextOpen });
          }
          return;
        }
        const next = { ...placed };
        const displaced = next[slotId];
        next[slotId] = held;
        set({ placed: next, held: displaced ?? null, open: nextOpen });
      },
      fill: () => {
        const next: Record<string, string> = {};
        const n = Math.min(JEWELS.length, SLOTS.length);
        for (let i = 0; i < n; i++) next[SLOTS[i].id] = JEWELS[i].id;
        set({ placed: next, held: null, open: [1, 1, 1, 1] });
      },
      clear: () => set({ placed: {}, held: null }),
      dismissIntro: () => set({ intro: false }),
    }),
    { name: "azure-capstone-v1", skipHydration: true },
  ),
);

export function jewelInTray(placed: Record<string, string>, held: string | null, id: string) {
  if (held === id) return false;
  return !Object.values(placed).includes(id);
}

export function bloomOpen() {
  const { setOpen } = useSanctum.getState();
  for (let i = 0; i < 4; i++) {
    window.setTimeout(() => setOpen(i, 1), i * 280);
  }
}

export function revealShrine() {
  const { setOpen, setCore } = useSanctum.getState();
  for (let i = 0; i < 4; i++) {
    window.setTimeout(() => setOpen(i, 1), i * 220);
  }
  window.setTimeout(() => setCore(1), 1100);
}

export function foldClose() {
  const { setOpen, setCore } = useSanctum.getState();
  setCore(0);
  for (let i = 0; i < 4; i++) {
    window.setTimeout(() => setOpen(3 - i, 0), i * 180);
  }
}
