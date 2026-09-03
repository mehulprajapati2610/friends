import React, { useState } from 'react';
import { Question, UserAnswer } from './state/types';
import { createGameSession } from './services/sessionEngine';
import { sound } from './utils/audio';
import { FRIENDS_CHARACTERS } from './data/characters';

import { Header } from './components/Header';
import { LockItInModal } from './components/LockItInModal';
import { FeedbackOverlay } from './components/FeedbackOverlay';
import { HomeScreen } from './components/HomeScreen';
import { ResultScreen } from './components/ResultScreen';
import { MissedReviewScreen } from './components/MissedReviewScreen';

import { WhoSaidIt } from './games/WhoSaidIt/WhoSaidIt';
import { ApartmentMemory } from './games/ApartmentMemory/ApartmentMemory';
import { CompleteScene } from './games/CompleteScene/CompleteScene';
import { WhoWouldDoIt } from './games/WhoWouldDoIt/WhoWouldDoIt';
import { EpisodeDetective } from './games/EpisodeDetective/EpisodeDetective';
import { RelationshipPuzzle } from './games/RelationshipPuzzle/RelationshipPuzzle';
import { WhatHappenedNext } from './games/WhatHappenedNext/WhatHappenedNext';
import { CentralPerkMemory } from './games/CentralPerkMemory/CentralPerkMemory';
import { SoundMemory } from './games/SoundMemory/SoundMemory';
import { UltimateChallenge } from './games/UltimateChallenge/UltimateChallenge';

type ScreenState = 'HOME' | 'GAME' | 'RESULT' | 'REVIEW_MISSED';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('HOME');
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [lockItInIndices, setLockItInIndices] = useState<number[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  // Lock It In state
  const [lockItInState, setLockItInState] = useState<{
    label: string;
    onConfirm: () => void;
    onCancel?: () => void;
  } | null>(null);

  // Short feedback state
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    correctAnswerText?: string;
    reactionText?: string;
    pointsEarned: number;
  } | null>(null);

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleStartGame = () => {
    sound.startBgm();
    const session = createGameSession();
    setSessionQuestions(session.questions);
    setLockItInIndices(session.lockItInIndices);
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setUserAnswers([]);
    setFeedback(null);
    setLockItInState(null);
    setScreen('GAME');
  };

  const handleQuestionAnswer = (
    userChoice: string,
    isCorrect: boolean,
    reactionText?: string,
    customPoints?: number
  ) => {
    const currentQ = sessionQuestions[currentIndex];
    const pointsToAdd = isCorrect ? (customPoints !== undefined ? customPoints : currentQ.points) : 0;

    // Stop any active sound cues so audio never bleeds into next questions
    sound.stopSoundCue();

    // Determine correct text representation for missed review
    let correctChoiceText = '';
    if (currentQ.category === 'WHO_SAID_IT') {
      correctChoiceText = FRIENDS_CHARACTERS[currentQ.correctCharacterId]?.name || currentQ.correctCharacterId;
    } else if (currentQ.category === 'APARTMENT_MEMORY') {
      correctChoiceText = currentQ.missingObjectLabel;
    } else if (currentQ.category === 'COMPLETE_THE_SCENE') {
      correctChoiceText = 'All props positioned';
    } else if (currentQ.category === 'WHO_WOULD_DO_IT') {
      correctChoiceText = currentQ.correctCharacterIds
        .map((id) => FRIENDS_CHARACTERS[id]?.name || id)
        .join(', ');
    }
    else if (currentQ.category === 'EPISODE_DETECTIVE') {
      const correctOpt = currentQ.options.find((o) => o.isCorrect);
      correctChoiceText = correctOpt ? correctOpt.label : '';
    } else if (currentQ.category === 'RELATIONSHIP_PUZZLE') {
      correctChoiceText = 'Ross-Rachel, Monica-Chandler, Phoebe-Mike';
    } else if (currentQ.category === 'WHAT_HAPPENED_NEXT') {
      const correctOpt = currentQ.options.find((o) => o.isCorrect);
      correctChoiceText = correctOpt ? correctOpt.text : '';
    } else if (currentQ.category === 'CENTRAL_PERK_MEMORY') {
      const correctOpt = currentQ.options.find((o) => o.id === currentQ.correctOptionId);
      correctChoiceText = correctOpt ? correctOpt.name : '';
    } else if (currentQ.category === 'SOUND_MEMORY') {
      const correctOpt = currentQ.options.find((o) => o.isCorrect);
      correctChoiceText = correctOpt ? correctOpt.name : '';
    } else if (currentQ.category === 'ULTIMATE_FAN_CHALLENGE') {
      correctChoiceText = 'Geller Cup, Gladys, Hugsy';
    }

    const answerRecord: UserAnswer = {
      questionId: currentQ.id,
      category: currentQ.category,
      title: currentQ.title,
      userChoice,
      correctChoice: correctChoiceText,
      isCorrect,
      explanation: currentQ.explanation,
      seasonEpisode: currentQ.seasonEpisode,
      image: currentQ.image,
      pointsEarned: pointsToAdd,
    };

    setUserAnswers((prev) => [...prev, answerRecord]);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setScore((prev) => prev + pointsToAdd);
    }

    // Show 700ms feedback overlay
    setFeedback({
      isCorrect,
      reactionText,
      correctAnswerText: !isCorrect ? correctChoiceText : undefined,
      pointsEarned: pointsToAdd,
    });

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < sessionQuestions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setScreen('RESULT');
      }
    }, 850);
  };

  const handleRequestLockItIn = (
    label: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    setLockItInState({
      label,
      onConfirm: () => {
        setLockItInState(null);
        onConfirm();
      },
      onCancel: () => {
        setLockItInState(null);
        if (onCancel) onCancel();
      },
    });
  };

  // Render active mini-game component
  const renderCurrentGame = () => {
    if (!sessionQuestions[currentIndex]) return null;
    const currentQ = sessionQuestions[currentIndex];
    const isLockEligible = lockItInIndices.includes(currentIndex);

    switch (currentQ.category) {
      case 'WHO_SAID_IT':
        return (
          <WhoSaidIt
            key={currentQ.id}
            question={currentQ}
            onAnswer={handleQuestionAnswer}
            onRequestLockItIn={handleRequestLockItIn}
            needsLockItIn={isLockEligible}
          />
        );
      case 'APARTMENT_MEMORY':
        return (
          <ApartmentMemory
            key={currentQ.id}
            question={currentQ}
            onAnswer={handleQuestionAnswer}
          />
        );
      case 'COMPLETE_THE_SCENE':
        return (
          <CompleteScene
            key={currentQ.id}
            question={currentQ}
            onAnswer={handleQuestionAnswer}
          />
        );
      case 'WHO_WOULD_DO_IT':
        return (
          <WhoWouldDoIt
            key={currentQ.id}
            question={currentQ}
            onAnswer={handleQuestionAnswer}
            onRequestLockItIn={handleRequestLockItIn}
            needsLockItIn={isLockEligible}
          />
        );
      case 'EPISODE_DETECTIVE':
        return (
          <EpisodeDetective
            key={currentQ.id}
            question={currentQ}
            onAnswer={handleQuestionAnswer}
            onRequestLockItIn={handleRequestLockItIn}
            needsLockItIn={isLockEligible}
          />
        );
      case 'RELATIONSHIP_PUZZLE':
        return (
          <RelationshipPuzzle
            key={currentQ.id}
            question={currentQ}
            onAnswer={handleQuestionAnswer}
          />
        );
      case 'WHAT_HAPPENED_NEXT':
        return (
          <WhatHappenedNext
            key={currentQ.id}
            question={currentQ}
            onAnswer={handleQuestionAnswer}
            onRequestLockItIn={handleRequestLockItIn}
            needsLockItIn={isLockEligible}
          />
        );
      case 'CENTRAL_PERK_MEMORY':
        return (
          <CentralPerkMemory
            key={currentQ.id}
            question={currentQ}
            onAnswer={handleQuestionAnswer}
          />
        );
      case 'SOUND_MEMORY':
        return (
          <SoundMemory
            key={currentQ.id}
            question={currentQ}
            onAnswer={handleQuestionAnswer}
            onRequestLockItIn={handleRequestLockItIn}
            needsLockItIn={isLockEligible}
          />
        );
      case 'ULTIMATE_FAN_CHALLENGE':
        return (
          <UltimateChallenge
            key={currentQ.id}
            question={currentQ}
            onAnswer={handleQuestionAnswer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-neutral-900 flex items-center justify-center p-0 sm:p-4">
      {/* Mobile-first viewport container (390 x 844 target) */}
      <div className="game-viewport-container bg-background shadow-2xl border-0 sm:border-4 sm:border-primary sm:rounded-3xl relative">
        {screen === 'HOME' && (
          <HomeScreen
            onStart={handleStartGame}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        )}

        {screen === 'GAME' && (
          <div className="w-full h-full flex flex-col justify-between overflow-hidden relative">
            <Header
              currentIndex={currentIndex}
              totalQuestions={sessionQuestions.length}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              score={score}
            />

            {/* Active Mini-Game */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
              {renderCurrentGame()}
            </div>

            {/* Lock It In Modal */}
            {lockItInState && (
              <LockItInModal
                selectedLabel={lockItInState.label}
                onConfirm={lockItInState.onConfirm}
                onChangeAnswer={() => {
                  if (lockItInState.onCancel) {
                    lockItInState.onCancel();
                  } else {
                    setLockItInState(null);
                  }
                }}
              />
            )}

            {/* Brief Feedback Overlay */}
            {feedback && (
              <FeedbackOverlay
                isCorrect={feedback.isCorrect}
                correctAnswerText={feedback.correctAnswerText}
                reactionText={feedback.reactionText}
                pointsEarned={feedback.pointsEarned}
              />
            )}
          </div>
        )}

        {screen === 'RESULT' && (
          <ResultScreen
            score={score}
            totalScore={sessionQuestions.length * 100}
            correctCount={correctCount}
            totalQuestions={sessionQuestions.length}
            userAnswers={userAnswers}
            onPlayAgain={handleStartGame}
            onReviewMissed={() => setScreen('REVIEW_MISSED')}
          />
        )}

        {screen === 'REVIEW_MISSED' && (
          <MissedReviewScreen
            missedAnswers={userAnswers.filter((a) => !a.isCorrect)}
            onFinish={() => setScreen('RESULT')}
            onPlayAgain={handleStartGame}
          />
        )}
      </div>
    </div>
  );
};
export default App;
