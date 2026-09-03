import React, { useState } from 'react';
import { SoundMemoryQuestion } from '../../state/types';
import { sound } from '../../utils/audio';

interface SoundMemoryProps {
  question: SoundMemoryQuestion;
  onAnswer: (userChoice: string, isCorrect: boolean, reactionText?: string) => void;
  onRequestLockItIn?: (
    selectedLabel: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
  needsLockItIn?: boolean;
}

export const SoundMemory: React.FC<SoundMemoryProps> = ({
  question,
  onAnswer,
  onRequestLockItIn,
  needsLockItIn,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playCount, setPlayCount] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Clean up sound on unmount when advancing to the next level
  React.useEffect(() => {
    return () => {
      sound.stopSoundCue();
      sound.restoreBgm();
    };
  }, []);

  const handlePlaySound = () => {
    sound.playClick();
    setIsPlaying(true);
    setPlayCount((prev) => prev + 1);

    // Gently duck the background music so the voice line is crystal clear
    sound.duckBgm();

    sound.playSoundCue(question.soundType, question.audio);

    setTimeout(() => {
      setIsPlaying(false);
      sound.restoreBgm();
    }, 1800);
  };

  const handleSelect = (optId: string, optName: string, isCorrect: boolean) => {
    if (selectedId) return;
    setSelectedId(optId);
    sound.playClick();

    // Immediately stop sound cue so it does not spill into the next question
    sound.stopSoundCue();
    sound.restoreBgm();

    const finish = () => {
      if (isCorrect) sound.playCorrect();
      else sound.playWrong();
      onAnswer(optName, isCorrect, isCorrect ? 'Unmistakable voice!' : undefined);
    };

    if (needsLockItIn && onRequestLockItIn) {
      onRequestLockItIn(optName, finish, () => {
        setSelectedId(null);
      });
    } else {
      finish();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-margin select-none overflow-hidden bg-slate-900 text-white rounded-2xl relative">
      {/* Title */}
      <div className="text-center my-1 z-10">
        <h2 className="font-headline-lg text-lg sm:text-xl text-primary-fixed font-bold uppercase tracking-tight">
          SOUND MEMORY 🎧
        </h2>
        <p className="font-body-md text-xs text-primary-fixed-dim">
          Tap the giant speaker to listen to the cue!
        </p>
      </div>

      {/* Retro Darkened Audio Stage */}
      <div className="flex flex-col items-center justify-center my-2 z-10">
        <button
          onClick={handlePlaySound}
          className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-inverse-primary bg-primary flex items-center justify-center transition-all ${
            isPlaying
              ? 'scale-110 shadow-[0px_0px_30px_rgba(213,186,255,0.8)]'
              : 'pulse-animation shadow-[0px_6px_0px_0px_rgba(39,0,87,1)] btn-press'
          }`}
        >
          <span
            className="material-symbols-outlined text-white text-5xl sm:text-6xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isPlaying ? 'graphic_eq' : 'volume_up'}
          </span>
        </button>

        <p className="font-headline-lg text-base text-secondary-container mt-3 tracking-wider font-bold">
          {question.soundCueText}
        </p>
        <span className="font-label-bold text-xs text-slate-400 mt-0.5">
          Played: {playCount} times
        </span>
      </div>

      {/* Answer Choices */}
      <div className="w-full flex flex-col gap-2.5 my-2 z-10">
        {question.options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id, opt.name, opt.isCorrect)}
              disabled={!!selectedId}
              className={`w-full py-3 px-4 rounded-xl border-4 font-headline-md text-base transition-all flex items-center justify-center gap-2 ${
                isSelected
                  ? 'bg-secondary-container text-on-secondary-container border-secondary scale-98 shadow-none'
                  : 'bg-surface text-primary border-primary hover:border-secondary-container tactile-shadow btn-press'
              }`}
            >
              <span>{opt.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
