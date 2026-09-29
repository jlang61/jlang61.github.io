import { profile, stats } from "../content";
import { Download, GitHub, LinkedIn, Mail } from "./Icons";
import { MerkleTrie } from "./MerkleTrie";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <div className="hero__grid container">
        <div className="hero__copy">
          <p className="status">
            <span className="status__dot" aria-hidden="true" />
            {profile.status}
          </p>

          <h1 id="hero-name" className="hero__name">
            {profile.name}
          </h1>
          <p className="hero__tagline">
            Software engineer working <em>where the data lives.</em>
          </p>
          <p className="hero__current">{profile.current}</p>
          <p className="hero__summary">{profile.summary}</p>

          <div className="hero__cta">
            <a className="btn btn--solid" href={profile.resume} target="_blank" rel="noopener">
              <Download size={17} />
              Download résumé
            </a>
            <a className="btn" href={`mailto:${profile.email}`}>
              <Mail size={17} />
              Email me
            </a>
            <div className="hero__social">
              <a className="icon-btn" href={profile.github} target="_blank" rel="noopener" aria-label="GitHub profile">
                <GitHub />
              </a>
              <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn profile">
                <LinkedIn />
              </a>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <MerkleTrie />
          <p className="hero__caption">
            A live Merkle trie, the structure at the heart of <a href="#projects">Avalution</a>. Each write
            re-hashes its path to the root, so one root hash authenticates every key.
          </p>
        </div>
      </div>

      <dl className="stats container">
        {stats.map((s) => (
          <div className="stats__item" key={s.label}>
            <dt className="stats__label">{s.label}</dt>
            <dd className="stats__value">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
