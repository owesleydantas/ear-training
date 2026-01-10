import { playChord } from "./audio/synth";
import { chordTypes, naturalRoots, type ChordType, type RootNote } from "./audio/music";
import { exercise } from "./state/exerciseState";
import { renderUI } from "./ui/uiState";
import {
    showPrompt,
    showCorrect,
    showMessage,
    showWrong,
    updateScore
} from "./ui/feedback";
import {
    playButton,
    repeatButton,
    answerButtons,
    varyRootCheckbox
} from "./ui/dom";

document.addEventListener("DOMContentLoaded", () => {
  const MAX_REPEATS = 2;
  const MIN_FREQ = 87.31;
  const MAX_FREQ = 440.0;

  function fitFrequencyToRange(freq: number): number {
      let adjustedFreq = freq;

      while (adjustedFreq < MIN_FREQ) {
          adjustedFreq *= 2;
      }

      while (adjustedFreq > MAX_FREQ) {
          adjustedFreq /= 2;
      }

      return adjustedFreq;
  }

  playButton.addEventListener("click", () => {
      if (exercise.state === "playing") {
          showMessage("Responda antes de ouvir outro acorde.")
          return;
      }

      const chord: ChordType = chordTypes[Math.floor(Math.random() * chordTypes.length)];

      exercise.chordType = chord;
      const root: RootNote = varyRootCheckbox.checked
        ? naturalRoots[Math.floor(Math.random() * naturalRoots.length)]
        : naturalRoots[0];
      
        exercise.root = {
          ...root,
          freq: fitFrequencyToRange(root.freq)
        }

      exercise.state = "playing";
      renderUI("playing");
      exercise.remainingRepeats = MAX_REPEATS;
      showPrompt()

      if (!exercise.chordType || !exercise.root) return;

      playChord(exercise.chordType, exercise.root.freq);
  });

  answerButtons.forEach((button) => {
      button.addEventListener("click", () => {
          if (exercise.state !== "playing" || !exercise.chordType) {
              showMessage("Clique primeiro em 'Ouvir acorde'.");
              return;
          }

          const userAnswer = button.dataset.answer as ChordType;

          if (userAnswer === exercise.chordType) {
              exercise.hits++;
              showCorrect(exercise.chordType);

          } else {
              exercise.misses++;
              showWrong(exercise.chordType);
          }

          updateScore(exercise.hits, exercise.misses);

          exercise.state = "answered";
          renderUI("answered");
          exercise.chordType= null;
      });
  });

  repeatButton.addEventListener("click", () => {
      if (exercise.state !== "playing" || !exercise.chordType || !exercise.root) {
          showMessage("Não há acorde para repetir.");
          return;
      }

      if (exercise.remainingRepeats <= 0) {
          showMessage("Limite de repetições atingigo.");
          return;
      }

      exercise.remainingRepeats--;

      playChord(exercise.chordType, exercise.root.freq);
      showMessage(`Acorde repetido (${exercise.remainingRepeats} restantes.)`);
  })
})