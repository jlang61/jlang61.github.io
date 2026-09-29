import { education, skills } from "../content";
import { Section } from "./Section";

export function Education() {
  return (
    <Section id="education" index="03" title="Education & skills">
      <div className="schools">
        {education.map((s) => (
          <article className={`school reveal${s.current ? " is-current" : ""}`} key={s.school}>
            <div className="school__top">
              <span className="school__short">{s.short}</span>
              {s.current && <span className="pill">In progress</span>}
            </div>
            <h3 className="school__name">{s.school}</h3>
            <p className="school__degree">{s.degree}</p>
            <p className="school__meta">
              {s.dates} · {s.location}
            </p>

            {s.honors && (
              <ul className="honors" aria-label="Honors">
                {s.honors.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}

            <p className="school__label">{s.courseworkLabel}</p>
            <ul className="chips chips--quiet">
              {s.coursework.map((c) => (
                <li className="chip" key={c}>
                  {c}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="skills reveal" id="skills">
        {skills.map((g) => (
          <div className="skills__group" key={g.group}>
            <h3 className="skills__title">{g.group}</h3>
            <ul className="skills__list">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
