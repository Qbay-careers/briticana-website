import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type ApplyFormControlProps = {
  id: string;
  label: ReactNode;
  icon: string;
  error?: string;
  colClass?: string;
  textarea?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  selectProps?: SelectHTMLAttributes<HTMLSelectElement>;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export default function ApplyFormControl({
  id,
  label,
  icon,
  error,
  colClass = "col-12 col-md-6",
  textarea,
  inputProps,
  selectProps,
  textareaProps,
}: ApplyFormControlProps) {
  const invalid = error ? " is-invalid" : "";

  return (
    <div className={colClass}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className={`apply-control${textarea ? " apply-control--textarea" : ""}`}>
        <i className={`apply-control__icon ${icon}`} aria-hidden />
        {textarea ? (
          <textarea id={id} className={`form-control${invalid}`} {...textareaProps} />
        ) : selectProps ? (
          <select id={id} className={`form-select${invalid}`} {...selectProps} />
        ) : (
          <input id={id} className={`form-control${invalid}`} {...inputProps} />
        )}
      </div>
      {error ? <div className="invalid-feedback d-block">{error}</div> : null}
    </div>
  );
}
