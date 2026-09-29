import { profile } from "../content";
import { useModKey } from "../lib/hooks";
import { Check, Copy, Download, GitHub, LinkedIn, Mail } from "./Icons";

type Props = { onCopyEmail: () => void; copied: boolean };

export function Contact({ onCopyEmail, copied }: Props) {
  const modKey = useModKey();

  return (
    <>
      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="container contact__inner reveal">
          <p className="section__index">05</p>
          <h2 className="contact__title" id="contact-title">
            Let’s build something <em>that has to be right.</em>
          </h2>
          <p className="contact__text">
            I’m looking for Summer 2027 internships on database, storage, and infrastructure teams. Email is the
            fastest way to reach me.
          </p>

          <div className="contact__email">
            <a className="contact__address" href={`mailto:${profile.email}`}>
              <Mail size={20} />
              {profile.email}
            </a>
            <button type="button" className="icon-btn" onClick={onCopyEmail} aria-label="Copy email address">
              {copied ? <Check /> : <Copy />}
            </button>
          </div>

          <ul className="contact__links">
            <li>
              <a className="btn" href={profile.linkedin} target="_blank" rel="noopener">
                <LinkedIn size={16} /> LinkedIn
              </a>
            </li>
            <li>
              <a className="btn" href={profile.github} target="_blank" rel="noopener">
                <GitHub size={16} /> GitHub
              </a>
            </li>
            <li>
              <a className="btn" href={profile.resume} target="_blank" rel="noopener">
                <Download size={16} /> Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <p>
            © 2026 {profile.name} · {profile.location}
          </p>
          <p className="footer__built">
            Built from scratch with React, TypeScript & Vite, pre-rendered to static HTML.{" "}
            <a href={`${profile.github}/jlang61.github.io`} target="_blank" rel="noopener">
              Source
            </a>{" "}
            · Press <kbd>{modKey}</kbd> to jump anywhere.
          </p>
        </div>
      </footer>
    </>
  );
}
