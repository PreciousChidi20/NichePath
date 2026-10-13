import type { Content, Niche } from "./content-model";

/** Resolve curated relationships only; there is no inferred or ranked recommendation. */
export function getNicheExploration(data: Content, niche: Niche) {
  const concepts = data.concepts.flatMap((concept) =>
    concept.connections
      .filter((connection) => connection.nicheId === niche.id)
      .map((connection) => ({ concept, ...connection })),
  );
  const related = niche.relatedNiches.flatMap((relation) => {
    const target = data.niches.find((item) => item.id === relation.nicheId);
    return target ? [{ niche: target, ...relation }] : [];
  });
  return { concepts, related };
}
