import type { ApartmentMemoryQuestion } from '../../state/types';

export const apartmentMemoryQuestions: ApartmentMemoryQuestion[] = [
  {
    id: 'apt_001',
    category: 'APARTMENT_MEMORY',
    title: 'Apartment Memory',
    difficulty: 'medium',
    prompt: 'What was here?',
    fullSceneImage: '/images/apartments/living-room.jpg',
    missingSceneImage: '/images/apartments/living-room.jpg',
    missingObjectLabel: 'Pat the White Dog',
    options: [
      { id: 'foosball', label: 'Foosball Table', icon: 'sports_soccer' },
      { id: 'dog', label: 'White Dog', icon: 'pets', isCorrect: true },
      { id: 'pizza', label: 'Pizza Box', icon: 'local_pizza' }
    ],
    correctObjectId: 'dog',
    seasonEpisode: 'Season 2, Episode 19',
    explanation: 'Joey bought "Pat the Dog" when he briefly moved into his own luxury apartment, which later stood proudly in Joey & Chandler’s apartment.',
    points: 100,
    allowLockItIn: false
  },
  {
    id: 'apt_002',
    category: 'APARTMENT_MEMORY',
    title: 'Apartment Memory',
    difficulty: 'easy',
    prompt: 'What was hanging on the back of the door?',
    fullSceneImage: '/images/apartments/living-room.jpg',
    missingSceneImage: '/images/apartments/living-room.jpg',
    missingObjectLabel: 'Magna Doodle',
    options: [
      { id: 'magna', label: 'Magna Doodle', icon: 'draw', isCorrect: true },
      { id: 'dartboard', label: 'Dart Board', icon: 'adjust' },
      { id: 'guitar', label: 'Guitar Hook', icon: 'music_note' }
    ],
    correctObjectId: 'magna',
    seasonEpisode: 'Recurring (Seasons 3-10)',
    explanation: 'Joey and Chandler always kept a Magna Doodle drawing board on the back of their apartment front door with funny inside notes.',
    points: 100,
    allowLockItIn: false
  }
];
