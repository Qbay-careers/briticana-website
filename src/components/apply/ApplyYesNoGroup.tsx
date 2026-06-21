import { useId } from "react";

import { YES_NO_OPTIONS, type YesNo } from "@/lib/applications/applicationTypes";

type ApplyYesNoGroupProps = {
  name: string;
  legend: React.ReactNode;
  value: YesNo | "";
  onChange: (value: YesNo) => void;
  error?: string;
  colClass?: string;
};

export default function ApplyYesNoGroup({
  name,
  legend,
  value,
  onChange,
  error,
  colClass = "col-12",
}: ApplyYesNoGroupProps) {
  const legendId = useId();

  return (
    <div className={`${colClass} apply-choice-group`} role="radiogroup" aria-labelledby={legendId}>
      <p id={legendId} className="form-label apply-fieldset__legend">
        {legend}
      </p>
      <div className="apply-choice-group__field">
        <div className={`apply-yesno${error ? " is-invalid-group" : ""}`} aria-invalid={!!error}>
          {YES_NO_OPTIONS.map((opt) => (
            <label key={opt.value} className={`apply-yesno__option${value === opt.value ? " is-selected" : ""}`}>
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className="visually-hidden"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
      {error ? <div className="invalid-feedback d-block">{error}</div> : null}
    </div>
  );
}
