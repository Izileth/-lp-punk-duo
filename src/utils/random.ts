/**
 * Deterministic pseudo-random generator based on a seed.
 * Useful for maintaining consistency across renders without using state for everything.
 */
export function seededRandom(seed: number): number {
    const x = (seed * 9301 + 49297) % 233280;
    return x / 233280;
}
