type StatusBadgeProps = {
  label: string;
  variant?: "success" | "warning" | "danger" | "secondary" | "info";
};

export default function StatusBadge({ label, variant = "secondary" }: StatusBadgeProps) {
  // TODO: map internship.applicationStatus and student.completionStatus values to consistent Briticana badge colors.
  return (
    <div data-component="StatusBadge">
      <span className={`badge text-bg-${variant}`}>{label}</span>
    </div>
  );
}
