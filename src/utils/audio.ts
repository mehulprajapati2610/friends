// Lightweight Audio Utility for UI sounds and Friends audio cues

class SoundManager {
  private isMuted: boolean = false;
  private audioCtx: AudioContext | null = null;
  private bgmAudio: HTMLAudioElement | null = null;
  private isBgmPlaying: boolean = false;
  private activeSoundCueAudio: HTMLAudioElement | null = null;

  constructor() {
    try {
      const saved = localStorage.getItem('friends_test_muted');
      if (saved !== null) {
        this.isMuted = JSON.parse(saved);
      }
    } catch {
      this.isMuted = false;
    }
  }

  private getAudioContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('friends_test_muted', JSON.stringify(this.isMuted));
    } catch {}

    if (this.bgmAudio) {
      if (this.isMuted) {
        this.bgmAudio.pause();
      } else if (this.isBgmPlaying) {
        this.bgmAudio.play().catch(() => {});
      }
    }

    return this.isMuted;
  }

  public startBgm(src = '/audio/bgm-theme.mp3'): void {
    if (!this.bgmAudio) {
      try {
        this.bgmAudio = new Audio(src);
        this.bgmAudio.loop = true;
        this.bgmAudio.volume = 0.08;
      } catch {
        return;
      }
    }
    this.isBgmPlaying = true;
    if (!this.isMuted && this.bgmAudio) {
      this.bgmAudio.volume = 0.08;
      this.bgmAudio.play().catch(() => {});
    }
  }

  public pauseBgm(): void {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
  }

  public resumeBgm(): void {
    if (!this.isMuted && this.bgmAudio && this.isBgmPlaying) {
      this.bgmAudio.volume = 0.08;
      this.bgmAudio.play().catch(() => {});
    }
  }

  public duckBgm(): void {
    if (this.bgmAudio) {
      this.bgmAudio.volume = 0.02;
    }
  }

  public restoreBgm(): void {
    if (this.bgmAudio) {
      this.bgmAudio.volume = 0.08;
    }
  }

  public playClick(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }

  public playCorrect(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.25);
      });
    } catch {}
  }

  public playWrong(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(190, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {}
  }

  public playCelebration(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const melody = [523.25, 659.25, 783.99, 1046.5, 987.77, 1046.5];
      melody.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.12 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.3);
      });
    } catch {}
  }

  public playTimerTick(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {}
  }

  public playSoundCue(soundType: string, customAudioUrl?: string): void {
    if (this.isMuted) return;

    // Stop any currently playing sound cue
    this.stopSoundCue();

    if (customAudioUrl) {
      try {
        const audio = new Audio(customAudioUrl);
        audio.volume = 0.35;
        this.activeSoundCueAudio = audio;
        audio.onended = () => {
          if (this.activeSoundCueAudio === audio) {
            this.activeSoundCueAudio = null;
          }
        };
        audio.play().catch(() => {
          if (this.activeSoundCueAudio === audio) {
            this.activeSoundCueAudio = null;
          }
          this.playSynthesizedCue(soundType);
        });
        return;
      } catch {}
    }

    this.playSynthesizedCue(soundType);
  }

  public stopSoundCue(): void {
    if (this.activeSoundCueAudio) {
      try {
        this.activeSoundCueAudio.pause();
        this.activeSoundCueAudio.currentTime = 0;
      } catch {}
      this.activeSoundCueAudio = null;
    }
  }

  private playSynthesizedCue(soundType: string): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      // Synthesized signature audio cues
      if (soundType.toLowerCase().includes('janice') || soundType.toLowerCase().includes('omg')) {
        // Janice's famous high-pitch rhythm: "Oh. My. GOD!"
        const tones = [587.33, 659.25, 880.0];
        tones.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.22);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.22);
          gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + idx * 0.22 + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.22);
          osc.stop(ctx.currentTime + idx * 0.22 + 0.18);
        });
      } else if (soundType.toLowerCase().includes('joey') || soundType.toLowerCase().includes('doin')) {
        // Joey's smooth cadence: "How you doin'?"
        const tones = [440, 392, 440];
        tones.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.25);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.25);
          gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + idx * 0.25 + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.25);
          osc.stop(ctx.currentTime + idx * 0.25 + 0.22);
        });
      } else if (soundType.toLowerCase().includes('iknow')) {
        // Monica's high-pitched "I KNOW!" (two ascending squeaks)
        const tones = [880, 1318.5];
        tones.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.18);
          gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.18);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.18 + 0.16);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.18);
          osc.stop(ctx.currentTime + idx * 0.18 + 0.17);
        });
      } else if (soundType.toLowerCase().includes('smellycat')) {
        // Phoebe's acoustic strum rhythm
        const tones = [440, 392, 349.23, 329.63];
        tones.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.22);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.22);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.22 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.22);
          osc.stop(ctx.currentTime + idx * 0.22 + 0.26);
        });
      } else if (soundType.toLowerCase().includes('pivot')) {
        // Ross's 3 aggressive shouts: "PIVOT! PIVOT! PIV-OT!"
        const tones = [523.25, 523.25, 587.33];
        tones.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.22);
          gain.gain.setValueAtTime(0.22, ctx.currentTime + idx * 0.22);
          gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + idx * 0.22 + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.22);
          osc.stop(ctx.currentTime + idx * 0.22 + 0.19);
        });
      } else {
        // Default sitcom guitar/brass hook
        const chords = [392, 523.25, 659.25, 783.99];
        chords.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + idx * 0.1 + 0.3);
        });
      }
    } catch {}
  }

  public playThemeClaps(): void {
    if (this.isMuted) return;

    this.stopSoundCue();

    try {
      const audio = new Audio('/audio/theme-claps.mp3');
      audio.volume = 0.12; // Matches low background music volume
      this.activeSoundCueAudio = audio;
      audio.onended = () => {
        if (this.activeSoundCueAudio === audio) {
          this.activeSoundCueAudio = null;
        }
      };
      audio.play().catch(() => {
        if (this.activeSoundCueAudio === audio) {
          this.activeSoundCueAudio = null;
        }
        this.synthesizeThemeClaps();
      });
      return;
    } catch {}

    this.synthesizeThemeClaps();
  }

  private synthesizeThemeClaps(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const delays = [0, 0.16, 0.32, 0.48];
    delays.forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + delay + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.09);
    });
  }
}

export const sound = new SoundManager();
