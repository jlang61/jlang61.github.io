import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";

export type Theme = "light" | "dark";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function resolvedTheme(): Theme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Theme follows the OS until the visitor picks one. The initial render is
 * always "light" so server and client markup match; the real value is read
 * after hydration. Icons are switched in CSS, so nothing flickers.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(resolvedTheme());
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setTheme(resolvedTheme());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = resolvedTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // Storage can be unavailable (private mode); the choice just won't persist.
      }
      setTheme(next);
    };

    if (!document.startViewTransition || prefersReducedMotion()) {
      apply();
      return;
    }

    // Reveal the new theme as a circle growing from where the toggle was pressed.
    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? window.innerHeight / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(() => flushSync(apply));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 520, easing: "cubic-bezier(.2,.7,.2,1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }, []);

  return { theme, toggle };
}

/** Returns the id of the section currently under the middle of the viewport. */
export function useScrollSpy(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => observer.observe(el));

    // Clear the highlight when scrolled back above the first section.
    const first = els[0];
    const onScroll = () => {
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  return active;
}

/**
 * Fades in `.reveal` elements as they scroll into view. Elements already on
 * screen are marked visible *before* hiding is switched on, so nothing that
 * was painted by the pre-rendered HTML disappears and pops back in. Without
 * JavaScript, nothing is ever hidden.
 */
export function useReveal() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const vh = window.innerHeight;
    for (const el of els) {
      if (el.getBoundingClientRect().top < vh) el.classList.add("is-in");
    }
    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.filter((el) => !el.classList.contains("is-in")).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/** Platform-appropriate label for the command palette shortcut. */
export function useModKey(): string {
  const [label, setLabel] = useState("⌘K");
  useEffect(() => {
    const platform = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ?? navigator.platform;
    if (!/mac|iphone|ipad/i.test(platform)) setLabel("Ctrl K");
  }, []);
  return label;
}
