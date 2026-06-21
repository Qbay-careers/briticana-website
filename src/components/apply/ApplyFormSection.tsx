import type { ReactNode } from "react";

type ApplyFormSectionProps = {
  icon: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function ApplyFormSection({ icon, title, subtitle, children }: ApplyFormSectionProps) {
  return (
    <section className="apply-section">
      <div className="apply-section__head">
        <span className="apply-section__icon" aria-hidden>
          <i className={icon} />
        </span>
        <div>
          <h3 className="apply-section__title">{title}</h3>
          {subtitle ? <p className="apply-section__subtitle">{subtitle}</p> : null}
        </div>
      </div>
      <div className="row g-3 g-md-4">{children}</div>
    </section>
  );
}
