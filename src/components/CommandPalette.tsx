import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type Command = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  keywords?: string;
  icon: ReactNode;
  run: () => void;
};

type Props = {
  open: boolean;
  onClose: () => void;
  commands: Command[];
};

/**
 * ⌘K menu built on the native <dialog> element, which gives us the top
 * layer, focus containment, inert background, and Escape handling for free.
 * Follows the ARIA combobox + listbox pattern.
 */
export function CommandPalette({ open, onClose, commands }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery("");
      setActive(0);
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const runAt = (index: number) => {
    const cmd = results[index];
    if (!cmd) return;
    onClose();
    // Let the dialog close (and restore focus) before the command scrolls or navigates.
    requestAnimationFrame(() => cmd.run());
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(Math.max(0, results.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(active);
    }
  };

  let lastGroup = "";

  return (
    <dialog
      ref={dialogRef}
      className="palette"
      aria-label="Command menu"
      onClose={onClose}
      onClick={(e) => {
        // A click on the dialog element itself is a click on the backdrop.
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="palette__panel">
        <div className="palette__search">
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
            aria-autocomplete="list"
            placeholder="Jump to a section, open a link…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
          />
          <kbd>esc</kbd>
        </div>

        <ul className="palette__list" id={listId} role="listbox" ref={listRef} aria-label="Commands">
          {results.length === 0 && <li className="palette__empty">No matches for “{query}”</li>}
          {results.map((cmd, i) => {
            const header = cmd.group !== lastGroup ? cmd.group : null;
            lastGroup = cmd.group;
            return (
              <li key={cmd.id} role="presentation">
                {header && (
                  <p className="palette__group" aria-hidden="true">
                    {header}
                  </p>
                )}
                <div
                  id={`${listId}-${cmd.id}`}
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  className={`palette__item${i === active ? " is-active" : ""}`}
                  onMouseMove={() => i !== active && setActive(i)}
                  onClick={() => runAt(i)}
                >
                  <span className="palette__icon">{cmd.icon}</span>
                  <span className="palette__label">{cmd.label}</span>
                  {cmd.hint && <span className="palette__hint">{cmd.hint}</span>}
                </div>
              </li>
            );
          })}
        </ul>

        <p className="palette__footer" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </p>
      </div>
    </dialog>
  );
}
