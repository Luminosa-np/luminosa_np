import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Radio, Bluetooth, Usb, Music, Play, Pause, SkipForward, SkipBack, Power } from 'lucide-react';

interface Station {
  freq: string;
  name: string;
  location: string;
  genre: string;
}

const NEPALI_STATIONS: Station[] = [
  { freq: '96.1', name: 'Radio Kantipur', location: 'Kathmandu', genre: 'News & Nepali Hits' },
  { freq: '100.0', name: 'Radio Nepal', location: 'Singhadurbar', genre: 'National Broadcast' },
  { freq: '91.2', name: 'Hits FM', location: 'Lalitpur', genre: 'Modern Pop & Rock' },
  { freq: '90.0', name: 'Ujyaalo 90 Network', location: 'Kathmandu', genre: 'Current Affairs & Folk' },
  { freq: '98.8', name: 'Radio City', location: 'Kathmandu', genre: 'Acoustic & Morning Vibes' },
  { freq: '105.4', name: 'Image FM', location: 'Kathmandu', genre: 'Nepali Classics' },
];

export const InteractiveRadioPlayer: React.FC = () => {
  const [isOn, setIsOn] = useState(true);
  const [mode, setMode] = useState<'FM' | 'BT' | 'USB' | 'AUX'>('FM');
  const [currentStationIdx, setCurrentStationIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(65);
  const [isMuted, setIsMuted] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  // Audio Context for synthetic pleasant ambient sound feedback
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const currentStation = NEPALI_STATIONS[currentStationIdx];

  const playClickSound = (freq = 440, type: OscillatorType = 'sine', duration = 0.08) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const handleTogglePower = () => {
    playClickSound(isOn ? 220 : 660, 'triangle', 0.12);
    setIsOn(!isOn);
    if (isOn) {
      setIsPlaying(false);
    }
  };

  const handleNextMode = () => {
    if (!isOn) return;
    playClickSound(520, 'sine', 0.06);
    const modes: ('FM' | 'BT' | 'USB' | 'AUX')[] = ['FM', 'BT', 'USB', 'AUX'];
    const nextIdx = (modes.indexOf(mode) + 1) % modes.length;
    setMode(modes[nextIdx]);
  };

  const handleStationStep = (delta: number) => {
    if (!isOn) return;
    playClickSound(750, 'sine', 0.05);
    setCurrentStationIdx((prev) => (prev + delta + NEPALI_STATIONS.length) % NEPALI_STATIONS.length);
  };

  const handleNumericPress = (num: string) => {
    if (!isOn) return;
    setPressedKey(num);
    playClickSound(300 + parseInt(num, 10) * 45, 'sine', 0.08);
    setTimeout(() => setPressedKey(null), 250);
    const targetIdx = parseInt(num, 10) % NEPALI_STATIONS.length;
    setCurrentStationIdx(targetIdx);
  };

  const handlePlayPause = () => {
    if (!isOn) return;
    playClickSound(440, 'triangle', 0.08);
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full bg-neutral-900 text-neutral-100 rounded-2xl p-4 sm:p-6 border border-neutral-800 shadow-2xl relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top status bar */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-neutral-300 uppercase tracking-widest text-[11px]">
            YSF-005BT Interactive Simulation
          </span>
        </div>
        <div className="flex items-center gap-2 text-neutral-400">
          <span className="font-mono text-[10px]">BATTERY 800mAh</span>
          <span className="px-1.5 py-0.5 bg-neutral-800 rounded text-[10px] text-emerald-400 font-mono">100%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4 items-center">
        {/* Left: Device Display & Front Panel */}
        <div className="md:col-span-7 bg-neutral-950 rounded-xl p-4 sm:p-5 border border-neutral-800/80 shadow-inner">
          <div className="flex items-start justify-between gap-4 mb-4">
            {/* 7-Segment Retro LED Display (Blue Glow) */}
            <div className="flex-1 bg-black/95 rounded-lg border border-neutral-800 p-3 sm:p-4 relative">
              <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1 font-mono uppercase tracking-wider">
                <span>{isOn ? mode : 'OFF'}</span>
                {isOn && isPlaying && (
                  <span className="text-amber-400 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    LIVE
                  </span>
                )}
              </div>

              {/* Main Display Digits */}
              <div className="h-12 sm:h-14 flex items-center justify-center font-mono font-bold tracking-widest text-cyan-400 text-2xl sm:text-3xl text-shadow-glow">
                {!isOn ? (
                  <span className="text-neutral-800 tracking-normal text-lg">STANDBY</span>
                ) : mode === 'FM' ? (
                  <span>{currentStation.freq} <span className="text-xs text-cyan-500 font-normal">MHz</span></span>
                ) : mode === 'BT' ? (
                  <span className="text-cyan-300">bL UE</span>
                ) : mode === 'USB' ? (
                  <span>USb-01</span>
                ) : (
                  <span>AUx-In</span>
                )}
              </div>

              {/* Station meta if FM */}
              {isOn && mode === 'FM' && (
                <div className="mt-2 text-center text-xs text-neutral-400 truncate">
                  <span className="text-white font-medium">{currentStation.name}</span>
                  <span className="text-neutral-500 ml-1.5">• {currentStation.location}</span>
                </div>
              )}

              {isOn && mode === 'BT' && (
                <div className="mt-2 text-center text-xs text-neutral-400">
                  <span className="text-emerald-400">● Paired</span> — Ready for streaming
                </div>
              )}
            </div>

            {/* Antenna illustration indicator */}
            <div className="flex flex-col items-center justify-center px-2 py-1 bg-neutral-900/60 rounded border border-neutral-800 text-[10px] text-neutral-400 text-center">
              <Radio className="w-4 h-4 mb-1 text-neutral-400" />
              <span>Telescopic</span>
              <span className="text-[9px] text-emerald-400">Antenna</span>
            </div>
          </div>

          {/* Device Controls: Orange Tactile Buttons */}
          <div className="pt-2">
            <div className="text-[10px] uppercase font-semibold text-neutral-500 tracking-wider mb-2">
              Physical Front Panel
            </div>
            {/* Top row of orange buttons */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              <button
                type="button"
                id="btn-radio-prev"
                onClick={() => handleStationStep(-1)}
                className="bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold text-xs py-2 px-1 rounded-md shadow flex items-center justify-center gap-1 active:translate-y-0.5 transition-all"
                title="Previous Station / Track"
              >
                <SkipBack className="w-3.5 h-3.5" />
                <span className="text-[10px]">PREV</span>
              </button>

              <button
                type="button"
                id="btn-radio-next"
                onClick={() => handleStationStep(1)}
                className="bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold text-xs py-2 px-1 rounded-md shadow flex items-center justify-center gap-1 active:translate-y-0.5 transition-all"
                title="Next Station / Track"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span className="text-[10px]">NEXT</span>
              </button>

              <button
                type="button"
                id="btn-radio-mode"
                onClick={handleNextMode}
                className="bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold text-xs py-2 px-1 rounded-md shadow flex items-center justify-center gap-1 active:translate-y-0.5 transition-all"
                title="Switch Mode (FM/BT/USB/AUX)"
              >
                <span className="text-[11px] tracking-tight">MOD</span>
              </button>

              <button
                type="button"
                id="btn-radio-play"
                onClick={handlePlayPause}
                className="bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-bold text-xs py-2 px-1 rounded-md shadow flex items-center justify-center gap-1 active:translate-y-0.5 transition-all"
                title="Play / Pause"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="text-[10px]">FM/▶</span>
              </button>
            </div>

            {/* Numeric Direct Frequency Keypad (1 - 0) */}
            <div className="grid grid-cols-5 gap-1.5">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num) => (
                <button
                  key={num}
                  type="button"
                  id={`btn-keypad-${num}`}
                  onClick={() => handleNumericPress(num)}
                  className={`h-9 rounded-md font-mono text-xs font-semibold border transition-all ${
                    pressedKey === num
                      ? 'bg-amber-500 text-black border-amber-400 scale-95'
                      : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 border-neutral-700 active:bg-neutral-600'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sound Control & Station Presets Info */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Audio & Volume
              </span>
              <button
                type="button"
                onClick={handleTogglePower}
                className={`p-1.5 rounded-full transition-colors ${
                  isOn ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-700 text-neutral-400'
                }`}
                title="Power On/Off"
              >
                <Power className="w-4 h-4" />
              </button>
            </div>

            {/* Volume slider mimicking side rotary dial */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  Analog Dial Feel
                </span>
                <span className="font-mono">{isMuted ? 'Muted' : `${volume}%`}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  if (isMuted) setIsMuted(false);
                  playClickSound(350 + Number(e.target.value) * 3, 'sine', 0.03);
                }}
                className="w-full accent-orange-500 bg-neutral-700 rounded-lg cursor-pointer h-2"
              />
            </div>
          </div>

          {/* Quick Nepal Station Presets list */}
          <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-800">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2 flex items-center justify-between">
              <span>Preset Nepali FM Bands</span>
              <span className="text-[10px] text-orange-400 font-mono">Live Demo</span>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 text-xs">
              {NEPALI_STATIONS.map((st, i) => (
                <button
                  key={st.freq}
                  type="button"
                  onClick={() => {
                    if (!isOn) setIsOn(true);
                    setMode('FM');
                    setCurrentStationIdx(i);
                    playClickSound(600, 'sine', 0.05);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    mode === 'FM' && currentStationIdx === i
                      ? 'bg-neutral-700 text-white font-medium border border-orange-500/50'
                      : 'hover:bg-neutral-800/80 text-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-orange-400 text-[11px]">{st.freq}</span>
                    <span className="truncate">{st.name}</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 shrink-0">{st.genre}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-neutral-400 bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
            <span>Try clicking the numeric keys or orange buttons to test real hardware response!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
