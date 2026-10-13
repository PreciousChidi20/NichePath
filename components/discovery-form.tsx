"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/content-model";
import {
  matchTopics,
  MAX_INPUT_LENGTH,
  type MatchResult,
} from "@/lib/matching";
import { TopicShortcuts } from "@/components/topic-shortcuts";

export function DiscoveryForm({ data }: { data: Content }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);
  const invalid = result?.kind === "empty" || result?.kind === "too-long";
  return (
    <section className="panel" aria-labelledby="discovery-title">
      <div className="eyebrow">Start with your curiosity</div>
      <h2 id="discovery-title">What caught your attention?</h2>
      <p className="muted">
        Enter an academic topic or question, or paste a short coursework excerpt
        you have permission to use.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(matchTopics(input, data));
        }}
      >
        <label htmlFor="coursework" className="field-label">
          Topic, question or permitted coursework excerpt
        </label>
        <textarea
          id="coursework"
          value={input}
          maxLength={MAX_INPUT_LENGTH}
          rows={4}
          autoComplete="off"
          spellCheck={false}
          placeholder="For example: How does risk pooling work? Or: disease surveillance…"
          aria-invalid={invalid || undefined}
          aria-describedby={`input-privacy input-count matching-note${invalid ? " discovery-results" : ""}`}
          onChange={(event) => {
            setInput(event.target.value);
            setResult(null);
          }}
        />
        <div className="flex justify-between gap-4 text-sm">
          <p id="input-privacy">
            Do not paste personal, sensitive, confidential or unauthorized
            material. Use only coursework you have permission to share. Text
            stays in browser memory and clears when you leave this page or
            reload.
          </p>
          <span id="input-count" className="shrink-0">
            {input.length}/{MAX_INPUT_LENGTH}
          </span>
        </div>
        {input.length === MAX_INPUT_LENGTH && (
          <p className="limit-notice" role="status">
            Character limit reached. Shorten your text to add more.
          </p>
        )}
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
          storage, or transmission of your text. A match is a starting point,
          not an interpretation of your coursework.
        </p>
      </form>
      {result && (
        <div
          id="discovery-results"
          ref={resultRef}
          tabIndex={-1}
          role="region"
          aria-label="Topic matching results"
          aria-live="polite"
          aria-atomic="true"
          className="feedback mt-5"
        >
          {result.kind === "empty" && (
            <>
              <h3>Start with a topic or question</h3>
              <p>
                Enter some text, or choose one of the supported subjects below.
              </p>
              <TopicShortcuts topics={data.topics} compact />
            </>
          )}
          {result.kind === "too-long" && (
            <>
              <h3>Your text is too long</h3>
              <p>Use {MAX_INPUT_LENGTH} characters or fewer.</p>
            </>
          )}
          {result.kind === "unsupported" && (
            <>
              <h3>No curated match yet</h3>
              <p>
                We did not find a supported topic using our curated keywords.
                This does not mean your interest is invalid. Try a subject name,
                or choose a supported subject:
              </p>
              <TopicShortcuts topics={data.topics} compact />
            </>
          )}
          {result.kind === "matched" && (
            <>
              <h3>
                {result.matches.length > 1
                  ? "More than one subject matched"
                  : "A possible connection"}
              </h3>
              <p>
                Confirm the subject that fits your intended question. Nothing is
                selected automatically.
              </p>
              <ul className="mt-4 space-y-4">
                {result.matches.map((match) => {
                  const topic = data.topics.find(
                    (item) => item.id === match.topicId,
                  )!;
                  return (
                    <li key={topic.id} className="match-candidate">
                      <Link
                        className="button"
                        href={`/topics/${topic.id}${match.conceptIds.length === 1 ? `?concept=${match.conceptIds[0]}` : ""}`}
                      >
                        Explore {topic.title} →
                      </Link>
                      <p className="mt-2 text-sm muted">
                        {topic.status === "starter"
                          ? "Starter niche guidance available."
                          : "Topic overview available; detailed niche guidance is pending."}
                      </p>
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
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      )}
    </section>
  );
}
