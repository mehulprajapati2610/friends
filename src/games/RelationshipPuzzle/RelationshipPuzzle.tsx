import React, { useState } from 'react';
import { RelationshipPuzzleQuestion } from '../../state/types';
import { sound } from '../../utils/audio';

interface RelationshipPuzzleProps {
  question: RelationshipPuzzleQuestion;
  onAnswer: (userChoice: string, isCorrect: boolean, reactionText?: string) => void;
}

export const RelationshipPuzzle: React.FC<RelationshipPuzzleProps> = ({
  question,
  onAnswer,
}) => {
  // Matched pairs: { ross: 'rachel', monica: 'chandler' }
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  // Shuffle right side so it never appears directly across from matching partners
  const [shuffledRightSide] = useState(() => {
    const list = [...question.rightSide];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    // Prevent index 0 from matching index 0 if possible
    if (list.length > 1 && question.correctPairs[question.leftSide[0]?.id] === list[0]?.id) {
      const first = list.shift()!;
      list.push(first);
    }
    return list;
  });

  const handleSelectLeft = (leftId: string) => {
    // If already paired, ignore
    if (matchedPairs[leftId]) return;
    sound.playClick();
    setSelectedLeft((prev) => (prev === leftId ? null : leftId));
  };

  const handleSelectRight = (rightId: string) => {
    if (!selectedLeft) return;

    // Check if correct pair
    const isMatch = question.correctPairs[selectedLeft] === rightId;

    if (isMatch) {
      sound.playCorrect();
      const updated = { ...matchedPairs, [selectedLeft]: rightId };
      setMatchedPairs(updated);
      setSelectedLeft(null);

      // Check if all pairs connected
      if (Object.keys(updated).length === Object.keys(question.correctPairs).length) {
        setTimeout(() => {
          onAnswer('All couples matched', true, "She's his lobster! 🦞");
        }, 800);
      }
    } else {
      sound.playWrong();
      setSelectedLeft(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-margin select-none overflow-hidden">
      {/* Question Card */}
      <div className="w-full bg-surface-container-lowest border-4 border-primary rounded-2xl p-card-padding tactile-shadow text-center my-1">
        <h2 className="font-headline-lg text-lg sm:text-xl text-primary font-bold uppercase tracking-tight mb-0.5">
          CONNECT THE COUPLES! 🦞
        </h2>
        <p className="font-body-md text-xs text-on-surface-variant">
          Tap a character on the left, then tap their match on the right.
        </p>
      </div>

      {/* Two-Column Matching Area */}
      <div className="w-full flex-1 max-h-[360px] bg-surface-container-high/60 border-4 border-primary rounded-2xl p-4 flex justify-between items-center relative tactile-shadow my-2">
        {/* Left Side Characters */}
        <div className="flex flex-col gap-5 z-20">
          {question.leftSide.map((item) => {
            const isPaired = !!matchedPairs[item.id];
            const isSelected = selectedLeft === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectLeft(item.id)}
                disabled={isPaired}
                className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full border-4 flex items-center justify-center font-headline-md text-xs sm:text-sm font-bold uppercase transition-all ${
                  isPaired
                    ? 'bg-primary-container text-on-primary border-primary opacity-90 scale-95'
                    : isSelected
                    ? 'bg-secondary-container border-secondary scale-110 shadow-lg animate-bounce'
                    : 'bg-primary-fixed border-primary text-on-primary-fixed tactile-shadow btn-press hover:scale-105'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Center Heart / Connection Indicator */}
        <div className="flex flex-col items-center justify-center gap-6 z-10 opacity-70">
          {question.leftSide.map((item) => {
            const isPaired = !!matchedPairs[item.id];
            return (
              <span
                key={item.id}
                className={`material-symbols-outlined text-2xl transition-all ${
                  isPaired ? 'text-error scale-125' : 'text-outline-variant/60'
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
            );
          })}
        </div>

        {/* Right Side Characters */}
        <div className="flex flex-col gap-5 z-20">
          {shuffledRightSide.map((item) => {
            const isPaired = Object.values(matchedPairs).includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleSelectRight(item.id)}
                disabled={isPaired || !selectedLeft}
                className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full border-4 flex items-center justify-center font-headline-md text-xs sm:text-sm font-bold uppercase transition-all ${
                  isPaired
                    ? 'bg-secondary-container text-on-secondary-container border-secondary opacity-90 scale-95'
                    : selectedLeft
                    ? 'bg-surface border-secondary-container animate-pulse shadow-md'
                    : 'bg-surface-container-lowest border-outline text-on-surface tactile-shadow btn-press'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      <p className="font-body-md text-xs text-on-surface-variant text-center my-1 italic">
        {selectedLeft ? 'Now tap their match on the right!' : 'Tap Ross, Monica, or Phoebe to start!'}
      </p>
    </div>
  );
};
