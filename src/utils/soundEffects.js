// Pure Web Audio API & Authentic Spider-Man Audio Engine (Offline-Safe, Zero Latency)
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.musicPlaying = false;
    this.audioEl = null;
    this.synthTimeout = null;
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
    if (this.audioEl) {
      this.audioEl.muted = muted;
      if (muted && this.musicPlaying) {
        this.audioEl.pause();
        this.musicPlaying = false;
      }
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
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
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
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {}
  }

  // 🕸️ Authentic Spider-Man Web Shooter THWIP
  playThwip() {
    if (this.muted) return;
    try {
      const audio = new Audio('/spidey/web-shoot.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => this.playThwipSynth());
    } catch {
      this.playThwipSynth();
    }
  }

  playThwipSynth() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // High frequency air-pressure noise
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2800, now);
      filter.Q.setValueAtTime(3.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch {}
  }

  // ⚡ Spider-Sense Tingle
  playSpiderSense() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [880, 1046.5, 1318.5, 1760];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.04, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.15);
      });
    } catch {}
  }

  // 🎵 Official Main Theme: "Annihilate" by Metro Boomin, Swae Lee, Lil Wayne, Offset (Spider-Verse)
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
      if (!this.audioEl) {
        // High-Fidelity Official Audio: "Annihilate" (Metro Boomin & Swae Lee)
        this.audioEl = new Audio('/spidey/annihilate.m4a');
        this.audioEl.loop = true;
        this.audioEl.volume = 0.75;
      }
      this.audioEl.currentTime = 0;
      this.audioEl
        .play()
        .then(() => {
          this.musicPlaying = true;
        })
        .catch(() => {
          // Secondary fallback to .mp3 format or OG theme
          try {
            this.audioEl = new Audio('/spidey/annihilate.mp3');
            this.audioEl.loop = true;
            this.audioEl.volume = 0.75;
            this.audioEl
              .play()
              .then(() => {
                this.musicPlaying = true;
              })
              .catch(() => {
                this.audioEl = new Audio('/spidey/og-spiderman-theme.mp3');
                this.audioEl.loop = true;
                this.audioEl.volume = 0.75;
                this.audioEl.play().catch(() => this.startSpiderThemeSynth());
                this.musicPlaying = true;
              });
          } catch {
            this.startSpiderThemeSynth();
          }
        });
    } catch {
      this.startSpiderThemeSynth();
    }
  }

  stopSpiderTheme() {
    this.musicPlaying = false;
    if (this.audioEl) {
      try {
        this.audioEl.pause();
      } catch {}
    }
    if (this.synthTimeout) {
      clearTimeout(this.synthTimeout);
      this.synthTimeout = null;
    }
  }

  // Classic OG Theme Synth Fallback: "Spider-Man, Spider-Man, does whatever a spider can"
  startSpiderThemeSynth() {
    try {
      this.init();
      if (!this.ctx) return;
      this.musicPlaying = true;

      // Classic 1967 OG Theme Notes:
      // "Spi-der-man, Spi-der-man" -> E4, G4, A4, E4, G4, A4
      // "Does what-ev-er a spi-der can" -> D5, C5, A4, G4, A4
      const ogNotes = [
        { note: 329.63, dur: 0.25 }, // E4
        { note: 392.00, dur: 0.25 }, // G4
        { note: 440.00, dur: 0.55 }, // A4
        { note: 329.63, dur: 0.25 }, // E4
        { note: 392.00, dur: 0.25 }, // G4
        { note: 440.00, dur: 0.55 }, // A4
        { note: 587.33, dur: 0.25 }, // D5
        { note: 523.25, dur: 0.25 }, // C5
        { note: 440.00, dur: 0.25 }, // A4
        { note: 392.00, dur: 0.25 }, // G4
        { note: 440.00, dur: 0.70 }  // A4
      ];

      const playPhrase = () => {
        if (!this.musicPlaying || this.muted) return;
        const now = this.ctx.currentTime;
        let cum = 0;

        ogNotes.forEach((item) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(item.note, now + cum);
          gain.gain.setValueAtTime(0.04, now + cum);
          gain.gain.exponentialRampToValueAtTime(0.001, now + cum + item.dur);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + cum);
          osc.stop(now + cum + item.dur);
          cum += item.dur + 0.08;
        });

        this.synthTimeout = setTimeout(() => {
          if (this.musicPlaying) playPhrase();
        }, (cum + 0.6) * 1000);
      };

      playPhrase();
    } catch {}
  }

  // Meme Sound: Vine Boom
  playVineBoom() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.45);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch {}
  }

  // Meme Sound: Pizza Time
  playPizzaTime() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [659.25, 587.33, 659.25, 587.33, 659.25, 493.88, 587.33, 523.25, 440.00];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.07, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.12);
      });
    } catch {}
  }

  playSuccess() {
    this.playPizzaTime();
  }

  playCharge() {
    this.playSpiderSense();
  }

  playLaser() {
    this.playThwip();
  }

  playAlert() {
    this.playSpiderSense();
  }
}

export const sound = new SoundEngine();
