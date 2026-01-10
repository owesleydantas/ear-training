export type ChordType = "major" | "minor" | "augmented" | "diminished";

export interface RootNote {
    name: string;
    freq: number;
}

export const chordTypes: ChordType[] = [
    "major",
    "minor",
    "augmented",
    "diminished"
];

export const chordIntervals: Record<ChordType, number[]> = {
    major: [0,4,7],
    minor: [0,3,7],
    augmented: [0,4,8],
    diminished: [0,3,6]
};

export const naturalRoots: RootNote[] = [
    { name: "C", freq: 261.63 },
    { name: "D", freq: 293.66 },
    { name: "E", freq: 329.63 },
    { name: "F", freq: 349.23 },
    { name: "G", freq: 392.0 },
    { name: "A", freq: 440.0 },
    { name: "B", freq: 493.88 },
];

export function semitonesToFrequency(baseFreq: number, semitones: number): number {
    return baseFreq * Math.pow(2, semitones / 12);
}