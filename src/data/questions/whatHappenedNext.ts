import type { WhatHappenedNextQuestion } from '../../state/types';

export const whatHappenedNextQuestions: WhatHappenedNextQuestion[] = [
  {
    id: 'whn_001',
    category: 'WHAT_HAPPENED_NEXT',
    title: 'What Happened Next?',
    difficulty: 'hard',
    situation: 'Ross, Rachel, and Chandler are carrying a heavy new couch up the narrow stairs...',
    sceneImage: '/images/scenes/pivot-couch.jpg',
    options: [
      { id: 'opt1', text: 'Ross shouts "PIVOT! PIVOT!" repeatedly', isCorrect: true },
      { id: 'opt2', text: 'The couch slides down and crushes the mailboxes', isCorrect: false },
      { id: 'opt3', text: 'Chandler gives up and leaves to drink coffee', isCorrect: false }
    ],
    reactionText: 'PIVOT! 🛋️',
    seasonEpisode: 'Season 5, Episode 16',
    explanation: 'Ross continuously yelled "PIVOT! PIVOT! PIV-OT!" until Chandler famously shouted "SHUT UP! SHUT UP! SHUT UUUUP!"',
    points: 100,
    allowLockItIn: true
  },
  {
    id: 'whn_002',
    category: 'WHAT_HAPPENED_NEXT',
    title: 'What Happened Next?',
    difficulty: 'medium',
    situation: 'Ross visits a spray tan salon and tries to count to 5 Mississippi before turning around...',
    sceneImage: '/images/scenes/spray-tan.jpg',
    options: [
      { id: 'opt1', text: 'He gets sprayed on the front twice!', isCorrect: true },
      { id: 'opt2', text: 'The machine breaks and turns him neon purple', isCorrect: false },
      { id: 'opt3', text: 'He slips on the lotion and sprains his ankle', isCorrect: false }
    ],
    reactionText: 'MISSISSIPPI-LESSLY?! ☀️',
    seasonEpisode: 'Season 10, Episode 3',
    explanation: 'Ross counted "Mississippi-ly" instead of regular seconds, resulting in getting sprayed in the face twice: "I\'m an EIGHT!"',
    points: 100,
    allowLockItIn: true
  }
];
