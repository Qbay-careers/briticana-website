type BatchCalendarProps = Record<string, never>;

export default function BatchCalendar(_props: BatchCalendarProps) {
  // TODO: render upcoming batch start dates from internship.batchStartDate fields in a simple month grid or list.
  return (
    <div className="border rounded-3 p-3 bg-body-secondary" data-component="BatchCalendar">
      <p className="fw-semibold mb-2">Upcoming batches</p>
      <p className="small text-secondary mb-0">
        Batch milestones will aggregate from Sanity so learners can plan around Ireland, UK, Germany, and Finland cohorts.
      </p>
    </div>
  );
}
