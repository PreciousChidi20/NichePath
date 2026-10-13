import type { Content } from "./content-model";

export const MAX_INPUT_LENGTH = 2000;
export type Match = { topicId: string; conceptIds: string[] };
export type MatchResult =
  | { kind: "empty" | "too-long" | "unsupported"; matches: [] }
  | { kind: "matched"; matches: Match[] };
const normalize = (value: string) =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
const contains = (input: string, alias: string) =>
  ` ${input} `.includes(` ${normalize(alias)} `);

/** Curated phrase matching only. Does not infer meaning, rank careers, or call a service. */
export function matchTopics(input: string, data: Content): MatchResult {
  if (!input.trim()) return { kind: "empty", matches: [] };
  if (input.length > MAX_INPUT_LENGTH) return { kind: "too-long", matches: [] };
  const normalized = normalize(input);
  const matches = data.topics.flatMap((topic) => {
    const conceptIds = data.concepts
      .filter(
        (concept) =>
          concept.topicId === topic.id &&
          concept.aliases.some((alias) => contains(normalized, alias)),
      )
      .map((concept) => concept.id);
    return topic.aliases.some((alias) => contains(normalized, alias)) ||
      conceptIds.length
      ? [{ topicId: topic.id, conceptIds }]
      : [];
  });
  return matches.length
    ? { kind: "matched", matches }
    : { kind: "unsupported", matches: [] };
}
