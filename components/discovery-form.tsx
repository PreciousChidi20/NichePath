"use client";

import Link from "next/link";
import { useState } from "react";
import type { Content } from "@/lib/content-model";
import {
  matchTopics,
  MAX_INPUT_LENGTH,
  type MatchResult,
} from "@/lib/matching";

export function DiscoveryForm({ data }: { data: Content }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  return (
    <section className="panel" aria-labelledby="discovery-title">
      <div className="eyebrow">Start with your curiosity</div>
      <h2 id="discovery-title">What caught your attention?</h2>
      <p className="muted">
        Enter a topic, concept, or a short excerpt you have permission to use.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(matchTopics(input, data));
        }}
      >
        <label htmlFor="coursework" className="field-label">
          Topic or permitted coursework excerpt
        </label>
        <textarea
          id="coursework"
          value={input}
          maxLength={MAX_INPUT_LENGTH}
          rows={4}
          placeholder="For example: risk pooling, health workforce, or governance…"
          aria-describedby="input-privacy input-count matching-note"
          onChange={(event) => {
            setInput(event.target.value);
            setResult(null);
          }}
        />
        <div className="flex justify-between gap-4 text-sm">
          <p id="input-privacy">
            Keep personal and sensitive information out. Text stays in this
            browser tab and is cleared when you leave this page or reload.
          </p>
          <span id="input-count" className="shrink-0">
            {input.length}/{MAX_INPUT_LENGTH}
          </span>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button className="button" type="submit">
            Find connections <span aria-hidden="true">→</span>
          </button>
          <button
            className="text-button"
            type="button"
            onClick={() => {
              setInput("");
              setResult(null);
            }}
          >
            Clear text
          </button>
        </div>
        <p id="matching-note" className="mt-4 text-sm muted">
          Curated keyword matching, with your confirmation. No AI analysis,
          storage, or transmission of your text.
        </p>
      </form>
      <div aria-live="polite" aria-atomic="true" className="mt-5">
        {result?.kind === "empty" && (
          <p className="feedback">
            Enter a topic or choose Health Systems below.
          </p>
        )}
        {result?.kind === "too-long" && (
          <p className="feedback">
            Use {MAX_INPUT_LENGTH} characters or fewer.
          </p>
        )}
        {result?.kind === "unsupported" && (
          <div className="feedback">
            <h3>No curated match yet</h3>
            <p>
              This starter does not cover that input. Try “health systems”,
              “risk pooling” or “health workforce”, or choose Health Systems
              below.
            </p>
          </div>
        )}
        {result?.kind === "matched" && (
          <div className="feedback">
            <h3>
              {result.matches.length > 1
                ? "More than one subject matched"
                : "A possible connection"}
            </h3>
            <p>
              Keywords suggest the following. Choose the subject that fits your
              interest; this is not an interpretation of your coursework.
            </p>
            <ul className="mt-4 space-y-3">
              {result.matches.map((match) => {
                const topic = data.topics.find(
                  (item) => item.id === match.topicId,
                )!;
                return (
                  <li key={topic.id}>
                    {topic.status === "starter" ? (
                      <>
                        <Link
                          className="button"
                          href={`/topics/${topic.id}${match.conceptIds.length === 1 ? `?concept=${match.conceptIds[0]}` : ""}`}
                        >
                          Explore {topic.title} →
                        </Link>
                        {match.conceptIds.length > 0 && (
                          <p className="mt-2 text-sm">
                            Related concepts:{" "}
                            {data.concepts
                              .filter((concept) =>
                                match.conceptIds.includes(concept.id),
                              )
                              .map((concept) => concept.title)
                              .join(", ")}
                          </p>
                        )}
                      </>
                    ) : (
                      <p>
                        <strong>{topic.title}</strong> — recognised, but
                        guidance is planned for a later milestone.{" "}
                        <Link href="/topics/health-systems">
                          Explore Health Systems
                        </Link>
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
