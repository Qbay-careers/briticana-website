import type { ReactNode } from "react";

export type LegalBlock =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: ReactNode }
  | { kind: "ul"; items: ReactNode[] };

export function LegalSections({ blocks }: { blocks: readonly LegalBlock[] }) {
  return (
    <div className="legal-doc__body">
      {blocks.map((b, i) => {
        const key = `${b.kind}-${i}`;
        if (b.kind === "h2") {
          return (
            <h2 key={key} className="legal-doc__h2">
              {b.text}
            </h2>
          );
        }
        if (b.kind === "h3") {
          return (
            <h3 key={key} className="legal-doc__h3">
              {b.text}
            </h3>
          );
        }
        if (b.kind === "p") {
          return (
            <p key={key} className="legal-doc__p">
              {b.text}
            </p>
          );
        }
        return (
          <ul key={key} className="legal-doc__ul">
            {b.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
