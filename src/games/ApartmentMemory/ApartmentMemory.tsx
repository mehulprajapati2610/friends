import React, { useState, useEffect } from 'react';
import { ApartmentMemoryQuestion } from '../../state/types';
import { sound } from '../../utils/audio';

interface ApartmentMemoryProps {
  question: ApartmentMemoryQuestion;
  onAnswer: (userChoice: string, isCorrect: boolean, reactionText?: string) => void;
}

export const ApartmentMemory: React.FC<ApartmentMemoryProps> = ({
  question,
  onAnswer,
}) => {
  const [observeTime, setObserveTime] = useState<number>(3);
  const [isObserving, setIsObserving] = useState<boolean>(true);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  useEffect(() => {
    if (observeTime > 0) {
      const timer = setTimeout(() => {
        setObserveTime((prev) => prev - 1);
        sound.playTimerTick();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsObserving(false);
    }
  }, [observeTime]);

  const handleSelectObject = (objId: string, objLabel: string) => {
    if (selectedObjectId || isObserving) return;
    setSelectedObjectId(objId);
    sound.playClick();

    const isCorrect = objId === question.correctObjectId;
    if (isCorrect) {
      setShowSparkle(true);
      sound.playCorrect();
    } else {
      sound.playWrong();
    }

    setTimeout(() => {
      onAnswer(objLabel, isCorrect, isCorrect ? `You remembered ${question.missingObjectLabel}!` : undefined);
    }, 900);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-margin select-none overflow-hidden">
      {/* Question / Instruction Banner */}
      <div className="text-center my-1">
        <h2 className="font-headline-lg text-xl text-primary font-bold">
          {isObserving ? 'MEMORIZE THE ROOM! 👁️' : question.prompt}
        </h2>
        <p className="font-body-md text-xs text-on-surface-variant">
          {isObserving ? `Hiding an object in ${observeTime}s...` : 'Tap the item that disappeared!'}
        </p>
      </div>

      {/* The Apartment Scene Container */}
      <div className="w-full h-56 bg-surface-container-high rounded-2xl border-4 border-primary relative overflow-hidden tactile-shadow flex items-center justify-center">
        {/* Background Apartment Scene */}
        <img
          src={question.fullSceneImage}
          alt="Apartment Scene"
          className="w-full h-full object-cover opacity-90"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Observation Timer Badge */}
        {isObserving && (
          <div className="absolute top-3 right-3 bg-secondary-container border-2 border-on-secondary-container rounded-full px-3 py-1 flex items-center gap-1 font-headline-md text-sm text-on-secondary-container animate-pulse">
            <span className="material-symbols-outlined text-base">timer</span>
            <span>{observeTime}s</span>
          </div>
        )}

        {/* Celebration Sparkle */}
        {showSparkle && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="star-sparkle" />
          </div>
        )}
      </div>

      {/* 3 Interactive Object Options */}
      <div className="w-full grid grid-cols-3 gap-2.5 my-2">
        {question.options.map((item) => {
          const isSelected = selectedObjectId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectObject(item.id, item.label)}
              disabled={isObserving || !!selectedObjectId}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border-4 transition-all h-24 ${
                isObserving
                  ? 'opacity-50 cursor-not-allowed bg-surface-container border-outline'
                  : isSelected
                  ? 'bg-secondary-container border-secondary shadow-none scale-95'
                  : 'bg-surface-container-high border-outline tactile-shadow hover:border-primary btn-press'
              }`}
            >
              <span
                className="material-symbols-outlined text-primary text-3xl mb-1"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {item.icon}
              </span>
              <span className="font-label-bold text-xs text-on-surface text-center line-clamp-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
