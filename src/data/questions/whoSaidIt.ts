import type { WhoSaidItQuestion } from '../../state/types';
import { ALL_CHARACTERS } from '../characters';

export const whoSaidItQuestions: WhoSaidItQuestion[] = [
  {
    id: 'wsi_001',
    category: 'WHO_SAID_IT',
    title: 'Who Said It?',
    difficulty: 'easy',
    quote: "I'M NOT SO GOOD WITH THE ADVICE. CAN I INTEREST YOU IN A SARCASTIC COMMENT?",
    correctCharacterId: 'chandler',
    characters: ALL_CHARACTERS,
    seasonEpisode: 'Season 8, Episode 3',
    explanation: 'Chandler famously offers a sarcastic comment to Rachel when she is anxious about her pregnancy.',
    points: 100,
    allowLockItIn: true
  },
  {
    id: 'wsi_002',
    category: 'WHO_SAID_IT',
    title: 'Who Said It?',
    difficulty: 'easy',
    quote: "JOEY DOESN'T SHARE FOOD!",
    correctCharacterId: 'joey',
    characters: ALL_CHARACTERS,
    seasonEpisode: 'Season 10, Episode 9',
    explanation: 'Joey screams this when explaining to Phoebe why his date took fries off his plate.',
    points: 100,
    allowLockItIn: false
  },
  {
    id: 'wsi_003',
    category: 'WHO_SAID_IT',
    title: 'Who Said It?',
    difficulty: 'medium',
    quote: "I WISH I COULD, BUT I DON'T WANT TO.",
    correctCharacterId: 'phoebe',
    characters: ALL_CHARACTERS,
    seasonEpisode: 'Season 1, Episode 1',
    explanation: 'Phoebe gives this honest and iconic response when Joey asks for help putting Ross’s furniture together.',
    points: 100,
    allowLockItIn: true
  },
  {
    id: 'wsi_004',
    category: 'WHO_SAID_IT',
    title: 'Who Said It?',
    difficulty: 'hard',
    quote: "THEY DON'T KNOW THAT WE KNOW THEY KNOW WE KNOW!",
    correctCharacterId: 'phoebe',
    characters: ALL_CHARACTERS,
    seasonEpisode: 'Season 5, Episode 14',
    explanation: 'Phoebe delivers this tongue-twisting scheme when she and Rachel plot to mess with Chandler and Monica.',
    points: 100,
    allowLockItIn: true
  },
  {
    id: 'wsi_005',
    category: 'WHO_SAID_IT',
    title: 'Who Said It?',
    difficulty: 'hard',
    quote: "I'M HOPELESS AND AWKWARD AND DESPERATE FOR LOVE!",
    correctCharacterId: 'chandler',
    characters: ALL_CHARACTERS,
    seasonEpisode: 'Season 3, Episode 4',
    explanation: 'Chandler screams his dating insecurities to Janice during a heartfelt outburst.',
    points: 100,
    allowLockItIn: true
  }
];
