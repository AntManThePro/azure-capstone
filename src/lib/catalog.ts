export const S = 1.08;
export const H = 2.52;
export const L = Math.hypot(H, S);
export const CLOSED = Math.atan2(-S, H);
export const OPEN_SWING = 2.4;
export const DEPTH = 0.05;

export type FaceId = 0 | 1 | 2 | 3;
export type FaceKind = "pegs" | "coils" | "shelves" | "vials";

export const FACES: { id: FaceId; kind: FaceKind; label: string; hint: string; map: string }[] = [
  { id: 0, kind: "pegs", label: "Pegs", hint: "Washers and spine", map: "/cabinet/inner-pegs.jpg" },
  { id: 1, kind: "coils", label: "Coils", hint: "Copper spirals", map: "/cabinet/inner-coils.jpg" },
  { id: 2, kind: "shelves", label: "Shelves", hint: "Hidden cubbies", map: "/cabinet/inner-shelves.jpg" },
  { id: 3, kind: "vials", label: "Vials", hint: "Glass tubes", map: "/cabinet/inner-vials.jpg" },
];

export interface Jewel {
  id: string;
  name: string;
  metal: string;
  stone: string;
}

export const JEWELS: Jewel[] = [
  { id: "pearl-drop", name: "Pearl drops", metal: "#d4af6a", stone: "#f2ece3" },
  { id: "gold-chain", name: "Gold chain", metal: "#d4af6a", stone: "#d4af6a" },
  { id: "ring-emerald", name: "Emerald ring", metal: "#c0c6ce", stone: "#2f8f6b" },
  { id: "ring-ruby", name: "Ruby ring", metal: "#d4af6a", stone: "#b03a3a" },
  { id: "ring-sapphire", name: "Sapphire ring", metal: "#c0c6ce", stone: "#3a5ea8" },
  { id: "gold-discs", name: "Disc earrings", metal: "#d4af6a", stone: "#d4af6a" },
  { id: "teal-pendant", name: "Teal pendant", metal: "#b87333", stone: "#1c8a86" },
  { id: "bead-strand", name: "Bead strand", metal: "#d4af6a", stone: "#5ec4c0" },
  { id: "cuff", name: "Cuff bracelet", metal: "#d4af6a", stone: "#1c8a86" },
  { id: "quartz", name: "Quartz point", metal: "#dfe8ea", stone: "#dfe8ea" },
  { id: "studs", name: "Pearl studs", metal: "#c0c6ce", stone: "#efe6d6" },
  { id: "locket", name: "Copper locket", metal: "#b87333", stone: "#c4a574" },
];

export interface Slot {
  id: string;
  label: string;
  face: FaceId | "shrine";
  pos: [number, number, number];
  scale: number;
}

export const SLOTS: Slot[] = [
  { id: "peg-disc", label: "Disc", face: 0, pos: [0, 0.42, 0.06], scale: 1.05 },
  { id: "peg-l", label: "Left washer", face: 0, pos: [-0.34, 1.02, 0.06], scale: 0.85 },
  { id: "peg-r", label: "Right washer", face: 0, pos: [0.34, 1.02, 0.06], scale: 0.85 },
  { id: "coil-a", label: "Left coils", face: 1, pos: [-0.28, 1.15, 0.06], scale: 0.9 },
  { id: "coil-b", label: "Right coils", face: 1, pos: [0.26, 0.88, 0.06], scale: 0.9 },
  { id: "coil-c", label: "Mosaic pocket", face: 1, pos: [0.02, 0.58, 0.06], scale: 0.85 },
  { id: "shelf-a", label: "Lower cubby", face: 2, pos: [0, 0.42, 0.06], scale: 0.9 },
  { id: "shelf-b", label: "Center cubby", face: 2, pos: [0, 0.95, 0.06], scale: 0.8 },
  { id: "shelf-c", label: "Upper cubby", face: 2, pos: [0, 1.52, 0.06], scale: 0.7 },
  { id: "vial-0", label: "Upper vial", face: 3, pos: [0, 1.38, 0.06], scale: 0.7 },
  { id: "vial-1", label: "Mid vial", face: 3, pos: [0, 0.95, 0.06], scale: 0.75 },
  { id: "vial-oval", label: "Oval dish", face: 3, pos: [0, 0.4, 0.06], scale: 0.95 },
  { id: "shrine-base", label: "Base plinth", face: "shrine", pos: [0.3, 0.18, 0.26], scale: 1 },
  { id: "shrine-mid", label: "Mid terrace", face: "shrine", pos: [-0.2, 0.5, 0.16], scale: 0.85 },
  { id: "shrine-high", label: "Upper terrace", face: "shrine", pos: [0.14, 0.82, -0.1], scale: 0.75 },
  { id: "shrine-peak", label: "Peak", face: "shrine", pos: [0, 1.18, 0], scale: 0.62 },
  { id: "shrine-heart", label: "Heart", face: "shrine", pos: [0, 0.5, -0.24], scale: 0.9 },
];
