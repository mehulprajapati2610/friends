import React, { useState } from 'react';
import { sound } from '../utils/audio';

interface HomeScreenProps {
  onStart: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStart,
  isMuted,
  onToggleMute,
}) => {
  const [showBestScore, setShowBestScore] = useState<boolean>(false);

  // Read best score from localStorage
  const bestScore = localStorage.getItem('friends_test_best_score') || null;

  return (
    <div className="w-full h-full flex flex-col justify-between bg-noise relative overflow-hidden select-none">
      {/* Top Shell Header */}
      <header className="w-full flex justify-between items-center px-margin h-16 bg-background border-b-4 border-primary shadow-[4px_4px_0px_0px_rgba(89,59,138,1)] z-20">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            chair
          </span>
          <span className="font-headline-md text-base sm:text-lg text-primary font-bold">
            THE FAN TEST
          </span>
        </div>

        {bestScore && (
          <span className="font-label-bold text-xs bg-secondary-container/60 text-on-secondary-container px-2.5 py-1 rounded-full border border-secondary">
            Best: {bestScore}
          </span>
        )}
      </header>

      {/* Floating Background Doodles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Coffee Mug Top Left */}
        <div className="absolute top-20 left-4 float-1 bg-surface-container-high rounded-full p-3 border-4 border-primary shadow-[4px_4px_0px_0px_rgba(89,59,138,1)]">
          <span
            className="material-symbols-outlined text-3xl text-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_cafe
          </span>
        </div>

        {/* Taxi Right */}
        <div className="absolute top-36 right-4 float-2 bg-secondary-container rounded-xl p-2.5 border-4 border-on-secondary-container shadow-[4px_4px_0px_0px_rgba(112,84,0,1)] rotate-12">
          <span
            className="material-symbols-outlined text-3xl text-on-secondary-container"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_taxi
          </span>
        </div>

        {/* Guitar Bottom Left */}
        <div className="absolute bottom-28 left-4 float-3 bg-tertiary-container rounded-lg p-2.5 border-4 border-on-tertiary-fixed-variant shadow-[4px_4px_0px_0px_rgba(0,80,78,1)] -rotate-12">
          <span
            className="material-symbols-outlined text-3xl text-on-tertiary-container"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            music_note
          </span>
        </div>

        {/* Lobster Bottom Right */}
        <div className="absolute bottom-24 right-4 float-1 bg-[#ffdad6] rounded-full p-3 border-4 border-[#93000a] shadow-[4px_4px_0px_0px_rgba(147,0,10,1)] rotate-45">
          <span
            className="material-symbols-outlined text-3xl text-[#93000a]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            pets
          </span>
        </div>
      </div>

      {/* Main Center Stage: Monica's Purple Door Container */}
      <main className="relative z-10 w-full px-margin flex flex-col items-center justify-center my-auto">
        <div className="w-full bg-primary rounded-2xl border-8 border-on-primary-fixed-variant shadow-[8px_8px_0px_0px_rgba(39,0,87,1)] p-card-padding flex flex-col items-center relative overflow-hidden">
          {/* Inner Yellow Frame */}
          <div className="absolute inset-3 border-6 border-secondary-container rounded-xl pointer-events-none opacity-80" />

          {/* Yellow Peephole Frame */}
          <div className="w-9 h-9 bg-on-primary-fixed-variant rounded-full border-4 border-secondary-container absolute top-4 z-20" />

          {/* Door Text Content */}
          <div className="bg-surface/95 backdrop-blur-xs p-5 rounded-xl border-4 border-primary shadow-[6px_6px_0px_0px_rgba(89,59,138,1)] mt-8 mb-6 text-center relative z-20 w-full transform -rotate-1">
            <h1 className="font-headline-xl text-3xl sm:text-4xl text-on-surface mb-1 font-extrabold tracking-tight">
              THE
              <br />
              FRIENDS
              <br />
              TEST
            </h1>

            {/* Friends colored dots */}
            <div className="flex justify-center my-2">
              <span className="friends-dot dot-red" />
              <span className="friends-dot dot-yellow" />
              <span className="friends-dot dot-blue" />
            </div>

            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant font-semibold mb-1">
              10 interactive mini-games.
            </p>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant italic">
              How much do you REALLY remember?
            </p>
          </div>

          {/* Start CTA Button */}
          <button
            onClick={() => {
              sound.playClick();
              onStart();
            }}
            className="w-full relative z-20 bg-secondary-container text-on-secondary-container font-headline-md text-base sm:text-lg border-4 border-on-secondary-container rounded-full py-3.5 px-6 shadow-[0px_6px_0px_0px_rgba(112,84,0,1)] btn-press hover:scale-[1.02] flex items-center justify-center gap-2 group"
          >
            <span>START THE TEST</span>
            <span className="material-symbols-outlined font-bold group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </main>

      {/* Best score modal info */}
      {showBestScore && (
        <div className="absolute inset-0 bg-on-surface/40 z-50 flex items-center justify-center p-4">
          <div className="bg-surface p-6 rounded-2xl border-4 border-primary shadow-lg text-center max-w-[280px]">
            <h3 className="font-headline-md text-primary text-lg mb-2">YOUR BEST RECORD</h3>
            <p className="font-body-md text-sm text-on-surface mb-4">
              {bestScore ? `Highest Score: ${bestScore} points` : 'No games finished yet. Play a game to set a record!'}
            </p>
            <button
              onClick={() => setShowBestScore(false)}
              className="bg-primary text-white font-label-bold px-4 py-2 rounded-full text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Bottom Shell Navigation (Active on Home only) */}
      <nav className="w-full z-20 flex justify-around items-center px-4 pb-4 pt-2 bg-surface border-t-4 border-on-surface shadow-[0px_-4px_0px_0px_rgba(29,27,32,1)] rounded-t-2xl">
        <button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1.5 border-2 border-on-secondary-container scale-95 transition-all">
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            home
          </span>
          <span className="font-label-bold text-[11px]">Home</span>
        </button>

        <button
          onClick={() => setShowBestScore(true)}
          className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:scale-110 transition-transform btn-press"
        >
          <span className="material-symbols-outlined text-xl">leaderboard</span>
          <span className="font-label-bold text-[11px]">Rank</span>
        </button>

        <button
          onClick={onToggleMute}
          className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:scale-110 transition-transform btn-press"
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: isMuted ? "'FILL' 0" : "'FILL' 1" }}
          >
            {isMuted ? 'volume_off' : 'volume_up'}
          </span>
          <span className="font-label-bold text-[11px]">{isMuted ? 'Muted' : 'Sound'}</span>
        </button>
      </nav>
    </div>
  );
};
