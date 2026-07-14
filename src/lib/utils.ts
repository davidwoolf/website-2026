// Minimal stub of frame's $lib/utils — only what the imported components use.
export type EntityType = "project" | "recipe" | "resource" | "team" | "user";

export function transposeNumbers(first: number, second: number) {
  return first <= second ? [first, second] : [second, first];
}

export function arraysAreEqual(a: unknown[], b: unknown[]) {
  if (a.length !== b.length) return false;
  return a.every((value) => b.includes(value));
}

export function getInitials(fullName: string) {
  if (fullName === "") return "";

  const split = fullName
    .trim()
    .split(" ")
    .filter((str) => str !== "");

  if (split.length === 1) {
    return fullName.substring(0, 2);
  } else {
    return `${split[0].substring(0, 1)}${split[1].substring(0, 1)}`;
  }
}
