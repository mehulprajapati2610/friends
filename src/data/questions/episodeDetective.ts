import type { EpisodeDetectiveQuestion } from '../../state/types';

export const episodeDetectiveQuestions: EpisodeDetectiveQuestion[] = [
  {
    id: 'ed_001',
    category: 'EPISODE_DETECTIVE',
    title: 'Episode Detective',
    difficulty: 'medium',
    clues: [
      'A Giant Poking Device constructed from chopsticks.',
      'Ugly Naked Guy is not moving across the street.',
      'Phoebe visits the dentist and fears someone will die.'
    ],
    options: [
      { id: 'opt1', label: 'The One with the Giant Poking Device', isCorrect: true },
      { id: 'opt2', label: 'The One Where Ross is Fine', isCorrect: false },
      { id: 'opt3', label: 'The One with the Embryos', isCorrect: false }
    ],
    seasonEpisode: 'Season 3, Episode 8',
    explanation: 'The gang ties long chopsticks together to poke Ugly Naked Guy across the alley to make sure he is alive.',
    points: 100,
    allowLockItIn: true
  },
  {
    id: 'ed_002',
    category: 'EPISODE_DETECTIVE',
    title: 'Episode Detective',
    difficulty: 'hard',
    clues: [
      'Paste formed from baby powder and lotion.',
      'Ross goes on a date wearing tight black leather.',
      'Trapped in a bathroom, unable to pull pants back up.'
    ],
    options: [
      { id: 'opt1', label: 'The One with Ross’s Tan', isCorrect: false },
      { id: 'opt2', label: 'The One with All the Resolutions', isCorrect: true },
      { id: 'opt3', label: 'The One with the Routine', isCorrect: false }
    ],
    seasonEpisode: 'Season 5, Episode 11',
    explanation: 'Ross’s New Year resolution was to try new things each day, which led to infamous leather pants and a disastrous paste concoction.',
    points: 100,
    allowLockItIn: true
  },
  {
    id: 'ed_003',
    category: 'EPISODE_DETECTIVE',
    title: 'Episode Detective',
    difficulty: 'easy',
    clues: [
      'A state of total awareness.',
      'Ross jumps out of curtains screaming "DANGER!".',
      'Rachel and Phoebe take self-defense classes.'
    ],
    options: [
      { id: 'opt1', label: 'The One with the Inappropriate Sister', isCorrect: false },
      { id: 'opt2', label: 'The One with Unagi', isCorrect: true },
      { id: 'opt3', label: 'The One with Ross’s Sandwich', isCorrect: false }
    ],
    seasonEpisode: 'Season 6, Episode 17',
    explanation: 'Ross claims "Unagi" is a martial arts concept of total awareness, which Phoebe clarifies is actually fresh water eel.',
    points: 100,
    allowLockItIn: false
  },
  {
    id: 'ed_004',
    category: 'EPISODE_DETECTIVE',
    title: 'Episode Detective',
    difficulty: 'hard',
    clues: [
      'Chandler’s middle name is finally exposed.',
      'Ross and Chandler dig up embarrassing secrets from college.',
      'Joey dates an aggressive woman who punches him affectionately.'
    ],
    options: [
      { id: 'opt1', label: 'The One with All the Cheesecakes', isCorrect: false },
      { id: 'opt2', label: 'The One with the Girl Who Hits Joey', isCorrect: true },
      { id: 'opt3', label: 'The One with the Football', isCorrect: false }
    ],
    seasonEpisode: 'Season 5, Episode 15',
    explanation: 'Chandler’s middle name is revealed to be Muriel, and Joey wears heavy layers because his petite girlfriend punches him constantly.',
    points: 100,
    allowLockItIn: true
  }
];
