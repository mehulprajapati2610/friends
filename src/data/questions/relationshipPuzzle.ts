import { RelationshipPuzzleQuestion } from '../../state/types';

export const relationshipPuzzleQuestions: RelationshipPuzzleQuestion[] = [
  {
    id: 'rp_001',
    category: 'RELATIONSHIP_PUZZLE',
    title: 'Relationship Puzzle',
    difficulty: 'easy',
    prompt: 'Match the iconic couples! Tap or drag between each character and their soulmate.',
    leftSide: [
      { id: 'ross', name: 'Ross' },
      { id: 'monica', name: 'Monica' },
      { id: 'phoebe', name: 'Phoebe' }
    ],
    rightSide: [
      { id: 'chandler', name: 'Chandler' },
      { id: 'mike', name: 'Mike' },
      { id: 'rachel', name: 'Rachel' }
    ],
    correctPairs: {
      ross: 'rachel',
      monica: 'chandler',
      phoebe: 'mike'
    },
    seasonEpisode: 'Across all seasons',
    explanation: 'Ross & Rachel ("She\'s his lobster!"), Monica & Chandler ("You make me happier than I ever thought I could be"), and Phoebe & Mike ("Crap Bag & Princess Consuela").',
    points: 100,
    allowLockItIn: false
  },
  {
    id: 'rp_002',
    category: 'RELATIONSHIP_PUZZLE',
    title: 'Relationship Puzzle',
    difficulty: 'hard',
    prompt: 'Match these memorable exes with who they dated!',
    leftSide: [
      { id: 'monica', name: 'Monica' },
      { id: 'chandler', name: 'Chandler' },
      { id: 'phoebe', name: 'Phoebe' }
    ],
    rightSide: [
      { id: 'richard', name: 'Dr. Richard' },
      { id: 'janice', name: 'Janice' },
      { id: 'david', name: 'David (Minsk)' }
    ],
    correctPairs: {
      monica: 'richard',
      chandler: 'janice',
      phoebe: 'david'
    },
    seasonEpisode: 'Seasons 1-9',
    explanation: 'Monica dated ophthalmologist Richard Burke, Chandler had on-again off-again romance with Janice, and Phoebe fell in love with David the Scientist guy.',
    points: 100,
    allowLockItIn: false
  }
];
