import React, { useState, useEffect } from 'react';
import { CentralPerkMemoryQuestion } from '../../state/types';
import { sound } from '../../utils/audio';

interface CentralPerkMemoryProps {
  question: CentralPerkMemoryQuestion;
  onAnswer: (userChoice: string, isCorrect: boolean, reactionText?: string) => void;
}

export const CentralPerkMemory: React.FC<CentralPerkMemoryProps> = ({
  question,
  onAnswer,
}) => {
  const [observeCountdown, setObserveCountdown] = useState<number>(3);
  const [isObserving, setIsObserving] = useState<boolean>(true);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  useEffect(() => {
    if (observeCountdown > 0) {
      const timer = setTimeout(() => {
        setObserveCountdown((prev) => prev - 1);
        sound.playTimerTick();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsObserving(false);
    }
  }, [observeCountdown]);

  const handleSelectOption = (optId: string, optName: string) => {
    if (selectedOptionId || isObserving) return;
    setSelectedOptionId(optId);
    sound.playClick();

    const isCorrect = optId === question.correctOptionId;
    if (isCorrect) sound.playCorrect();
    else sound.playWrong();

    setTimeout(() => {
      onAnswer(optName, isCorrect, isCorrect ? 'Central Perk memory intact!' : undefined);
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-margin select-none overflow-hidden">
      {/* Question Card */}
      <div className="w-full bg-surface-container-lowest border-4 border-primary rounded-2xl p-card-padding tactile-shadow text-center my-1">
        <h2 className="font-headline-lg text-lg sm:text-xl text-primary font-bold uppercase tracking-tight mb-1">
          {isObserving ? 'MEMORIZE CENTRAL PERK! ☕' : 'WHO WAS SITTING WHERE?'}
        </h2>
        <p className="font-body-md text-xs sm:text-sm text-on-surface-variant">
          {isObserving ? `Scanning scene: ${observeCountdown}s...` : question.prompt}
        </p>
      </div>

      {/* Central Perk Scene with Question Marker */}
      <div className="w-full h-52 sm:h-56 bg-surface-container-high rounded-2xl border-4 border-primary relative overflow-hidden tactile-shadow my-2">
        <img
          src={question.observationImage}
          alt="Central Perk"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Observation Timer Badge */}
        {isObserving && (
          <div className="absolute top-3 right-3 bg-secondary-container border-2 border-on-secondary-container rounded-full px-3 py-1 flex items-center gap-1 font-headline-md text-sm text-on-secondary-container animate-pulse z-20">
            <span className="material-symbols-outlined text-base">timer</span>
            <span>{observeCountdown}s</span>
          </div>
        )}
      </div>

      {/* 3 Character Options */}
      <div className="w-full flex flex-col gap-2.5 my-2">
        {question.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id, opt.name)}
              disabled={isObserving || !!selectedOptionId}
              className={`w-full py-3 px-4 rounded-xl border-4 font-headline-md text-base transition-all flex items-center justify-center gap-2 ${
                isObserving
                  ? 'opacity-40 border-outline bg-surface-container cursor-not-allowed'
                  : isSelected
                  ? 'bg-secondary-container text-on-secondary-container border-secondary shadow-none scale-98'
                  : 'bg-primary-container text-on-primary-container border-primary tactile-shadow hover:bg-primary btn-press'
              }`}
            >
              <span className="material-symbols-outlined text-xl">person</span>
              <span>{opt.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
