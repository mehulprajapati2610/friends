import React, { useState } from 'react';
import { WhoSaidItQuestion } from '../../state/types';
import { sound } from '../../utils/audio';

interface WhoSaidItProps {
  question: WhoSaidItQuestion;
  onAnswer: (userChoice: string, isCorrect: boolean, reactionText?: string) => void;
  onRequestLockItIn?: (
    selectedLabel: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
  needsLockItIn?: boolean;
}

export const WhoSaidIt: React.FC<WhoSaidItProps> = ({
  question,
  onAnswer,
  onRequestLockItIn,
  needsLockItIn,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (charId: string, charName: string, reaction?: string) => {
    if (selectedId) return; // Prevent double tap
    setSelectedId(charId);
    sound.playClick();

    const isCorrect = charId === question.correctCharacterId;

    if (needsLockItIn && onRequestLockItIn) {
      onRequestLockItIn(
        charName,
        () => {
          if (isCorrect) sound.playCorrect();
          else sound.playWrong();
          onAnswer(charName, isCorrect, reaction);
        },
        () => {
          setSelectedId(null);
        }
      );
    } else {
      if (isCorrect) sound.playCorrect();
      else sound.playWrong();
      onAnswer(charName, isCorrect, reaction);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-margin select-none overflow-hidden">
      {/* Category Title */}
      <div className="text-center my-1">
        <span className="font-headline-md text-headline-md text-primary tracking-wide">
          WHO SAID IT?
        </span>
      </div>

      {/* Speech Bubble Quote Card */}
      <div className="w-full bg-surface-container-lowest border-4 border-primary rounded-2xl p-card-padding tactile-shadow relative">
        <div className="absolute -top-3.5 -left-3.5 bg-secondary-container border-2 border-on-secondary-container rounded-full w-9 h-9 flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-on-secondary-container text-base">
            format_quote
          </span>
        </div>
        <p className="font-headline-lg text-lg sm:text-xl text-on-surface text-center leading-tight tracking-tight">
          "{question.quote}"
        </p>

        {/* Tail of speech bubble */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-primary" />
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-surface-container-lowest z-10" />
      </div>

      {/* 6 Character Choices Grid */}
      <div className="grid grid-cols-2 gap-2.5 w-full mt-4 mb-2">
        {question.characters.map((char) => {
          const isSelected = selectedId === char.id;
          return (
            <button
              key={char.id}
              onClick={() => handleSelect(char.id, char.name, char.reactionPrompt)}
              disabled={!!selectedId}
              className={`flex items-center gap-2 p-2.5 rounded-xl border-4 transition-all btn-press ${
                isSelected
                  ? 'bg-secondary-container border-secondary shadow-none scale-95'
                  : 'bg-surface-container-high border-outline tactile-shadow hover:border-primary'
              }`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary shrink-0 bg-primary-fixed flex items-center justify-center font-headline-md text-base text-primary font-bold relative">
                <span>{char.name.charAt(0)}</span>
                <img
                  src={char.avatar}
                  alt={char.name}
                  className="w-full h-full object-cover absolute inset-0"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="font-label-bold text-sm text-on-surface uppercase tracking-wide truncate">
                {char.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
