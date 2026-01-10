import { getAudioContext } from "./audioContext";
import { chordIntervals, semitonesToFrequency, type ChordType } from "./music";

const CHORD_DURATION = 2.0;

export function playChord(chordType: ChordType, rootFreq: number): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const intervals = chordIntervals[chordType];

  intervals.forEach((semitones) => {
    const freq = semitonesToFrequency(rootFreq, semitones);

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = "triangle";
    osc2.type = "sine";

    osc1.frequency.value = freq;
    osc2.frequency.value = freq * 1.003;

    const brightness = Math.min(1, freq / 440);
    filter.frequency.setValueAtTime(
      1200 + brightness * 3000,
      now
    );

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + CHORD_DURATION * 0.9
    );

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + CHORD_DURATION);
    osc2.stop(now + CHORD_DURATION);
  });
}
