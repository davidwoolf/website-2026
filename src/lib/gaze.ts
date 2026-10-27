export const directions = ['top', 'right', 'bottom', 'left'] as const;
export type Direction = (typeof directions)[number];

export const columns = 4;

/** Every other item in the same row and column as `index`, in a grid `columns` wide. */
export function neighbors<T>(items: T[], index: number): T[] {
  return items.filter(
    (item, i) =>
      i !== index &&
      item !== undefined &&
      (Math.floor(i / columns) === Math.floor(index / columns) || i % columns === index % columns),
  );
}

/**
 * A random direction, weighted away from the ones the neighbors are already looking. The
 * penalty grows with the square of the matches: one neighbor looking a way makes it 5x less
 * likely, two make it 625x, so a row or column almost never ends up 3 of 4 the same.
 * `exclude` rules one out entirely, e.g. the direction an eye is looking now.
 */
export function pickDirection(around: (Direction | undefined)[], exclude?: Direction): Direction {
  const weights = directions.map((direction) => {
    const matches = around.filter((d) => d === direction).length;
    return direction === exclude ? 0 : 0.2 ** (matches * matches);
  });

  let roll = Math.random() * weights.reduce((sum, weight) => sum + weight, 0);
  for (const [i, weight] of weights.entries()) {
    roll -= weight;
    if (roll < 0) return directions[i];
  }
  return directions.findLast((direction) => direction !== exclude)!;
}
