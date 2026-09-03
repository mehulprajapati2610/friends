import React from 'react';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentIndex: number;
  totalQuestions: number;
  isMuted: boolean;
  onToggleMute: () => void;
  score: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentIndex,
  totalQuestions,
  isMuted,
  onToggleMute,
  score,
}) => {
  const formattedIndex = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalQuestions).padStart(2, '0');

  return (
    <header className="w-full flex justify-between items-center px-margin h-16 bg-background border-b-4 border-primary shadow-[4px_4px_0px_0px_rgba(89,59,138,1)] z-40 select-none">
      {/* Left: Chair icon & Question Progress */}
      <div className="flex items-center gap-2">
        <span
          className="material-symbols-outlined text-primary text-2xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          chair
        </span>
        <span className="font-headline-md text-headline-md text-primary tracking-tight">
          {formattedIndex} / {formattedTotal}
        </span>
      </div>

      {/* Center: Mini Progress Dots */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i < currentIndex
                ? 'bg-primary'
                : i === currentIndex
                ? 'bg-secondary-container ring-2 ring-primary scale-125'
                : 'bg-outline-variant/50'
            }`}
          />
        ))}
      </div>

      {/* Right: Sound Mute Toggle & Score Badge */}
      <div className="flex items-center gap-2">
        <span className="font-label-bold text-xs bg-secondary-container/60 text-on-secondary-container px-2 py-0.5 rounded-full border border-secondary">
          {score} pts
        </span>
        <button
          onClick={() => {
            sound.playClick();
            onToggleMute();
          }}
          className="w-9 h-9 rounded-full bg-surface-container-high border-2 border-primary flex items-center justify-center text-primary btn-press"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: isMuted ? "'FILL' 0" : "'FILL' 1" }}
          >
            {isMuted ? 'volume_off' : 'volume_up'}
          </span>
        </button>
      </div>
    </header>
  );
};
