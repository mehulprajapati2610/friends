import React, { useState } from 'react';
import { UserAnswer } from '../state/types';
import { sound } from '../utils/audio';

interface MissedReviewScreenProps {
  missedAnswers: UserAnswer[];
  onFinish: () => void;
  onPlayAgain: () => void;
}

export const MissedReviewScreen: React.FC<MissedReviewScreenProps> = ({
  missedAnswers,
  onFinish,
  onPlayAgain,
}) => {
  const [index, setIndex] = useState<number>(0);

  if (missedAnswers.length === 0) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center p-margin text-center">
        <h2 className="font-headline-xl text-2xl text-primary mb-2">FLAWLESS GAME! 🎉</h2>
        <p className="font-body-lg text-sm text-on-surface-variant mb-6">
          You didn't miss a single question! Monica would be proud.
        </p>
        <button
          onClick={onPlayAgain}
          className="bg-secondary-container text-on-secondary-container font-headline-md px-6 py-3 rounded-full border-4 border-on-secondary-container"
        >
          PLAY AGAIN
        </button>
      </div>
    );
  }

  const current = missedAnswers[index];
  const isLast = index === missedAnswers.length - 1;

  const handleNext = () => {
    sound.playClick();
    if (isLast) {
      onFinish();
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-margin select-none overflow-hidden">
      {/* Top Header */}
      <div className="flex justify-between items-center my-1">
        <div className="text-left">
          <span className="font-headline-lg text-lg text-primary font-bold">
            YOU MISSED THIS ONE 😅
          </span>
          <p className="font-body-md text-xs text-on-surface-variant">
            Question {index + 1} of {missedAnswers.length}
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onFinish();
          }}
          className="text-on-surface-variant p-1 text-xs font-label-bold underline"
        >
          Close
        </button>
      </div>

      {/* Center Missed Review Card */}
      <div className="w-full bg-surface-container-lowest border-4 border-primary rounded-2xl p-card-padding tactile-shadow my-auto flex flex-col gap-3 relative">
        <div className="bg-surface-container-high border border-outline-variant p-2.5 rounded-xl">
          <span className="font-label-bold text-xs text-primary uppercase block">
            {current.category.replace(/_/g, ' ')}
          </span>
          <h3 className="font-headline-md text-sm sm:text-base text-on-surface font-bold">
            {current.title}
          </h3>
        </div>

        {/* User Answer vs Correct Answer */}
        <div className="flex flex-col gap-2">
          <div className="bg-red-50 border-2 border-error p-2.5 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-label-bold text-[11px] text-error uppercase block">
                Your Answer
              </span>
              <span className="font-headline-md text-sm text-error font-bold">
                {current.userChoice}
              </span>
            </div>
            <span className="material-symbols-outlined text-error text-xl">close</span>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-600 p-2.5 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-label-bold text-[11px] text-emerald-800 uppercase block">
                Correct Answer
              </span>
              <span className="font-headline-md text-sm text-emerald-800 font-bold">
                {current.correctChoice}
              </span>
            </div>
            <span className="material-symbols-outlined text-emerald-700 text-xl">check</span>
          </div>
        </div>

        {/* Episode / Season Information */}
        {current.seasonEpisode && (
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-label-bold">
            <span className="material-symbols-outlined text-base text-primary">live_tv</span>
            <span>{current.seasonEpisode}</span>
          </div>
        )}

        {/* Short Explanation */}
        <p className="font-body-md text-xs text-on-surface leading-snug bg-surface-container-low p-2 rounded-lg border border-outline-variant/60">
          {current.explanation}
        </p>
      </div>

      {/* Bottom Button */}
      <div className="w-full flex flex-col gap-2 my-2">
        <button
          onClick={handleNext}
          className="w-full bg-secondary-container text-on-secondary-container border-4 border-on-secondary-container py-3 px-4 rounded-xl font-headline-md text-base flex items-center justify-center gap-2 tactile-shadow-secondary btn-press"
        >
          <span>{isLast ? "THAT'S WHAT YOU MISSED 🛋️" : 'NEXT MISSED →'}</span>
          <span className="material-symbols-outlined text-base">
            {isLast ? 'check' : 'arrow_forward'}
          </span>
        </button>

        {isLast && (
          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="w-full bg-primary text-on-primary border-4 border-on-surface py-2.5 px-4 rounded-xl font-headline-md text-sm flex items-center justify-center gap-2 btn-press"
          >
            <span className="material-symbols-outlined text-base">replay</span>
            <span>PLAY AGAIN</span>
          </button>
        )}
      </div>
    </div>
  );
};
