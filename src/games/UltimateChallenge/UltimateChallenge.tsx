import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UltimateChallengeQuestion } from '../../state/types';
import { sound } from '../../utils/audio';

interface UltimateChallengeProps {
  question: UltimateChallengeQuestion;
  onAnswer: (userChoice: string, isCorrect: boolean, reactionText?: string) => void;
}

export const UltimateChallenge: React.FC<UltimateChallengeProps> = ({
  question,
  onAnswer,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(question.timeLimitSeconds || 15);
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    if (isGameOver) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
        if (timeLeft <= 5) {
          sound.playTimerTick();
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Time expired!
      setIsGameOver(true);
      sound.playWrong();
      setTimeout(() => {
        onAnswer(
          `Found ${foundIds.length} of ${question.targets.length} items`,
          false,
          'Time ran out on the final boss!'
        );
      }, 1000);
    }
  }, [timeLeft, isGameOver, foundIds.length, question.targets.length, onAnswer]);

  const handleTapObject = (objId: string) => {
    if (isGameOver || foundIds.includes(objId)) return;
    sound.playCorrect();

    const updated = [...foundIds, objId];
    setFoundIds(updated);

    // Check if all items found!
    if (updated.length === question.targets.length) {
      setIsGameOver(true);
      sound.playCelebration();

      // Confetti blast!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#fec733', '#96f2ee', '#d5baff', '#593b8a', '#ba1a1a'],
        });
      } catch {}

      setTimeout(() => {
        onAnswer(
          'Found all 3 items!',
          true,
          'ULTIMATE FAN STATUS UNLOCKED! 🏆'
        );
      }, 1200);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-margin select-none overflow-hidden relative">
      {/* Title & Urgent Timer */}
      <div className="w-full flex justify-between items-center my-1">
        <div className="text-left">
          <h2 className="font-headline-lg text-lg text-primary font-bold uppercase tracking-tight">
            FINAL BOSS CHALLENGE 🦞
          </h2>
          <p className="font-body-md text-xs text-on-surface-variant">
            Find: Geller Cup, Gladys, Hugsy!
          </p>
        </div>

        {/* Pulsing Timer */}
        <div
          className={`flex items-center gap-1 font-headline-xl text-lg px-3 py-1 rounded-full border-2 transition-all ${
            timeLeft <= 5
              ? 'bg-red-100 text-error border-error animate-ping-short'
              : 'bg-secondary-container text-on-secondary-container border-secondary'
          }`}
        >
          <span className="material-symbols-outlined text-base">timer</span>
          <span className="font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Targets Found Checklist Indicator */}
      <div className="w-full flex justify-around items-center bg-surface-container-high border-2 border-primary rounded-xl p-2 my-1">
        {question.targets.map((target) => {
          const isFound = foundIds.includes(target.id);
          return (
            <div key={target.id} className="flex items-center gap-1">
              <span
                className={`material-symbols-outlined text-xl transition-all ${
                  isFound ? 'text-secondary scale-125' : 'text-outline-variant/60'
                }`}
                style={{ fontVariationSettings: isFound ? "'FILL' 1" : "'FILL' 0" }}
              >
                {isFound ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              <span
                className={`font-label-bold text-xs truncate max-w-[80px] ${
                  isFound ? 'text-primary line-through' : 'text-on-surface'
                }`}
              >
                {target.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Chaotic Apartment Scene Canvas with Hidden Clickable Items */}
      <div className="w-full flex-1 max-h-[360px] border-4 border-primary rounded-2xl overflow-hidden tactile-shadow relative my-1 bg-surface-container-high">
        <img
          src={question.sceneImage}
          alt="Chaotic Apartment"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Hidden Interactive Objects */}
        {question.targets.map((target) => {
          const isFound = foundIds.includes(target.id);
          return (
            <button
              key={target.id}
              onClick={() => handleTapObject(target.id)}
              disabled={isFound}
              style={{
                top: `${target.topPercent}%`,
                left: `${target.leftPercent}%`,
                width: `${target.width}px`,
                height: `${target.height}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                isFound
                  ? 'border-4 border-secondary-container bg-secondary-container/80 scale-110 shadow-lg'
                  : 'hover:scale-110 active:scale-95 border-2 border-transparent'
              }`}
            >
              {target.image && (
                <img
                  src={target.image}
                  alt={target.label}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              )}
              <span className="material-symbols-outlined text-primary text-3xl">
                {target.icon || 'star'}
              </span>
              {isFound && <div className="star-sparkle" />}
            </button>
          );
        })}
      </div>

      <p className="font-body-md text-xs text-on-surface-variant text-center my-0.5 italic">
        Tap the hidden props directly inside the room!
      </p>
    </div>
  );
};
