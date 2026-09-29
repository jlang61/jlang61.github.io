import type { ReactNode } from "react";

type Props = {
  id: string;
  index: string;
  title: string;
  note?: string;
  children: ReactNode;
};

export function Section({ id, index, title, note, children }: Props) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className="section__head reveal">
          <span className="section__index">{index}</span>
          <h2 className="section__title" id={`${id}-title`}>
            {title}
          </h2>
          {note && <p className="section__note">{note}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
