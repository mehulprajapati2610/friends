import type { CompleteSceneQuestion } from '../../state/types';

export const completeSceneQuestions: CompleteSceneQuestion[] = [
  {
    id: 'cs_001',
    category: 'COMPLETE_THE_SCENE',
    title: 'Complete the Scene',
    difficulty: 'easy',
    prompt: "The gang is at the fountain, but they're missing their umbrellas! Tap or drag the umbrellas to their silhouettes to complete the opening credits.",
    sceneImage: '/images/scenes/fountain-credits.jpg',
    dropzones: [
      { id: 'zone-red', label: 'Red Umbrella Slot', topPercent: 30, leftPercent: 18 },
      { id: 'zone-yellow', label: 'Yellow Umbrella Slot', topPercent: 25, leftPercent: 48 },
      { id: 'zone-blue', label: 'Blue Umbrella Slot', topPercent: 33, leftPercent: 78 }
    ],
    items: [
      { id: 'item-red', label: 'Red Umbrella', color: '#ff5252', targetId: 'zone-red' },
      { id: 'item-yellow', label: 'Yellow Umbrella', color: '#fec733', targetId: 'zone-yellow' },
      { id: 'item-blue', label: 'Blue Umbrella', color: '#006f6c', targetId: 'zone-blue' }
    ],
    feedbackBadge: 'CLAP CLAP CLAP CLAP 👏',
    seasonEpisode: 'Theme Song (All Seasons)',
    explanation: 'The iconic fountain opening sequence features the six friends opening brightly colored red, yellow, and blue umbrellas in the spray.',
    points: 100,
    allowLockItIn: false
  },
  {
    id: 'cs_002',
    category: 'COMPLETE_THE_SCENE',
    title: 'Complete the Scene',
    difficulty: 'medium',
    prompt: "Monica has a raw turkey on her head to cheer up Chandler! Complete her disguise by placing the accessories.",
    sceneImage: '/images/scenes/turkey-head.jpg',
    dropzones: [
      { id: 'zone-sunglasses', label: 'Eyes Slot', topPercent: 28, leftPercent: 50 },
      { id: 'zone-fez', label: 'Hat Slot', topPercent: 12, leftPercent: 50 }
    ],
    items: [
      { id: 'item-sunglasses', label: 'Giant Sunglasses', icon: 'visibility', targetId: 'zone-sunglasses' },
      { id: 'item-fez', label: 'Yellow Fez Hat', icon: 'school', targetId: 'zone-fez' }
    ],
    feedbackBadge: 'I LOVE YOU! ❤️',
    seasonEpisode: 'Season 5, Episode 8',
    explanation: 'Monica dances with a turkey on her head wearing giant yellow sunglasses and a fez hat, prompting Chandler to say "I love you" for the first time.',
    points: 100,
    allowLockItIn: false
  }
];
