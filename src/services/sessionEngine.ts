import { Difficulty, Question } from '../state/types';
import { ALL_CATEGORIES, QUESTION_BANK } from '../data/questions';

const RECENT_KEY = 'friends_test_recent_questions';
const MAX_RECENT_TRACKED = 20;

export interface SessionConfig {
  questions: Question[];
  lockItInIndices: number[];
}

export function getRecentQuestionIds(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveRecentQuestionIds(newIds: string[]): void {
  try {
    const existing = getRecentQuestionIds();
    const updated = [...new Set([...newIds, ...existing])].slice(0, MAX_RECENT_TRACKED);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  } catch {}
}

export function createGameSession(): SessionConfig {
  const recentIds = new Set(getRecentQuestionIds());
  const selectedQuestions: Question[] = [];

  // Target difficulty quotas across the 10 questions:
  // ~3-4 easy, ~3-4 medium, ~2-3 hard
  const diffCounts: Record<Difficulty, number> = {
    easy: 0,
    medium: 0,
    hard: 0,
  };

  const diffTargets: Record<Difficulty, number> = {
    easy: 3,
    medium: 4,
    hard: 3,
  };

  // 1. Select 1 question from each of the 10 categories
  for (const category of ALL_CATEGORIES) {
    const pool = QUESTION_BANK[category] || [];
    if (pool.length === 0) continue;

    // Filter out recent questions if unplayed ones are available
    const unplayed = pool.filter((q) => !recentIds.has(q.id));
    const candidates = unplayed.length > 0 ? unplayed : pool;

    // Prioritize candidate matching the most needed difficulty
    const neededOrder: Difficulty[] = (['easy', 'medium', 'hard'] as Difficulty[]).sort(
      (a, b) => (diffTargets[b] - diffCounts[b]) - (diffTargets[a] - diffCounts[a])
    );

    let picked: Question | undefined;

    // Try candidates in order of highest deficit
    for (const neededDiff of neededOrder) {
      const matching = candidates.filter((q) => q.difficulty === neededDiff);
      if (matching.length > 0) {
        picked = matching[Math.floor(Math.random() * matching.length)];
        break;
      }
    }

    // Graceful fallback if no candidate matches preferred difficulty
    if (!picked) {
      picked = candidates[Math.floor(Math.random() * candidates.length)];
    }

    diffCounts[picked.difficulty] = (diffCounts[picked.difficulty] || 0) + 1;
    selectedQuestions.push(picked);
  }

  // Separate Ultimate Challenge to serve as the final boss (Q10), and randomize Q1-Q9
  const standardQuestions = selectedQuestions.filter((q) => q.category !== 'ULTIMATE_FAN_CHALLENGE');
  const ultimateChallenge = selectedQuestions.find((q) => q.category === 'ULTIMATE_FAN_CHALLENGE');

  // Shuffle standard questions (Fisher-Yates)
  for (let i = standardQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [standardQuestions[i], standardQuestions[j]] = [standardQuestions[j], standardQuestions[i]];
  }

  const finalQuestions: Question[] = ultimateChallenge
    ? [...standardQuestions, ultimateChallenge]
    : standardQuestions;

  // 2. Select 2-3 questions for "LOCK IT IN? 🔒"
  // Suitable question categories for suspense
  const eligibleIndices: number[] = [];
  finalQuestions.forEach((q, idx) => {
    if (
      idx < finalQuestions.length - 1 && // not the ultimate challenge
      (q.category === 'WHO_SAID_IT' ||
        q.category === 'EPISODE_DETECTIVE' ||
        q.category === 'WHAT_HAPPENED_NEXT' ||
        q.category === 'SOUND_MEMORY' ||
        q.category === 'WHO_WOULD_DO_IT')
    ) {
      eligibleIndices.push(idx);
    }
  });

  // Pick 2 or 3 distinct random indices
  const numLocks = Math.min(Math.floor(Math.random() * 2) + 2, eligibleIndices.length); // 2 or 3
  const shuffledEligible = [...eligibleIndices].sort(() => Math.random() - 0.5);
  const lockItInIndices = shuffledEligible.slice(0, numLocks);

  // Save the selected question IDs to recent memory
  saveRecentQuestionIds(finalQuestions.map((q) => q.id));

  return {
    questions: finalQuestions,
    lockItInIndices,
  };
}
