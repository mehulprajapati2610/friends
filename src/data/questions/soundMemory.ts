import type { SoundMemoryQuestion } from '../../state/types';

export const soundMemoryQuestions: SoundMemoryQuestion[] = [
  {
    id: 'sm_001',
    category: 'SOUND_MEMORY',
    title: 'Sound Memory',
    difficulty: 'easy',
    soundCueText: '"OH MY GOD!"',
    soundType: 'janice_omg',
    audio: '/audio/janice-oh-my-god.mp3',
    options: [
      { id: 'janice', name: 'Janice', isCorrect: true },
      { id: 'rachel', name: 'Rachel', isCorrect: false },
      { id: 'monica', name: 'Monica', isCorrect: false }
    ],
    seasonEpisode: 'Recurring (All Seasons)',
    explanation: 'Janice Litman-Goralnik’s unmistakable nasal voice and high-pitched laugh made "OH... MY... GOD!" one of television’s most iconic catchphrases.',
    points: 100,
    allowLockItIn: true
  },
  {
    id: 'sm_002',
    category: 'SOUND_MEMORY',
    title: 'Sound Memory',
    difficulty: 'easy',
    soundCueText: '"HOW YOU DOIN\'?"',
    soundType: 'joey_doin',
    audio: '/audio/joey-how-you-doin.mp3',
    options: [
      { id: 'joey', name: 'Joey', isCorrect: true },
      { id: 'ross', name: 'Ross', isCorrect: false },
      { id: 'chandler', name: 'Chandler', isCorrect: false }
    ],
    seasonEpisode: 'Season 4, Episode 13',
    explanation: 'Joey’s foolproof pickup line: "How you doin\'?" He even successfully tested it on Rachel and Phoebe!',
    points: 100,
    allowLockItIn: false
  },
  {
    id: 'sm_003',
    category: 'SOUND_MEMORY',
    title: 'Sound Memory',
    difficulty: 'medium',
    soundCueText: '"WE WERE ON A BREAK!"',
    soundType: 'ross_break',
    audio: '/audio/ross-we-were-on-a-break.mp3',
    options: [
      { id: 'ross', name: 'Ross', isCorrect: true },
      { id: 'rachel', name: 'Rachel', isCorrect: false },
      { id: 'chandler', name: 'Chandler', isCorrect: false }
    ],
    seasonEpisode: 'Season 3, Episode 15',
    explanation: 'Ross yelled this defense incessantly across seven seasons whenever his split with Rachel was brought up.',
    points: 100,
    allowLockItIn: true
  },
  {
    id: 'sm_004',
    category: 'SOUND_MEMORY',
    title: 'Sound Memory',
    difficulty: 'easy',
    soundCueText: '"I KNOW!"',
    soundType: 'monica_iknow',
    audio: '/audio/monica-i-know.mp3',
    options: [
      { id: 'monica', name: 'Monica', isCorrect: true },
      { id: 'rachel', name: 'Rachel', isCorrect: false },
      { id: 'phoebe', name: 'Phoebe', isCorrect: false }
    ],
    seasonEpisode: 'Recurring (All Seasons)',
    explanation: 'Monica Geller’s high-pitched exclamation "I KNOW!" was her trademark enthusiastic response whenever excited or surprised.',
    points: 100,
    allowLockItIn: true
  },
  {
    id: 'sm_005',
    category: 'SOUND_MEMORY',
    title: 'Sound Memory',
    difficulty: 'medium',
    soundCueText: '"SMELLY CAT, SMELLY CAT..."',
    soundType: 'phoebe_smellycat',
    audio: '/audio/phoebe-smelly-cat.mp3',
    options: [
      { id: 'phoebe', name: 'Phoebe', isCorrect: true },
      { id: 'monica', name: 'Monica', isCorrect: false },
      { id: 'janice', name: 'Janice', isCorrect: false }
    ],
    seasonEpisode: 'Recurring (Seasons 2-10)',
    explanation: 'Phoebe Buffay sang her beloved song "Smelly Cat" at Central Perk and even recorded a commercial jingle for it.',
    points: 100,
    allowLockItIn: false
  },
  {
    id: 'sm_006',
    category: 'SOUND_MEMORY',
    title: 'Sound Memory',
    difficulty: 'hard',
    soundCueText: '"PIVOT! PIVOT! PIV-OT!"',
    soundType: 'ross_pivot',
    audio: '/audio/ross-pivot.mp3',
    options: [
      { id: 'ross', name: 'Ross', isCorrect: true },
      { id: 'chandler', name: 'Chandler', isCorrect: false },
      { id: 'joey', name: 'Joey', isCorrect: false }
    ],
    seasonEpisode: 'Season 5, Episode 16',
    explanation: 'Ross continuously screamed "PIVOT!" at Chandler and Rachel while navigating the couch up the apartment stairway.',
    points: 100,
    allowLockItIn: true
  },
  {
    id: 'sm_007',
    category: 'SOUND_MEMORY',
    title: 'Sound Memory',
    difficulty: 'hard',
    soundCueText: '"COULD I BE WEARING ANY MORE CLOTHES?"',
    soundType: 'chandler_clothes',
    audio: '/audio/chandler-could-i-be.mp3',
    options: [
      { id: 'joey', name: 'Joey (doing Chandler)', isCorrect: true },
      { id: 'chandler', name: 'Chandler', isCorrect: false },
      { id: 'ross', name: 'Ross', isCorrect: false }
    ],
    seasonEpisode: 'Season 3, Episode 2',
    explanation: 'Joey retaliated against Chandler by wearing all of Chandler’s clothes at once and doing lunges while impersonating Chandler.',
    points: 100,
    allowLockItIn: true
  }
];
