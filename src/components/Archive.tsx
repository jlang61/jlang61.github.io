import { archive, profile } from "../content";
import { ArrowRight, ArrowUpRight, GitHub } from "./Icons";
import { Section } from "./Section";

export function Archive() {
  return (
    <Section id="archive" index="04" title="Earlier work" note="apps, analyses & coursework projects">
      <div className="archive reveal">
        <p className="archive__query" aria-hidden="true">
          <span className="kw">SELECT</span> year, project, stack <span className="kw">FROM</span> archive{" "}
          <span className="kw">ORDER BY</span> year <span className="kw">DESC</span>;
        </p>

        <table className="archive__table">
          <thead>
            <tr>
              <th scope="col">year</th>
              <th scope="col">project</th>
              <th scope="col">stack</th>
              <th scope="col">
                <span className="sr-only">links</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {archive.map((item) => (
              <tr key={item.name}>
                <td className="archive__year">{item.year}</td>
                <td className="archive__project">
                  <span className="archive__name">{item.name}</span>
                  <span className="archive__what">{item.what}</span>
                </td>
                <td className="archive__stack">{item.stack}</td>
                <td className="archive__links">
                  {item.live && (
                    <a href={item.live} target="_blank" rel="noopener" aria-label={`${item.name} live site`}>
                      live <ArrowUpRight size={13} />
                    </a>
                  )}
                  {item.repo && (
                    <a href={item.repo} target="_blank" rel="noopener" aria-label={`${item.name} source code`}>
                      <GitHub size={13} /> code
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="archive__foot">
          <span>
            {archive.length} rows <span className="archive__dim">returned</span>
          </span>
          <a className="link-arrow" href={`${profile.github}?tab=repositories`} target="_blank" rel="noopener">
            All repositories <ArrowRight size={15} />
          </a>
        </p>
      </div>
    </Section>
  );
}
