import rawContent from "@/data/health-systems.json";
import { validateContent } from "@/lib/content-model";

export const content = validateContent(rawContent);
export const getTopic = (id: string) =>
  content.topics.find((topic) => topic.id === id);
export const getNiche = (topicId: string, nicheId: string) =>
  content.niches.find(
    (niche) => niche.id === nicheId && niche.topicId === topicId,
  );
export const getSources = (ids: string[]) =>
  content.sources.filter((source) => ids.includes(source.id));
