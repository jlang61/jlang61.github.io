import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { archive, profile, projects, sections } from "./content";
import { prefersReducedMotion, useReveal, useTheme } from "./lib/hooks";
import { Archive } from "./components/Archive";
import { CommandPalette, type Command } from "./components/CommandPalette";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { ArrowUpRight, Contrast, Copy, FileText, GitHub, Hash, LinkedIn, Mail } from "./components/Icons";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
}

const openExternal = (href: string) => window.open(href, "_blank", "noopener");

export function App() {
  const { toggle: toggleTheme } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);

  useReveal();

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => {
      setToast(null);
      setCopied(false);
    }, 2200);
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      showToast("Email address copied");
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }, [showToast]);

  // ⌘K / Ctrl+K anywhere, or "/" when not typing, opens the palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = !!target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === "/" && !typing && !paletteOpen) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen]);

  const commands = useMemo<Command[]>(
    () => [
      { id: "top", group: "Jump to", label: "Top", icon: <Hash size={16} />, run: () => scrollToSection("top") },
      ...sections.map((s) => ({
        id: s.id,
        group: "Jump to",
        label: s.label,
        keywords: s.keywords,
        icon: <Hash size={16} />,
        run: () => scrollToSection(s.id)
      })),
      {
        id: "skills",
        group: "Jump to",
        label: "Skills",
        keywords: "languages tools stack",
        icon: <Hash size={16} />,
        run: () => scrollToSection("skills")
      },
      {
        id: "resume",
        group: "Actions",
        label: "Open résumé (PDF)",
        keywords: "cv resume download",
        icon: <FileText size={16} />,
        run: () => openExternal(profile.resume)
      },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        keywords: "contact mail",
        icon: <Copy size={16} />,
        run: copyEmail
      },
      {
        id: "email",
        group: "Actions",
        label: "Send an email",
        keywords: "contact mail",
        icon: <Mail size={16} />,
        run: () => (window.location.href = `mailto:${profile.email}`)
      },
      {
        id: "theme",
        group: "Actions",
        label: "Toggle dark mode",
        keywords: "theme light dark",
        icon: <Contrast size={16} />,
        run: () => toggleTheme()
      },
      {
        id: "github",
        group: "Links",
        label: "GitHub",
        hint: `@${profile.githubHandle}`,
        icon: <GitHub size={16} />,
        run: () => openExternal(profile.github)
      },
      {
        id: "linkedin",
        group: "Links",
        label: "LinkedIn",
        icon: <LinkedIn size={16} />,
        run: () => openExternal(profile.linkedin)
      },
      ...projects.flatMap((p) =>
        p.links.map((l) => ({
          id: `project-${p.name}`,
          group: "Links",
          label: `${p.name} source`,
          keywords: p.kicker,
          icon: <ArrowUpRight size={16} />,
          run: () => openExternal(l.href)
        }))
      ),
      ...archive.map((a) => ({
        id: `archive-${a.name}`,
        group: "Earlier work",
        label: a.name,
        hint: a.stack,
        keywords: a.what,
        icon: <ArrowUpRight size={16} />,
        run: () => openExternal(a.live ?? a.repo ?? profile.github)
      }))
    ],
    [copyEmail, toggleTheme]
  );

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav onOpenPalette={() => setPaletteOpen(true)} onToggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <Experience />
        <Projects />
        <Education />
        <Archive />
      </main>
      <Contact onCopyEmail={copyEmail} copied={copied} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} commands={commands} />
      <div className={`toast${toast ? " is-visible" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
