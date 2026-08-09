// Web Audio API Synthesizer for subtle futuristic UI sound feedback
let audioCtx: AudioContext | null = null;
let soundEnabled = false;

export function toggleAudio(state?: boolean): boolean {
  soundEnabled = state !== undefined ? state : !soundEnabled;
  if (soundEnabled && !audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return soundEnabled;
}

export function isAudioEnabled(): boolean {
  return soundEnabled;
}

export function playUiSound(type: "hover" | "click" | "select" | "success" | "ai") {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === "hover") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "click") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "select") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.12); // C6
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "success") {
      // Arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const o = audioCtx!.createOscillator();
        const g = audioCtx!.createGain();
        o.connect(g);
        g.connect(audioCtx!.destination);
        o.type = "sine";
        const t = now + idx * 0.06;
        o.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(0.03, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
        o.start(t);
        o.stop(t + 0.15);
      });
    } else if (type === "ai") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(900, now + 0.1);
      osc.frequency.linearRampToValueAtTime(600, now + 0.2);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch (e) {
    // Ignore audio context errors
  }
}
