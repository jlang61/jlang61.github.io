import { projects, type Project } from "../content";
import { ArrowUpRight } from "./Icons";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section id="projects" index="02" title="Selected projects" note="storage · data">
      <div className="projects">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className={`project project--${p.visual} reveal`}>
      <div className="project__visual" aria-hidden="true">
        {p.visual === "layers" ? <LayersVisual /> : <FusionVisual />}
      </div>

      <div className="project__body">
        <div className="project__top">
          <p className="project__kicker">{p.kicker}</p>
          {p.award && <span className="pill pill--award">{p.award}</span>}
        </div>
        <h3 className="project__name">{p.name}</h3>
        <p className="project__context">
          {p.context} <span className="project__dates">· {p.dates}</span>
        </p>

        <p className="project__metric">
          <span className="project__metric-value">{p.metric.value}</span>
          <span className="project__metric-label">{p.metric.label}</span>
        </p>

        <p className="project__summary">{p.summary}</p>
        <ul className="project__bullets">
          {p.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <div className="project__foot">
          <ul className="chips" aria-label="Technologies">
            {p.stack.map((s) => (
              <li className="chip" key={s}>
                {s}
              </li>
            ))}
          </ul>
          {p.links.map((l) => (
            <a key={l.href} className="link-arrow" href={l.href} target="_blank" rel="noopener">
              {l.label}
              <ArrowUpRight size={15} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

/** Conventional stack vs. Avalution: the key-value layer disappears. */
function LayersVisual() {
  // Disk extents in power-of-two sizes; hatched ones are on the free list.
  const extents = [
    { size: 4, free: false },
    { size: 1, free: true },
    { size: 2, free: false },
    { size: 1, free: false },
    { size: 2, free: true },
    { size: 4, free: false },
    { size: 2, free: false }
  ];
  const disk = (
    <div className="layers__disk">
      {extents.map((e, i) => (
        <span key={i} className={`layers__extent${e.free ? " is-free" : ""}`} style={{ flexGrow: e.size }} />
      ))}
    </div>
  );

  return (
    <div className="layers">
      <div className="layers__col">
        <p className="layers__head">conventional</p>
        <div className="layers__box">Merkle trie</div>
        <div className="layers__link" />
        <div className="layers__box layers__box--kv">Key-value store (LevelDB)</div>
        <div className="layers__link" />
        <div className="layers__box layers__box--disk">Disk</div>
      </div>
      <div className="layers__col layers__col--ours">
        <p className="layers__head">avalution</p>
        <div className="layers__box layers__box--ours">Merkle trie</div>
        <div className="layers__link layers__link--long" />
        <div className="layers__box layers__box--gone">KV layer removed</div>
        <div className="layers__link layers__link--long" />
        <div className="layers__box layers__box--disk layers__box--ours">
          Disk
          {disk}
        </div>
      </div>
      <p className="visual__caption">
        Trie nodes are written straight to disk. Freed extents <span className="layers__legend" /> are recycled
        through power-of-two free lists.
      </p>
    </div>
  );
}

/** Three observation sources fused into one density surface. */
function FusionVisual() {
  const sources = ["Acoustic detections", "Visual surveys", "eDNA samples"];
  const cols = 12;
  const rows = 7;
  // A deterministic smooth field so the markup is identical on server and client.
  const cells = Array.from({ length: rows * cols }, (_, i) => {
    const x = (i % cols) / cols;
    const y = Math.floor(i / cols) / rows;
    const v =
      0.55 * Math.exp(-((x - 0.3) ** 2 + (y - 0.35) ** 2) / 0.06) +
      0.45 * Math.exp(-((x - 0.72) ** 2 + (y - 0.7) ** 2) / 0.05) +
      0.12 * Math.sin(x * 9 + y * 5);
    return Math.max(0.1, Math.min(1, v * 1.15)).toFixed(2);
  });

  return (
    <div className="fusion">
      <ul className="fusion__sources">
        {sources.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <span className="fusion__arrow" />
      <div className="fusion__model">
        <span>GLMM</span>
        <small>space × time</small>
      </div>
      <span className="fusion__arrow" />
      <div className="fusion__map" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {cells.map((v, i) => (
          <span key={i} style={{ opacity: v }} />
        ))}
      </div>
      <p className="visual__caption">Three survey methods, one predicted density surface off Southern California.</p>
    </div>
  );
}
