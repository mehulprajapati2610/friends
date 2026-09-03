import type { CentralPerkMemoryQuestion } from '../../state/types';

export const centralPerkMemoryQuestions: CentralPerkMemoryQuestion[] = [
  {
    id: 'cpm_001',
    category: 'CENTRAL_PERK_MEMORY',
    title: 'Central Perk Memory',
    difficulty: 'medium',
    prompt: 'Who was standing behind the Central Perk coffee counter serving drinks?',
    observationImage: '/images/central-perk/central-perk-couch.jpg',
    questionMarkerPosition: { top: '38%', left: '50%' },
    options: [
      { id: 'gunther', name: 'Gunther' },
      { id: 'phoebe', name: 'Phoebe' },
      { id: 'rachel', name: 'Rachel' }
    ],
    correctOptionId: 'gunther',
    seasonEpisode: 'Recurring (All Seasons)',
    explanation: 'Gunther, with "hair brighter than the sun", was the permanent manager of Central Perk and harbored an undying secret crush on Rachel.',
    points: 100,
    allowLockItIn: false
  },
  {
    id: 'cpm_002',
    category: 'CENTRAL_PERK_MEMORY',
    title: 'Central Perk Memory',
    difficulty: 'easy',
    prompt: 'Who was performing with their acoustic guitar in the corner of Central Perk?',
    observationImage: '/images/central-perk/central-perk-couch.jpg',
    questionMarkerPosition: { top: '50%', left: '20%' },
    options: [
      { id: 'phoebe', name: 'Phoebe' },
      { id: 'monica', name: 'Monica' },
      { id: 'chandler', name: 'Chandler' }
    ],
    correctOptionId: 'phoebe',
    seasonEpisode: 'Recurring (Seasons 1-10)',
    explanation: 'Phoebe was the resident musical act at Central Perk singing classics like "Smelly Cat" and "Two of Them Kissed Last Night".',
    points: 100,
    allowLockItIn: false
  }
];
