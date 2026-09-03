import { CharacterChoice } from '../state/types';

export const FRIENDS_CHARACTERS: Record<string, CharacterChoice> = {
  rachel: {
    id: 'rachel',
    name: 'Rachel',
    avatar: '/images/characters/rachel.jpg',
    reactionPrompt: 'No uterus, no opinion!'
  },
  monica: {
    id: 'monica',
    name: 'Monica',
    avatar: '/images/characters/monica.jpg',
    reactionPrompt: 'I KNOW!'
  },
  phoebe: {
    id: 'phoebe',
    name: 'Phoebe',
    avatar: '/images/characters/phoebe.jpg',
    reactionPrompt: 'Smelly cat, what are they feeding you?'
  },
  joey: {
    id: 'joey',
    name: 'Joey',
    avatar: '/images/characters/joey.jpg',
    reactionPrompt: "Joey doesn't share food!"
  },
  chandler: {
    id: 'chandler',
    name: 'Chandler',
    avatar: '/images/characters/chandler.jpg',
    reactionPrompt: 'Could I BE any more sarcastic?'
  },
  ross: {
    id: 'ross',
    name: 'Ross',
    avatar: '/images/characters/ross.jpg',
    reactionPrompt: 'WE WERE ON A BREAK!'
  }
};

export const ALL_CHARACTERS = Object.values(FRIENDS_CHARACTERS);
