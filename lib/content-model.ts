import { z } from "zod";

const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const text = z.string().trim().min(1);
const texts = z.array(text).min(1);

export const contentSchema = z
  .object({
    label: text,
    disclaimer: text,
    sources: z
      .array(
        z
          .object({
            id,
            title: text,
            publisher: text,
            url: z
              .url()
              .refine(
                (value) => value.startsWith("https://"),
                "Sources must use HTTPS",
              ),
            supports: text,
            verification: z.enum(["review-required", "verified"]),
            reviewedOn: z.iso.date().nullable(),
            reviewNote: text,
          })
          .strict(),
      )
      .min(1),
    topics: z
      .array(
        z
          .object({
            id,
            title: text,
            summary: text,
            aliases: texts,
            status: z.enum(["starter", "planned"]),
            nicheIds: z.array(id),
          })
          .strict(),
      )
      .min(1),
    concepts: z
      .array(
        z
          .object({
            id,
            topicId: id,
            title: text,
            aliases: texts,
            interestPrompt: text,
            connections: z
              .array(
                z
                  .object({
                    nicheId: id,
                    explanation: text,
                    sourceIds: z.array(id).min(1),
                  })
                  .strict(),
              )
              .min(1),
          })
          .strict(),
      )
      .min(1),
    niches: z
      .array(
        z
          .object({
            id,
            topicId: id,
            title: text,
            description: text,
            practicalApplications: texts,
            skills: texts,
            activity: z
              .object({
                title: text,
                objective: text,
                estimatedMinutes: z.number().int().positive(),
                instructions: texts,
                expectedOutput: text,
              })
              .strict(),
            nextStep: text,
            illustrativePathways: texts,
            sourceIds: z.array(id).min(1),
          })
          .strict(),
      )
      .min(1),
  })
  .strict();

export type Content = z.infer<typeof contentSchema>;
export type Topic = Content["topics"][number];
export type Niche = Content["niches"][number];
export type Concept = Content["concepts"][number];
export type Source = Content["sources"][number];

/** Validate both shape and relationships; fail the build on inconsistent content. */
export function validateContent(input: unknown): Content {
  const content = contentSchema.parse(input);
  const problems: string[] = [];
  for (const key of ["topics", "niches", "concepts", "sources"] as const) {
    const ids = content[key].map((item) => item.id);
    if (new Set(ids).size !== ids.length) problems.push(`Duplicate ${key} IDs`);
  }
  const topics = new Map(content.topics.map((topic) => [topic.id, topic]));
  const niches = new Map(content.niches.map((niche) => [niche.id, niche]));
  const sources = new Set(content.sources.map((source) => source.id));
  const checkSources = (ids: string[], owner: string) => {
    for (const sourceId of ids)
      if (!sources.has(sourceId))
        problems.push(`${owner}: unknown source ${sourceId}`);
  };
  for (const source of content.sources) {
    if (source.verification === "verified" && !source.reviewedOn)
      problems.push(`${source.id}: verified source needs a review date`);
    if (source.verification === "review-required" && source.reviewedOn)
      problems.push(
        `${source.id}: unverified source cannot have a review date`,
      );
  }
  for (const topic of content.topics) {
    if (topic.status === "starter" && !topic.nicheIds.length)
      problems.push(`${topic.id}: starter topic needs niches`);
    if (topic.status === "planned" && topic.nicheIds.length)
      problems.push(`${topic.id}: planned topic cannot expose niches`);
    if (new Set(topic.nicheIds).size !== topic.nicheIds.length)
      problems.push(`${topic.id}: duplicate niche references`);
    for (const nicheId of topic.nicheIds) {
      if (niches.get(nicheId)?.topicId !== topic.id)
        problems.push(`${topic.id}: invalid niche ${nicheId}`);
    }
    if (
      topic.status === "starter" &&
      !content.concepts.some((concept) => concept.topicId === topic.id)
    )
      problems.push(`${topic.id}: starter topic needs concepts`);
  }
  for (const niche of content.niches) {
    if (!topics.get(niche.topicId)?.nicheIds.includes(niche.id))
      problems.push(`${niche.id}: missing owning topic reference`);
    checkSources(niche.sourceIds, niche.id);
    if (
      !content.concepts.some((concept) =>
        concept.connections.some(
          (connection) => connection.nicheId === niche.id,
        ),
      )
    )
      problems.push(`${niche.id}: needs an interest connection`);
  }
  for (const concept of content.concepts) {
    if (topics.get(concept.topicId)?.status !== "starter")
      problems.push(`${concept.id}: invalid topic`);
    for (const connection of concept.connections) {
      if (niches.get(connection.nicheId)?.topicId !== concept.topicId)
        problems.push(
          `${concept.id}: invalid connection ${connection.nicheId}`,
        );
      checkSources(connection.sourceIds, concept.id);
    }
  }
  if (problems.length) throw new Error(problems.join("\n"));
  return content;
}
