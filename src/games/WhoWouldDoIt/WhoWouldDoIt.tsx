import React, { useState } from 'react';
import { WhoWouldDoItQuestion } from '../../state/types';
import { sound } from '../../utils/audio';

interface WhoWouldDoItProps {
  question: WhoWouldDoItQuestion;
  onAnswer: (userChoice: string, isCorrect: boolean, reactionText?: string) => void;
  onRequestLockItIn?: (
    selectedLabel: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
  needsLockItIn?: boolean;
}

export const WhoWouldDoIt: React.FC<WhoWouldDoItProps> = ({
  question,
  onAnswer,
  onRequestLockItIn,
  needsLockItIn,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (charId: string, charName: string, reaction?: string) => {
    if (selectedId) return;
    setSelectedId(charId);
    sound.playClick();

    const isCorrect = question.correctCharacterIds.includes(charId);

    const finish = () => {
      if (isCorrect) sound.playCorrect();
      else sound.playWrong();
      onAnswer(charName, isCorrect, reaction || (isCorrect ? 'Classic Friends moment!' : undefined));
    };

    if (needsLockItIn && onRequestLockItIn) {
      onRequestLockItIn(charName, finish, () => {
        setSelectedId(null);
      });
    } else {
      finish();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-margin select-none overflow-hidden">
      {/* Question Prompt Card */}
      <div className="w-full bg-surface-container-lowest border-4 border-primary rounded-2xl p-card-padding tactile-shadow text-center my-1">
        <h2 className="font-headline-lg text-lg sm:text-xl text-primary font-bold uppercase tracking-tight mb-1">
          WHO WOULD DO IT?
        </h2>
        <p className="font-body-lg text-sm sm:text-base text-on-surface leading-snug">
          "{question.scenario}"
        </p>
      </div>

      {/* Hallway / Apartment Scene with Embedded Character Grid */}
      <div
        className="w-full flex-1 max-h-[360px] border-4 border-primary rounded-2xl overflow-hidden tactile-shadow bg-surface-container-low relative my-2 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${question.sceneImage || '/images/scenes/hallway.jpg'})`,
        }}
      >
        {/* Semi-transparent playful overlay */}
        <div className="absolute inset-0 bg-primary/10 pointer-events-none" />

        {/* 6 Integrated Character Circular Nodes */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4 w-full h-full items-center justify-items-center relative z-10">
          {question.characters.map((char) => {
            const isSelected = selectedId === char.id;
            return (
              <button
                key={char.id}
                onClick={() => handleSelect(char.id, char.name, char.reactionPrompt)}
                disabled={!!selectedId}
                className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full border-4 bg-surface-container-lowest overflow-hidden flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'border-secondary-container scale-110 shadow-lg bg-secondary-container'
                    : 'border-primary tactile-shadow hover:scale-105 btn-press'
                }`}
              >
                <div className="w-full h-full relative flex items-center justify-center bg-primary-fixed font-headline-md text-xl text-primary font-bold">
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
              </button>
            );
          })}
        </div>
      </div>

      <p className="font-body-md text-xs text-on-surface-variant text-center my-1 italic">
        Tap the friend who would pull this off!
      </p>
    </div>
  );
};
