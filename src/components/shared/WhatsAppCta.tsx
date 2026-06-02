type WhatsAppCtaProps = {
  label?: string;
};

export default function WhatsAppCta({ label = "Chat on WhatsApp" }: WhatsAppCtaProps) {
  // TODO: render a WhatsApp deep link using siteSettings.whatsappNumber from Sanity once wired.
  return (
    <div className="d-inline-flex align-items-center gap-2" data-component="WhatsAppCta">
      <span className="badge text-bg-success">{label}</span>
      <span className="small text-secondary">Number will hydrate from Briticana site settings.</span>
    </div>
  );
}
