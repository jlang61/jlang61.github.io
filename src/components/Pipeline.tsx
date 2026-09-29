import type { CSSProperties } from "react";
import type { Pipeline as PipelineData } from "../content";

export function Pipeline({ caption, steps, footnote }: PipelineData) {
  return (
    <figure className="pipeline">
      <figcaption className="pipeline__caption">
        <span>{caption}</span>
        <span className="pipeline__legend">
          <span className="pipeline__swatch" aria-hidden="true" /> owned by me
        </span>
      </figcaption>
      <ol className="pipeline__steps" style={{ "--steps": steps.length } as CSSProperties}>
        {steps.map((step, i) => (
          <li
            key={step.label}
            className={`pipeline__step${step.owned ? " is-owned" : ""}`}
            style={{ "--i": i } as CSSProperties}
          >
            <span className="pipeline__label">{step.label}</span>
            <span className="pipeline__detail">{step.detail}</span>
            {step.owned && <span className="sr-only"> (owned by me)</span>}
          </li>
        ))}
      </ol>
      {footnote && <p className="pipeline__footnote">{footnote}</p>}
    </figure>
  );
}
