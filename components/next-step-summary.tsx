"use client";

import { useRef, useState } from "react";

export function NextStepSummary({ summary }: { summary: string }) {
  const [status, setStatus] = useState("");
  const [copying, setCopying] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  async function copy() {
    setCopying(true);
    setStatus("Copying your next steps…");
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(summary);
      setStatus("Next steps copied. Source-review notes are included.");
    } catch {
      setStatus(
        "Automatic copying is unavailable. Select the summary below and copy it manually.",
      );
      textRef.current?.focus();
      textRef.current?.select();
    } finally {
      setCopying(false);
    }
  }
  return (
    <section className="panel mt-8" aria-labelledby="summary-title">
      <div className="eyebrow">Take a small step with you</div>
      <h2 id="summary-title">Your next-step summary</h2>
      <p className="muted">
        Copy the curated activity and next step, including references and
        limitations. Your submitted coursework is never included. Nothing is
        saved to an account.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          className="button"
          type="button"
          disabled={copying}
          onClick={copy}
        >
          {copying ? "Copying…" : "Copy next steps"}
        </button>
        <button
          className="text-button"
          type="button"
          onClick={() => {
            textRef.current?.focus();
            textRef.current?.select();
            setStatus("Summary selected. Use your device’s copy command.");
          }}
        >
          Select summary
        </button>
      </div>
      <p role="status" className="text-sm mt-3" aria-live="polite">
        {status}
      </p>
      <label className="field-label" htmlFor="next-step-summary">
        Curated next steps (read-only)
      </label>
      <textarea
        ref={textRef}
        id="next-step-summary"
        value={summary}
        readOnly
        rows={8}
        spellCheck={false}
        aria-describedby="summary-note"
      />
      <p className="text-sm muted" id="summary-note">
        Copying writes only this curated summary to your device’s clipboard when
        you choose to copy. Check the source-review notes before relying on it.
      </p>
    </section>
  );
}
