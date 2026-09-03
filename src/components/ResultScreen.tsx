import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { FanLevel, UserAnswer } from '../state/types';
import { sound } from '../utils/audio';

interface ResultScreenProps {
  score: number;
  totalScore: number;
  correctCount: number;
  totalQuestions: number;
  userAnswers: UserAnswer[];
  onPlayAgain: () => void;
  onReviewMissed: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  correctCount,
  totalQuestions,
  userAnswers,
  onPlayAgain,
  onReviewMissed,
}) => {
  // Determine Fan Level
  let fanLevel: FanLevel = 'CASUAL VIEWER';
  if (correctCount === 10) fanLevel = 'ULTIMATE FRIENDS FAN';
  else if (correctCount >= 8) fanLevel = 'SUPERFAN 🦞';
  else if (correctCount >= 6) fanLevel = 'BIG FAN';
  else if (correctCount >= 4) fanLevel = 'FAN';

  const missedCount = userAnswers.filter((a) => !a.isCorrect).length;

  useEffect(() => {
    sound.playCelebration();
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#fec733', '#96f2ee', '#d5baff', '#593b8a', '#ba1a1a'],
      });
    } catch {}

    // Save best score to localStorage
    try {
      const currentBest = Number(localStorage.getItem('friends_test_best_score') || '0');
      if (score > currentBest) {
        localStorage.setItem('friends_test_best_score', String(score));
      }
    } catch {}
  }, [score]);

  // Share result via navigator.share or clipboard
  const handleShare = async () => {
    sound.playClick();
    const shareText = `I scored ${correctCount}/${totalQuestions} on The Friends Fan Test! 🛋️ My rank: ${fanLevel}! How well do you know Friends?`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'The Friends Fan Test',
          text: shareText,
          url: window.location.href,
        });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Result copied to clipboard! 🦞');
      } catch {
        alert(shareText);
      }
    }
  };

  // Category breakdown ratings
  const getCategoryRating = (typeKeyword: string): number => {
    const matching = userAnswers.filter((a) => a.category.includes(typeKeyword));
    if (matching.length === 0) return 0;
    const correct = matching.filter((a) => a.isCorrect).length;
    return Math.min(10, Math.max(0, Math.round((correct / matching.length) * 10)));
  };

  const charDots = getCategoryRating('WHO');
  const epDots = getCategoryRating('EPISODE');
  const quoteDots = getCategoryRating('SAID');
  const randomDots = Math.min(10, Math.max(0, Math.round((correctCount / totalQuestions) * 10)));

  const renderDots = (count: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full border border-primary ${
              i < count ? 'bg-secondary-container' : 'bg-surface'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-margin select-none overflow-hidden relative">
      {/* Top Header Score & Rank */}
      <div className="flex flex-col items-center justify-center pt-2">
        <span className="font-headline-md text-base text-on-surface-variant font-bold">
          {correctCount} / {totalQuestions}
        </span>
        <h1 className="font-headline-xl text-2xl sm:text-3xl text-primary font-extrabold uppercase tracking-tight text-center flex items-center gap-1">
          <span>{fanLevel}</span>
        </h1>
        <span className="font-label-bold text-xs bg-secondary-container text-on-secondary-container px-3 py-0.5 rounded-full border border-secondary mt-1">
          Score: {score} pts
        </span>
      </div>

      {/* Center Tactile Card with Lobster Illustration and Stats */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-card-padding border-4 border-primary tactile-shadow relative flex flex-col items-center my-auto">
        {/* Floating trophy doodle */}
        <div className="absolute -top-5 -right-3 w-12 h-12 bg-secondary-container rounded-full border-3 border-on-surface flex items-center justify-center shadow-md transform rotate-12 z-20">
          <span
            className="material-symbols-outlined text-2xl text-on-surface"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            emoji_events
          </span>
        </div>

        {/* Lobster art banner */}
        <div className="w-full h-28 bg-surface-container rounded-xl border-2 border-outline-variant mb-3 overflow-hidden relative flex items-center justify-center">
          <img
            src="/images/scenes/lobster-mascot.jpg"
            alt="Lobster Mascot"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Category Breakdown Progress Dots */}
        <div className="w-full flex flex-col gap-2">
          <div>
            <div className="flex justify-between items-center text-xs font-label-bold text-on-surface mb-0.5">
              <span>Character Knowledge</span>
              <span>{charDots}/10</span>
            </div>
            {renderDots(charDots)}
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-label-bold text-on-surface mb-0.5">
              <span>Episode Memory</span>
              <span>{epDots}/10</span>
            </div>
            {renderDots(epDots)}
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-label-bold text-on-surface mb-0.5">
              <span>Quote Knowledge</span>
              <span>{quoteDots}/10</span>
            </div>
            {renderDots(quoteDots)}
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-label-bold text-on-surface mb-0.5">
              <span>Random Details</span>
              <span>{randomDots}/10</span>
            </div>
            {renderDots(randomDots)}
          </div>
        </div>

        <p className="font-body-md text-xs text-primary font-bold text-center mt-3 italic">
          "You know your Friends."
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="w-full flex flex-col gap-2 pt-2">
        {missedCount > 0 && (
          <button
            onClick={() => {
              sound.playClick();
              onReviewMissed();
            }}
            className="w-full bg-surface-container border-3 border-outline text-on-surface py-2.5 px-4 rounded-xl font-label-bold text-xs flex items-center justify-center gap-1.5 btn-press hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-base">help</span>
            <span>SEE WHAT I MISSED ({missedCount})</span>
          </button>
        )}

        <button
          onClick={handleShare}
          className="w-full bg-primary text-on-primary border-4 border-on-surface py-3 px-4 rounded-xl font-headline-md text-sm sm:text-base flex items-center justify-center gap-2 tactile-shadow btn-press"
        >
          <span className="material-symbols-outlined text-lg">share</span>
          <span>SHARE MY RESULT</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onPlayAgain();
          }}
          className="w-full bg-secondary-container text-on-secondary-container border-4 border-on-secondary-container py-3 px-4 rounded-xl font-headline-md text-sm sm:text-base flex items-center justify-center gap-2 tactile-shadow-secondary btn-press"
        >
          <span className="material-symbols-outlined text-lg">replay</span>
          <span>PLAY AGAIN</span>
        </button>
      </div>
    </div>
  );
};
