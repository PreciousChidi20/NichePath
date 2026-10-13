import rawContent from "../data/health-systems.json";
import { validateContent } from "../lib/content-model";
const content = validateContent(rawContent);
console.log(
  `Content valid: ${content.topics.length} subjects, ${content.niches.length} niches, ${content.concepts.length} concepts, ${content.sources.length} sources.`,
);
const unverified = content.sources.filter(
  (source) => source.verification === "review-required",
);
if (unverified.length)
  console.warn(
    `Editorial review pending: ${unverified.map((source) => source.id).join(", ")}. Schema validation does not verify source claims.`,
  );
