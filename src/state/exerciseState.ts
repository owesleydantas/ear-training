import type { ChordType, RootNote } from "../audio/music";

export type ExerciseState = "idle" | "playing" | "answered";

export interface ExerciseData {
    state: ExerciseState;
    chordType: ChordType | null;
    root: RootNote | null;
    remainingRepeats: number;
    hits: number;
    misses: number;
}

export const exercise: ExerciseData = {
    state: "idle",
    chordType: null,
    root: null,
    remainingRepeats: 0,
    hits: 0,
    misses: 0
}