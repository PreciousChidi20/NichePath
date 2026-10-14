import type { Niche, Source, Topic } from "./content-model";

/** Only curated content enters a summary. No excerpt, query string or user input is accepted. */
export function buildNextStepSummary(
  topic: Topic,
  niche: Niche,
  sources: Source[],
): string {
  if (niche.topicId !== topic.id)
    throw new Error("Summary topic does not own niche");
  const references = niche.sourceIds.map((id) => {
    const source = sources.find((item) => item.id === id);
    if (!source) throw new Error(`Summary source missing: ${id}`);
    return source;
  });
  const reviewRequired = references.some(
    (source) => source.verification !== "verified",
  );
  return [
    `NichePath — ${topic.title}: ${niche.title}`,
    "",
    "Activity: " + niche.activity.title,
    "Objective: " + niche.activity.objective,
    `Time: about ${niche.activity.estimatedMinutes} minutes`,
    ...niche.activity.instructions.map(
      (step, index) => `${index + 1}. ${step}`,
    ),
    "Output: " + niche.activity.expectedOutput,
    "Reflection: " + niche.activity.reflection,
    "",
    "Next step: " + niche.nextStep,
    "Next-step output: " + niche.nextStepOutcome,
    "",
    "Illustrative pathways:",
    ...niche.illustrativePathways.map(
      (pathway) =>
        `- ${pathway.kind}: ${pathway.title}. ${pathway.explanation}`,
    ),
    "",
    "Educational exploration only. Original hypothetical practice activity, not an assessed task or validated professional tool. Pathways are illustrative, not entry requirements, eligibility advice or employment guarantees.",
    reviewRequired
      ? "SOURCE REVIEW REQUIRED: guidance and proposed references need editorial verification before authoritative use."
      : "Source review status is recorded below; it does not guarantee pathway eligibility.",
    "References (educational context, not programme or job endorsements):",
    ...references.map(
      (source) =>
        `- ${source.publisher}: ${source.title} — ${source.url} [${source.verification === "verified" ? `Reviewed ${source.reviewedOn}` : "Review required"}]`,
    ),
  ].join("\n");
}
