import type { UltimateChallengeQuestion } from '../../state/types';

export const ultimateChallengeQuestions: UltimateChallengeQuestion[] = [
  {
    id: 'uc_001',
    category: 'ULTIMATE_FAN_CHALLENGE',
    title: 'Ultimate Fan Challenge',
    difficulty: 'hard',
    instruction: 'Find 3 iconic items in the apartment before time runs out: The Geller Cup, Gladys, and Hugsy!',
    timeLimitSeconds: 15,
    sceneImage: '/images/apartments/chaotic-apartment.jpg',
    targets: [
      {
        id: 'target-geller-cup',
        label: 'The Geller Cup',
        topPercent: 78,
        leftPercent: 12,
        width: 64,
        height: 75,
        image: '/images/scenes/geller-cup.png',
        icon: 'emoji_events'
      },
      {
        id: 'target-gladys',
        label: 'Gladys Painting',
        topPercent: 15,
        leftPercent: 74,
        width: 70,
        height: 80,
        image: '/images/scenes/gladys.png',
        icon: 'palette'
      },
      {
        id: 'target-hugsy',
        label: "Joey's Hugsy",
        topPercent: 68,
        leftPercent: 62,
        width: 64,
        height: 64,
        image: '/images/scenes/hugsy.png',
        icon: 'cruelty_free'
      }
    ],
    seasonEpisode: 'Multiple Seasons',
    explanation: 'The Geller Cup (troll doll on a 2x4 piece of wood), Phoebe’s terrifying 3D artwork Gladys, and Hugsy (Joey’s bedtime penguin pal) are legendary Friends props.',
    points: 100,
    allowLockItIn: false
  }
];
