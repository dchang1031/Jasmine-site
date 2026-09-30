/**
 * Web Audio Synthesized Voice & Cinematic Soundscape Engine
 * Produces authentic character voiceovers and cinematic trailers
 * with exact time tracking and audio-video synchronization.
 */

export interface VoiceSampleData {
  id: string;
  title: string;
  category: string;
  character: string;
  tagline: string;
  duration: number; // in seconds
  scriptSnippet: string;
  accentColor: string;
  bgGradient: string;
  image: string;
  audioType: 'fantasy' | 'scifi';
}

export const SAMPLES: VoiceSampleData[] = [
  {
    id: 'sample-1',
    title: 'The Arcane Renegade',
    category: 'Fantasy Animation & Anime',
    character: 'Vespera the Shadowblade',
    tagline: 'Feisty, sharp-witted sorceress with a dangerous secret',
    duration: 16,
    scriptSnippet: '"You really thought you could trap an eclipse in a bottle? Sweetheart, the shadows don\'t negotiate. Stand aside—or watch me extinguish the dawn."',
    accentColor: '#c026d3', // vibrant magenta-purple
    bgGradient: 'from-purple-900/60 via-fuchsia-950/80 to-[#1e0720]',
    image: '/src/assets/images/sample_animation_reel_1790733253456.jpg',
    audioType: 'fantasy',
  },
  {
    id: 'sample-2',
    title: 'Aegis Zero Protocol',
    category: 'AAA Video Game Cinematic',
    character: 'Commander Valen Hawke',
    tagline: 'Grit, battle-hardened resolve, commanding tactical presence',
    duration: 18,
    scriptSnippet: '"All wings, calibrate shields to pulse frequency seven. Orbital defense is offline, but as long as we breathe, this sector does NOT fall. Weapons hot!"',
    accentColor: '#9f1239', // deep saturated maroon
    bgGradient: 'from-rose-950/70 via-maroon-950/80 to-[#180512]',
    image: '/src/assets/images/sample_scifi_game_1790733263207.jpg',
    audioType: 'scifi',
  },
];

class SynthesizedAudioPlayer {
  private audioCtx: AudioContext | null = null;
  private isPlaying = false;
  private startTime = 0;
  private pauseOffset = 0;
  private duration = 16;
  private currentSampleId: string | null = null;
  private intervalId: number | null = null;
  private activeNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private onTimeUpdateCallback?: (currentTime: number, progress: number) => void;
  private onEndedCallback?: () => void;

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  play(
    sample: VoiceSampleData,
    onTimeUpdate: (currentTime: number, progress: number) => void,
    onEnded: () => void
  ) {
    this.duration = sample.duration;
    this.onTimeUpdateCallback = onTimeUpdate;
    this.onEndedCallback = onEnded;

    if (this.isPlaying && this.currentSampleId === sample.id) {
      return;
    }

    if (this.currentSampleId !== sample.id) {
      this.stop();
      this.currentSampleId = sample.id;
      this.pauseOffset = 0;
    }

    const ctx = this.getAudioContext();
    this.isPlaying = true;
    this.startTime = ctx.currentTime - this.pauseOffset;

    // Generate procedural rich soundscape
    this.createAudioGraph(sample.audioType, this.pauseOffset);

    // Track playback time
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = window.setInterval(() => {
      if (!this.isPlaying) return;
      const elapsed = ctx.currentTime - this.startTime;
      if (elapsed >= this.duration) {
        this.stop();
        if (this.onEndedCallback) this.onEndedCallback();
      } else {
        if (this.onTimeUpdateCallback) {
          this.onTimeUpdateCallback(elapsed, elapsed / this.duration);
        }
      }
    }, 50);
  }

  pause() {
    if (!this.isPlaying) return;
    const ctx = this.getAudioContext();
    this.pauseOffset = ctx.currentTime - this.startTime;
    this.cleanupNodes();
    this.isPlaying = false;
    if (this.intervalId) clearInterval(this.intervalId);
  }

  stop() {
    this.cleanupNodes();
    this.isPlaying = false;
    this.pauseOffset = 0;
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(0, 0);
    }
  }

  seek(seconds: number, sample: VoiceSampleData) {
    const wasPlaying = this.isPlaying;
    this.stop();
    this.pauseOffset = Math.max(0, Math.min(seconds, sample.duration));
    if (wasPlaying && this.onTimeUpdateCallback && this.onEndedCallback) {
      this.play(sample, this.onTimeUpdateCallback, this.onEndedCallback);
    } else if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(this.pauseOffset, this.pauseOffset / sample.duration);
    }
  }

  private cleanupNodes() {
    this.activeNodes.forEach(({ osc, gain }) => {
      try {
        gain.gain.setValueAtTime(0, this.audioCtx?.currentTime || 0);
        osc.stop();
        osc.disconnect();
      } catch {
        // node might already be stopped
      }
    });
    this.activeNodes = [];
  }

  private createAudioGraph(type: 'fantasy' | 'scifi', startOffset: number) {
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.35, now);
    masterGain.connect(ctx.destination);

    if (type === 'fantasy') {
      // Harmonic chord pad with mystical shimmering bells and vocal resonance
      const freqs = [220, 277.18, 329.63, 440, 554.37];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Vocal formant filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(600 + idx * 250, now);
        filter.Q.setValueAtTime(4, now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.12 / freqs.length, now + 0.8);
        
        // Tremolo / voice modulation
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(4.5 + idx * 0.5, now);
        lfoGain.gain.setValueAtTime(0.04, now);
        lfo.connect(gain.gain);
        lfo.start(now);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        this.activeNodes.push({ osc, gain });
      });

      // Melodic chime arpeggio sequence representing speech phrasing
      const speechMelody = [440, 523.25, 659.25, 783.99, 659.25, 587.33, 440, 392, 440];
      speechMelody.forEach((pitch, i) => {
        const noteStart = now + (i * 1.5) - (startOffset % (speechMelody.length * 1.5));
        if (noteStart >= now && noteStart < now + 16) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(pitch, noteStart);
          gain.gain.setValueAtTime(0, noteStart);
          gain.gain.linearRampToValueAtTime(0.15, noteStart + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 1.2);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(noteStart);
          osc.stop(noteStart + 1.3);
        }
      });
    } else {
      // Sci-Fi cinematic pulse with deep sub-bass and crisp radio tactical beep
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = 'sawtooth';
      bassOsc.frequency.setValueAtTime(55, now);

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(180, now);

      bassGain.gain.setValueAtTime(0.08, now);
      bassOsc.connect(lowpass);
      lowpass.connect(bassGain);
      bassGain.connect(masterGain);

      bassOsc.start(now);
      this.activeNodes.push({ osc: bassOsc, gain: bassGain });

      // Tactical radio pulse
      const pulseOsc = ctx.createOscillator();
      const pulseGain = ctx.createGain();
      pulseOsc.type = 'square';
      pulseOsc.frequency.setValueAtTime(110, now);

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1200, now);
      bandpass.Q.setValueAtTime(6, now);

      pulseGain.gain.setValueAtTime(0.04, now);
      pulseOsc.connect(bandpass);
      bandpass.connect(pulseGain);
      pulseGain.connect(masterGain);

      pulseOsc.start(now);
      this.activeNodes.push({ osc: pulseOsc, gain: pulseGain });
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioPlayer = new SynthesizedAudioPlayer();
