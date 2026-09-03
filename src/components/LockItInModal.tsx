import React from 'react';
import { sound } from '../utils/audio';

interface LockItInModalProps {
  selectedLabel: string;
  onConfirm: () => void;
  onChangeAnswer: () => void;
}

export const LockItInModal: React.FC<LockItInModalProps> = ({
  selectedLabel,
  onConfirm,
  onChangeAnswer,
}) => {
  return (
    <div className="absolute inset-0 bg-on-surface/50 backdrop-blur-xs z-50 flex items-center justify-center p-margin animate-pop">
      <div className="w-full max-w-[340px] bg-surface-container-lowest border-4 border-primary rounded-2xl p-card-padding shadow-[8px_8px_0px_0px_rgba(89,59,138,1)] flex flex-col items-center text-center relative">
        {/* Decorative Padlock icon */}
        <div className="w-16 h-16 bg-secondary-container border-4 border-on-secondary-container rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(112,84,0,1)] -mt-12 mb-3">
          <span
            className="material-symbols-outlined text-3xl text-on-secondary-container"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            lock
          </span>
        </div>

        <h3 className="font-headline-lg text-headline-lg text-primary mb-1">
          LOCK IT IN? 🔒
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">
          You selected: <span className="font-bold text-on-surface underline">{selectedLabel}</span>
        </p>

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onConfirm();
            }}
            className="w-full bg-secondary-container text-on-secondary-container border-4 border-on-secondary-container rounded-xl py-3 px-4 font-headline-md text-headline-md shadow-[0px_4px_0px_0px_rgba(112,84,0,1)] btn-press flex items-center justify-center gap-2"
          >
            <span>I KNOW IT!</span>
            <span className="material-symbols-outlined font-bold">arrow_forward</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onChangeAnswer();
            }}
            className="w-full bg-surface-container border-2 border-outline rounded-xl py-2 px-4 font-label-bold text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            Change Answer
          </button>
        </div>
      </div>
    </div>
  );
};
