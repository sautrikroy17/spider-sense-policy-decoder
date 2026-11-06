// Pure Web Audio API Sound Engine (Offline-Safe, Zero Latency, Meme & Spider-Man Music FX)
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.musicPlaying = false;
    this.musicTimeout = null;
    this.musicOscs = [];
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
    if (muted && this.musicPlaying) {
      this.stopSpiderTheme();
    }
  }

  isMuted() {
    return this.muted;
  }

  playHover() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {}
  }

  playClick() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  playSuccess() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.08, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.2);
      });
    } catch {}
  }

  playCharge() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.6);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.65);
    } catch {}
  }

  // Spidey Web Shooter "THWIP!" sound
  playThwip() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {}
  }

  // Spider-Sense High-Frequency Tingle
  playSpiderSense() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      for (let i = 0; i < 6; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(i % 2 === 0 ? 1300 : 1600, now + i * 0.045);

        gain.gain.setValueAtTime(0.08, now + i * 0.045);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.045 + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.045);
        osc.stop(now + i * 0.045 + 0.04);
      }
    } catch {}
  }

  playVineBoom() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.65);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.7);
    } catch {}
  }

  playPizzaTime() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [659.25, 783.99, 987.77, 1318.51];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.09, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.15);
      });
    } catch {}
  }

  // 🎵 Synthesized Orchestral Spider-Man Hero Theme (Brand New Day / Classic Motif)
  toggleSpiderTheme() {
    if (this.musicPlaying) {
      this.stopSpiderTheme();
      return false;
    } else {
      this.startSpiderTheme();
      return true;
    }
  }

  startSpiderTheme() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      this.musicPlaying = true;

      // Spider-Man Orchestral Hero Motif
      // Melody: F3, Ab3, C4, Bb3, F3, Ab3, C4, Db4, C4, Bb3 (Danny Elfman / Brand New Day brass)
      const themeNotes = [
        { note: 174.61, dur: 0.35, pause: 0.1 },  // F3
        { note: 207.65, dur: 0.35, pause: 0.1 },  // Ab3
        { note: 261.63, dur: 0.70, pause: 0.15 }, // C4
        { note: 233.08, dur: 0.55, pause: 0.2 },  // Bb3
        { note: 174.61, dur: 0.35, pause: 0.1 },  // F3
        { note: 207.65, dur: 0.35, pause: 0.1 },  // Ab3
        { note: 261.63, dur: 0.45, pause: 0.05 }, // C4
        { note: 277.18, dur: 0.45, pause: 0.05 }, // Db4
        { note: 261.63, dur: 0.50, pause: 0.1 },  // C4
        { note: 233.08, dur: 0.80, pause: 0.4 }   // Bb3
      ];

      const playPhrase = () => {
        if (!this.musicPlaying || this.muted) return;
        const now = this.ctx.currentTime;
        let cumulative = 0;

        themeNotes.forEach((item) => {
          const osc = this.ctx.createOscillator();
          const subOsc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sawtooth'; // Brassy horn
          subOsc.type = 'triangle'; // Warm brass body
          osc.frequency.setValueAtTime(item.note, now + cumulative);
          subOsc.frequency.setValueAtTime(item.note / 2, now + cumulative);

          gain.gain.setValueAtTime(0.045, now + cumulative);
          gain.gain.exponentialRampToValueAtTime(0.001, now + cumulative + item.dur);

          osc.connect(gain);
          subOsc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + cumulative);
          subOsc.start(now + cumulative);
          osc.stop(now + cumulative + item.dur);
          subOsc.stop(now + cumulative + item.dur);

          cumulative += item.dur + item.pause;
        });

        // Loop phrase every 5.5 seconds
        this.musicTimeout = setTimeout(() => {
          if (this.musicPlaying) playPhrase();
        }, (cumulative + 0.8) * 1000);
      };

      playPhrase();
    } catch {}
  }

  stopSpiderTheme() {
    this.musicPlaying = false;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  playDiceRoll() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      for (let i = 0; i < 6; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(200 + Math.random() * 300, now + i * 0.05);

        gain.gain.setValueAtTime(0.04, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.04);
      }
    } catch {}
  }
}

export const sound = new SoundEngine();
