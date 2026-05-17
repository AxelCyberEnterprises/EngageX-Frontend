/**
 * Question Cycling Utility
 *
 * Ensures users cycle through all available questions across sessions
 * before any question repeats. Cycles are tracked per enterprise and
 * per vertical (e.g. "coaching", "coach_nfl") using localStorage.
 *
 * How it works:
 *   1. On session start, fetch all active questions for the vertical.
 *   2. Load the list of already-asked question IDs from localStorage.
 *   3. Prioritise un-asked questions. If fewer than `batchSize` remain
 *      un-asked, top up from a freshly-shuffled pool of ALL questions
 *      (reset the cycle) so the session is never short.
 *   4. After the session loads, mark those `batchSize` IDs as "asked"
 *      in localStorage.
 *   5. When all questions have been asked, clear the list and start over.
 */

const STORAGE_PREFIX = "engagex_asked_q";

function storageKey(enterpriseId: number, vertical: string): string {
    return `${STORAGE_PREFIX}_${enterpriseId}_${vertical}`;
}

function getAskedIds(enterpriseId: number, vertical: string): number[] {
    try {
        const raw = localStorage.getItem(storageKey(enterpriseId, vertical));
        if (!raw) return [];
        return JSON.parse(raw) as number[];
    } catch {
        return [];
    }
}

function saveAskedIds(enterpriseId: number, vertical: string, ids: number[]): void {
    try {
        localStorage.setItem(storageKey(enterpriseId, vertical), JSON.stringify(ids));
    } catch {
        // localStorage quota exceeded or unavailable – silently continue
    }
}

/** Fisher-Yates shuffle (mutates array in place, returns it). */
function shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Pick the next batch of `batchSize` questions for this session,
 * prioritising questions that haven't been asked yet.
 *
 * @param allQuestions   Full list fetched from the API (any[] with an `id` field).
 * @param enterpriseId   Enterprise ID – used as part of the storage key.
 * @param vertical       Vertical string (e.g. "coaching", "coach_nfl").
 * @param batchSize      Number of questions to ask per session (default 8).
 * @returns              Ordered array of questions for this session.
 */
export function pickSessionQuestions<T extends { id: number }>(
    allQuestions: T[],
    enterpriseId: number,
    vertical: string,
    batchSize = 8,
    sessionId?: string,
): T[] {
    if (!allQuestions.length) return [];

    // Check if we have cached questions for this unique session to prevent
    // premature cycling due to component remounts / refreshes / double effects.
    if (sessionId) {
        const sessionCacheKey = `engagex_session_q_${sessionId}`;
        const cachedRaw = localStorage.getItem(sessionCacheKey);
        if (cachedRaw) {
            try {
                const cachedIds = JSON.parse(cachedRaw) as number[];
                if (Array.isArray(cachedIds) && cachedIds.length > 0) {
                    // Find the questions matching cachedIds in the exact cached order
                    const mapped = cachedIds
                        .map((qId) => allQuestions.find((q) => q.id === qId))
                        .filter((q): q is T => !!q);
                    if (mapped.length > 0) {
                        return mapped;
                    }
                }
            } catch (e) {
                console.error("Failed to parse cached session questions:", e);
            }
        }
    }

    const askedIds = new Set(getAskedIds(enterpriseId, vertical));

    // Split into un-asked and already-asked pools
    const unanswered = shuffle(allQuestions.filter((q) => !askedIds.has(q.id)));
    const answered   = shuffle(allQuestions.filter((q) =>  askedIds.has(q.id)));

    // Build this session's batch
    let batch: T[];
    if (unanswered.length >= batchSize) {
        // Plenty of fresh questions – take from the front
        batch = unanswered.slice(0, batchSize);
    } else {
        // Not enough fresh ones – use all remaining unanswered, then top up
        // from the answered pool (cycle resets for those topped-up questions)
        batch = [...unanswered, ...answered.slice(0, batchSize - unanswered.length)];
    }

    // Persist the selected questions for this specific session
    if (sessionId) {
        const sessionCacheKey = `engagex_session_q_${sessionId}`;
        try {
            localStorage.setItem(sessionCacheKey, JSON.stringify(batch.map((q) => q.id)));
        } catch {
            // localStorage quota exceeded or unavailable – silently continue
        }
    }

    // Persist the updated set of asked IDs
    const newAskedIds = Array.from(askedIds);
    for (const q of batch) {
        if (!askedIds.has(q.id)) {
            newAskedIds.push(q.id);
        }
    }

    // If all questions have now been asked, reset the cycle
    if (newAskedIds.length >= allQuestions.length) {
        saveAskedIds(enterpriseId, vertical, []);
    } else {
        saveAskedIds(enterpriseId, vertical, newAskedIds);
    }

    return batch;
}
