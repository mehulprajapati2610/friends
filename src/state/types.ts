export type QuestionCategory =
  | 'WHO_SAID_IT'
  | 'APARTMENT_MEMORY'
  | 'COMPLETE_THE_SCENE'
  | 'WHO_WOULD_DO_IT'
  | 'EPISODE_DETECTIVE'
  | 'RELATIONSHIP_PUZZLE'
  | 'WHAT_HAPPENED_NEXT'
  | 'CENTRAL_PERK_MEMORY'
  | 'SOUND_MEMORY'
  | 'ULTIMATE_FAN_CHALLENGE';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface CharacterChoice {
  id: string;
  name: string;
  avatar: string;
  reactionPrompt?: string;
}

export interface MemoryObject {
  id: string;
  label: string;
  icon: string;
  isCorrect?: boolean;
}

export interface DraggableItem {
  id: string;
  label: string;
  color?: string;
  icon?: string;
  targetId: string;
}

export interface Dropzone {
  id: string;
  label?: string;
  topPercent: number;
  leftPercent: number;
}

export interface PuzzleMatchPair {
  leftId: string;
  leftLabel: string;
  rightId: string;
  rightLabel: string;
}

export interface HuntObject {
  id: string;
  label: string;
  topPercent: number;
  leftPercent: number;
  width: number;
  height: number;
  image?: string;
  icon?: string;
}

export interface BaseQuestion {
  id: string;
  category: QuestionCategory;
  title: string;
  difficulty: Difficulty;
  seasonEpisode?: string;
  explanation: string;
  image?: string;
  audio?: string;
  points: number;
  allowLockItIn?: boolean;
}

export interface WhoSaidItQuestion extends BaseQuestion {
  category: 'WHO_SAID_IT';
  quote: string;
  correctCharacterId: string;
  characters: CharacterChoice[];
}

export interface ApartmentMemoryQuestion extends BaseQuestion {
  category: 'APARTMENT_MEMORY';
  prompt: string;
  fullSceneImage: string;
  missingSceneImage: string;
  missingObjectLabel: string;
  options: MemoryObject[];
  correctObjectId: string;
}

export interface CompleteSceneQuestion extends BaseQuestion {
  category: 'COMPLETE_THE_SCENE';
  prompt: string;
  sceneImage: string;
  dropzones: Dropzone[];
  items: DraggableItem[];
  feedbackBadge?: string;
}

export interface WhoWouldDoItQuestion extends BaseQuestion {
  category: 'WHO_WOULD_DO_IT';
  scenario: string;
  correctCharacterIds: string[]; // Can accept Chandler, Joey, etc.
  characters: CharacterChoice[];
  sceneImage?: string;
}

export interface EpisodeDetectiveQuestion extends BaseQuestion {
  category: 'EPISODE_DETECTIVE';
  clues: [string, string, string]; // Clue 1 (100pts), Clue 2 (-25pts), Clue 3 (-25pts)
  options: { id: string; label: string; isCorrect: boolean }[];
}

export interface RelationshipPuzzleQuestion extends BaseQuestion {
  category: 'RELATIONSHIP_PUZZLE';
  prompt: string;
  leftSide: { id: string; name: string }[];
  rightSide: { id: string; name: string }[];
  correctPairs: Record<string, string>; // e.g. { ross: 'rachel', monica: 'chandler', phoebe: 'mike' }
}

export interface WhatHappenedNextQuestion extends BaseQuestion {
  category: 'WHAT_HAPPENED_NEXT';
  situation: string;
  sceneImage: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  reactionText: string; // e.g. "PIVOT!"
}

export interface CentralPerkMemoryQuestion extends BaseQuestion {
  category: 'CENTRAL_PERK_MEMORY';
  prompt: string;
  observationImage: string;
  questionMarkerPosition: { top: string; left: string };
  options: { id: string; name: string }[];
  correctOptionId: string;
}

export interface SoundMemoryQuestion extends BaseQuestion {
  category: 'SOUND_MEMORY';
  soundCueText: string;
  soundType: string;
  options: { id: string; name: string; isCorrect: boolean }[];
}

export interface UltimateChallengeQuestion extends BaseQuestion {
  category: 'ULTIMATE_FAN_CHALLENGE';
  instruction: string;
  timeLimitSeconds: number;
  sceneImage: string;
  targets: HuntObject[];
}

export type Question =
  | WhoSaidItQuestion
  | ApartmentMemoryQuestion
  | CompleteSceneQuestion
  | WhoWouldDoItQuestion
  | EpisodeDetectiveQuestion
  | RelationshipPuzzleQuestion
  | WhatHappenedNextQuestion
  | CentralPerkMemoryQuestion
  | SoundMemoryQuestion
  | UltimateChallengeQuestion;

export interface UserAnswer {
  questionId: string;
  category: QuestionCategory;
  title: string;
  userChoice: string;
  correctChoice: string;
  isCorrect: boolean;
  explanation: string;
  seasonEpisode?: string;
  image?: string;
  pointsEarned: number;
}

export type FanLevel =
  | 'CASUAL VIEWER'
  | 'FAN'
  | 'BIG FAN'
  | 'SUPERFAN 🦞'
  | 'ULTIMATE FRIENDS FAN';
