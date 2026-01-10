import { feedback, hitsDisplay, missesDisplay } from "./dom";
import type { ChordType } from "../audio/music";

function resetFeedBackClass(): void {
    feedback.classList.remove("correct", "wrong");
}

const chordNames: Record<ChordType, string> = {
    major: "Maior (M)",
    minor: "Menor (m)",
    augmented: "Aumentado (+)",
    diminished: "Diminuto (°)"
};

export function showPrompt(): void {
    resetFeedBackClass();
    feedback.textContent = "Qual é o tipo de acorde?";
}

export function showCorrect(chord: ChordType): void {
    resetFeedBackClass()
    feedback.classList.add("correct")
    feedback.textContent = `Correto! Acorde: ${chordNames[chord]}`;
}

export function showWrong(chord: ChordType): void {
    resetFeedBackClass()
    feedback.classList.add("wrong")
    feedback.textContent = `Incorreto. Acorde: ${chordNames[chord]}`;
}

export function showMessage(msg: string): void {
    resetFeedBackClass()
    feedback.textContent = msg;
}

export function updateScore(hits: number, misses: number): void {
    hitsDisplay.textContent = String(hits);
    missesDisplay.textContent = String(misses);
}