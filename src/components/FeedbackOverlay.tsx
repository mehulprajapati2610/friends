import React from 'react';

interface FeedbackOverlayProps {
  isCorrect: boolean;
  correctAnswerText?: string;
  reactionText?: string;
  pointsEarned: number;
}

export const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({
  isCorrect,
  correctAnswerText,
  reactionText,
  pointsEarned,
}) => {
  return (
    <div className="absolute inset-0 bg-surface/85 backdrop-blur-xs z-50 flex items-center justify-center p-margin animate-pop select-none pointer-events-none">
      <div
        className={`w-full max-w-[320px] rounded-2xl p-6 border-4 flex flex-col items-center text-center relative ${
          isCorrect
            ? 'bg-secondary-container border-secondary shadow-[6px_6px_0px_0px_rgba(120,90,0,1)]'
            : 'bg-surface-container-high border-error shadow-[6px_6px_0px_0px_rgba(186,26,26,1)] wiggle'
        }`}
      >
        <span
          className={`material-symbols-outlined text-6xl mb-2 ${
            isCorrect ? 'text-on-secondary-container' : 'text-error'
          }`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {isCorrect ? 'check_circle' : 'cancel'}
        </span>

        <h2
          className={`font-headline-xl text-headline-xl uppercase tracking-tight mb-1 ${
            isCorrect ? 'text-on-secondary-container' : 'text-error'
          }`}
        >
          {isCorrect ? 'CORRECT!' : 'NOT QUITE!'}
        </h2>

        {reactionText && (
          <p className="font-body-lg text-body-lg text-on-surface mb-2 italic">
            "{reactionText}"
          </p>
        )}

        {!isCorrect && correctAnswerText && (
          <div className="bg-surface p-2 px-3 rounded-lg border-2 border-outline mb-2">
            <span className="font-label-bold text-xs uppercase text-on-surface-variant block">Correct:</span>
            <span className="font-headline-md text-sm text-primary font-bold">{correctAnswerText}</span>
          </div>
        )}

        <div className="flex items-center gap-1 font-label-bold text-sm bg-surface/70 px-3 py-1 rounded-full border border-outline-variant">
          <span>{isCorrect ? `+${pointsEarned} PTS` : '+0 PTS'}</span>
          <span
            className="material-symbols-outlined text-base text-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
        </div>
      </div>
    </div>
  );
};
