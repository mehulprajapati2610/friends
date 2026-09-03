import React, { useState } from 'react';
import { EpisodeDetectiveQuestion } from '../../state/types';
import { sound } from '../../utils/audio';

interface EpisodeDetectiveProps {
  question: EpisodeDetectiveQuestion;
  onAnswer: (userChoice: string, isCorrect: boolean, reactionText?: string, pointsEarned?: number) => void;
  onRequestLockItIn?: (
    selectedLabel: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
  needsLockItIn?: boolean;
}

export const EpisodeDetective: React.FC<EpisodeDetectiveProps> = ({
  question,
  onAnswer,
  onRequestLockItIn,
  needsLockItIn,
}) => {
  const [revealedClues, setRevealedClues] = useState<number>(1);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const currentPoints = revealedClues === 1 ? 100 : revealedClues === 2 ? 75 : 50;

  const handleRevealClue = () => {
    if (revealedClues < 3) {
      sound.playClick();
      setRevealedClues((prev) => prev + 1);
    }
  };

  const handleSelectOption = (optId: string, optLabel: string, isCorrect: boolean) => {
    if (selectedOptionId) return;
    setSelectedOptionId(optId);
    sound.playClick();

    const finish = () => {
      if (isCorrect) sound.playCorrect();
      else sound.playWrong();
      onAnswer(optLabel, isCorrect, isCorrect ? 'Case Solved, Detective!' : undefined, isCorrect ? currentPoints : 0);
    };

    if (needsLockItIn && onRequestLockItIn) {
      onRequestLockItIn(optLabel, finish, () => {
        setSelectedOptionId(null);
      });
    } else {
      finish();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-margin select-none overflow-hidden">
      {/* Title & Points Indicator */}
      <div className="w-full flex justify-between items-center my-1">
        <h2 className="font-headline-lg text-lg sm:text-xl text-primary font-bold uppercase tracking-tight">
          EPISODE DETECTIVE 🔍
        </h2>
        <span className="font-label-bold text-xs bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full border border-secondary shadow-xs">
          {currentPoints} PTS
        </span>
      </div>

      {/* Clue Detective Notebook Card */}
      <div className="w-full bg-surface-container-lowest border-4 border-primary rounded-2xl p-card-padding tactile-shadow relative my-1">
        <div className="absolute -top-3.5 -left-3 bg-secondary-container border-2 border-on-surface rounded-full w-9 h-9 flex items-center justify-center shadow-xs">
          <span className="material-symbols-outlined text-on-surface text-lg">
            search
          </span>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          {question.clues.slice(0, revealedClues).map((clue, idx) => (
            <div
              key={idx}
              className="bg-surface-container-low border-2 border-primary/40 rounded-xl p-2.5 text-left animate-pop"
            >
              <span className="font-label-bold text-xs text-primary uppercase block">
                Clue #{idx + 1}
              </span>
              <p className="font-body-lg text-sm text-on-surface leading-snug">
                "{clue}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reveal Next Clue Action */}
      {revealedClues < 3 && (
        <button
          onClick={handleRevealClue}
          className="w-full bg-surface-variant border-2 border-on-surface rounded-xl py-2 px-3 font-label-bold text-xs text-on-surface flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors btn-press shadow-xs"
        >
          <span className="material-symbols-outlined text-base">visibility</span>
          <span>REVEAL CLUE #{revealedClues + 1} (-25 pts)</span>
        </button>
      )}

      {/* Multiple Choice Episode Cards */}
      <div className="w-full flex flex-col gap-2 my-1">
        {question.options.map((opt, i) => {
          const letter = String.fromCharCode(65 + i);
          const isSelected = selectedOptionId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id, opt.label, opt.isCorrect)}
              disabled={!!selectedOptionId}
              className={`w-full p-2.5 rounded-xl border-4 text-left flex items-center gap-3 transition-all ${
                isSelected
                  ? 'bg-secondary-container border-secondary scale-98 shadow-none'
                  : 'bg-surface border-primary tactile-shadow hover:border-secondary-container btn-press'
              }`}
            >
              <div className="w-7 h-7 rounded-full border-2 border-primary bg-primary-container text-on-primary-container flex items-center justify-center font-headline-md text-xs font-bold shrink-0">
                {letter}
              </div>
              <span className="font-body-md text-xs sm:text-sm text-on-surface font-semibold line-clamp-2">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
