import { Question, QuestionCategory } from '../../state/types';
import { whoSaidItQuestions } from './whoSaidIt';
import { apartmentMemoryQuestions } from './apartmentMemory';
import { completeSceneQuestions } from './completeScene';
import { whoWouldDoItQuestions } from './whoWouldDoIt';
import { episodeDetectiveQuestions } from './episodeDetective';
import { relationshipPuzzleQuestions } from './relationshipPuzzle';
import { whatHappenedNextQuestions } from './whatHappenedNext';
import { centralPerkMemoryQuestions } from './centralPerkMemory';
import { soundMemoryQuestions } from './soundMemory';
import { ultimateChallengeQuestions } from './ultimateChallenge';

export const QUESTION_BANK: Record<QuestionCategory, Question[]> = {
  WHO_SAID_IT: whoSaidItQuestions,
  APARTMENT_MEMORY: apartmentMemoryQuestions,
  COMPLETE_THE_SCENE: completeSceneQuestions,
  WHO_WOULD_DO_IT: whoWouldDoItQuestions,
  EPISODE_DETECTIVE: episodeDetectiveQuestions,
  RELATIONSHIP_PUZZLE: relationshipPuzzleQuestions,
  WHAT_HAPPENED_NEXT: whatHappenedNextQuestions,
  CENTRAL_PERK_MEMORY: centralPerkMemoryQuestions,
  SOUND_MEMORY: soundMemoryQuestions,
  ULTIMATE_FAN_CHALLENGE: ultimateChallengeQuestions,
};

export const ALL_CATEGORIES: QuestionCategory[] = [
  'WHO_SAID_IT',
  'APARTMENT_MEMORY',
  'COMPLETE_THE_SCENE',
  'WHO_WOULD_DO_IT',
  'EPISODE_DETECTIVE',
  'RELATIONSHIP_PUZZLE',
  'WHAT_HAPPENED_NEXT',
  'CENTRAL_PERK_MEMORY',
  'SOUND_MEMORY',
  'ULTIMATE_FAN_CHALLENGE',
];
