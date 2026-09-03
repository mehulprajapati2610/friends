import React, { useState } from 'react';
import { WhatHappenedNextQuestion } from '../../state/types';
import { sound } from '../../utils/audio';

interface WhatHappenedNextProps {
  question: WhatHappenedNextQuestion;
  onAnswer: (userChoice: string, isCorrect: boolean, reactionText?: string) => void;
  onRequestLockItIn?: (
    selectedLabel: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
  needsLockItIn?: boolean;
}

export const WhatHappenedNext: React.FC<WhatHappenedNextProps> = ({
  question,
  onAnswer,
  onRequestLockItIn,
  needsLockItIn,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showReactionOverlay, setShowReactionOverlay] = useState<boolean>(false);

  const handleSelect = (optId: string, optText: string, isCorrect: boolean) => {
    if (selectedId) return;
    setSelectedId(optId);
    sound.playClick();

    const finish = () => {
      if (isCorrect) {
        sound.playCorrect();
        setShowReactionOverlay(true);
        setTimeout(() => {
          onAnswer(optText, true, question.reactionText);
        }, 1100);
      } else {
        sound.playWrong();
        onAnswer(optText, false);
      }
    };

    if (needsLockItIn && onRequestLockItIn) {
      onRequestLockItIn(optText, finish, () => {
        setSelectedId(null);
      });
    } else {
      finish();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-margin select-none overflow-hidden relative">
      {/* Dynamic Reaction Overlay (e.g. "PIVOT!") */}
      {showReactionOverlay && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none bg-primary/30 backdrop-blur-xs">
          <h1 className="font-headline-xl text-5xl sm:text-6xl font-extrabold text-secondary-container drop-shadow-[4px_4px_0px_rgba(37,26,0,1)] uppercase animate-pivot">
            {question.reactionText}
          </h1>
        </div>
      )}

      {/* Scene Card */}
      <div className="w-full bg-surface-container-lowest border-4 border-primary rounded-2xl p-card-padding tactile-shadow my-1">
        <div className="w-full h-36 sm:h-40 bg-surface-container-high rounded-xl mb-3 border-2 border-outline-variant overflow-hidden relative">
          <img
            src={question.sceneImage}
            alt="Situation"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        <h2 className="font-headline-lg text-lg sm:text-xl text-primary mb-1 text-center uppercase tracking-tight">
          WHAT HAPPENED NEXT?
        </h2>
        <p className="font-body-md text-xs sm:text-sm text-on-surface text-center">
          {question.situation}
        </p>
      </div>

      {/* 3 Outcome Choices */}
      <div className="w-full flex flex-col gap-2.5 my-2">
        {question.options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id, opt.text, opt.isCorrect)}
              disabled={!!selectedId}
              className={`w-full p-3 rounded-xl border-4 text-left font-headline-md text-sm sm:text-base transition-all ${
                isSelected
                  ? 'bg-secondary-container text-on-secondary-container border-secondary shadow-none scale-98'
                  : 'bg-surface-container-low text-on-surface border-primary tactile-shadow hover:border-secondary-container btn-press'
              }`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};
