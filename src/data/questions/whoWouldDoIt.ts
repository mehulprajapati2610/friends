import { WhoWouldDoItQuestion } from '../../state/types';
import { ALL_CHARACTERS } from '../characters';

export const whoWouldDoItQuestions: WhoWouldDoItQuestion[] = [
  {
    id: 'wwd_001',
    category: 'WHO_WOULD_DO_IT',
    title: 'Who Would Do It?',
    difficulty: 'hard',
    scenario: 'Who would most likely eat a cheesecake directly off the hallway floor with a fork?',
    correctCharacterIds: ['chandler', 'rachel', 'joey'],
    characters: ALL_CHARACTERS,
    seasonEpisode: 'Season 7, Episode 11',
    explanation: 'Chandler and Rachel dropped the irresistible bakery cheesecake on the floor and ate it, followed shortly by Joey pulling a fork out of his pocket!',
    points: 100,
    allowLockItIn: true
  },
  {
    id: 'wwd_002',
    category: 'WHO_WOULD_DO_IT',
    title: 'Who Would Do It?',
    difficulty: 'easy',
    scenario: 'Who would accidentally get married in Las Vegas with marker drawn all over their face?',
    correctCharacterIds: ['ross', 'rachel'],
    characters: ALL_CHARACTERS,
    seasonEpisode: 'Season 5, Episode 24',
    explanation: 'Ross and Rachel got wildly drunk in Vegas, drew on each other with permanent ink, and stumbled out of the chapel married.',
    points: 100,
    allowLockItIn: false
  },
  {
    id: 'wwd_003',
    category: 'WHO_WOULD_DO_IT',
    title: 'Who Would Do It?',
    difficulty: 'medium',
    scenario: 'Who would put on all of another person’s clothes at once with no underwear on?',
    correctCharacterIds: ['joey'],
    characters: ALL_CHARACTERS,
    seasonEpisode: 'Season 3, Episode 2',
    explanation: 'Joey lunged into the apartment: "Look at me! I\'m Chandler! Could I BE wearing any more clothes?"',
    points: 100,
    allowLockItIn: true
  }
];
