import { answerButtons, playButton, repeatButton } from "./dom";

export type UIState = "idle" | "playing" | "answered";

function setAnswersDisabled(disabled: boolean): void {
    answerButtons.forEach(b => b.disabled = disabled);
}

export function renderUI(state: UIState): void {
    switch (state) {
        case "idle":
            playButton.disabled = false;
            repeatButton.disabled = true;
            setAnswersDisabled(true);
            break;
        
        case "playing":
            playButton.disabled = true;
            repeatButton.disabled = false;
            setAnswersDisabled(false)
            break;

        case "answered":
            playButton.disabled = false;
            repeatButton.disabled = true;
            setAnswersDisabled(true);
            break;

    }
}