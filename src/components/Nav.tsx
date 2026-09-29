import { useEffect, useState, type MouseEvent } from "react";
import { profile, sections } from "../content";
import { useModKey, useScrollSpy } from "../lib/hooks";
import { FileText, Menu, Moon, Search, Sun } from "./Icons";

const ids = sections.map((s) => s.id);

type Props = {
  onOpenPalette: () => void;
  onToggleTheme: (origin?: { x: number; y: number }) => void;
};

export function Nav({ onOpenPalette, onToggleTheme }: Props) {
  const active = useScrollSpy(ids);
  const modKey = useModKey();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = (e: MouseEvent<HTMLButtonElement>) => {
    // Keyboard activation reports (0, 0); start the reveal from the button instead.
    const r = e.currentTarget.getBoundingClientRect();
    const fromPointer = e.clientX !== 0 || e.clientY !== 0;
    onToggleTheme(fromPointer ? { x: e.clientX, y: e.clientY } : { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav__inner container">
        <a className="nav__brand" href="#top" title="Back to top">
          <span className="nav__mark" aria-hidden="true">
            JL
          </span>
          <span className="nav__name">{profile.name}</span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? "is-active" : undefined} aria-current={active === s.id ? "true" : undefined}>
              {s.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button type="button" className="nav__search" onClick={onOpenPalette} aria-keyshortcuts="Control+K Meta+K" aria-haspopup="dialog">
            <Search size={15} />
            <span className="nav__search-label">Jump to…</span>
            <kbd>{modKey}</kbd>
          </button>
          <button type="button" className="icon-btn nav__menu" onClick={onOpenPalette} aria-label="Open menu" aria-haspopup="dialog">
            <Menu />
          </button>
          <button type="button" className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            <Moon className="icon-moon" />
            <Sun className="icon-sun" />
          </button>
          <a className="btn btn--solid btn--sm nav__resume" href={profile.resume} target="_blank" rel="noopener">
            <FileText size={15} />
            Résumé
          </a>
        </div>
      </div>
    </header>
  );
}
