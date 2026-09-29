import { experience } from "../content";
import { Pipeline } from "./Pipeline";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" index="01" title="Experience" note="2023 – 2026">
      <ol className="roles">
        {experience.map((role) => (
          <li className="role reveal" key={role.company}>
            <div className="role__meta">
              <span className="monogram" aria-hidden="true">
                {role.monogram}
              </span>
              <p className="role__dates">{role.dates}</p>
              <p className="role__location">{role.location}</p>
            </div>

            <div className="role__body">
              <h3 className="role__company">{role.company}</h3>
              <p className="role__title">
                {role.title}
                {role.team && <span className="role__team"> · {role.team}</span>}
              </p>

              <ul className="role__highlights">
                {role.highlights.map((h) => (
                  <li key={h.lead}>
                    <strong>{h.lead}</strong> {h.text}
                  </li>
                ))}
              </ul>

              {role.pipeline && <Pipeline {...role.pipeline} />}

              <ul className="chips" aria-label="Technologies">
                {role.stack.map((s) => (
                  <li className="chip" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
