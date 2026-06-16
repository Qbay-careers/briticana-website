import {
  CERTIFICATE_PRESENTATION_EXTERNAL,
  CERTIFICATE_PRESENTATION_PREVIEW,
  type StudentProfile,
} from "@/lib/demo/studentDashboard";

type CertificateViewProps = {
  profile: StudentProfile;
  issuedDate?: string;
};

export default function CertificateView({ profile, issuedDate }: CertificateViewProps) {
  return (
    <div data-component="CertificateView">
      <div className="bg-white rounded-4 shadow-sm p-4 p-sm-5 mb-4">
        <div className="d-flex flex-wrap align-items-start justify-content-between gap-3 mb-4">
          <div>
            <p className="small text-uppercase text-secondary mb-1" style={{ letterSpacing: "0.08em" }}>
              Experience certificate
            </p>
            <h3 className="mb-1">{profile.name}</h3>
            <p className="text-secondary mb-0">{profile.program}</p>
          </div>
          <span className="badge text-bg-success d-inline-flex align-items-center gap-1 fs-6">
            <i className="ri-verified-badge-line" /> Issued
          </span>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-sm-4">
            <span className="small text-secondary d-block">Duration</span>
            <strong>{profile.duration}</strong>
          </div>
          <div className="col-sm-4">
            <span className="small text-secondary d-block">Region</span>
            <strong>{profile.region}</strong>
          </div>
          <div className="col-sm-4">
            <span className="small text-secondary d-block">Batch</span>
            <strong>{profile.batch}</strong>
          </div>
          {issuedDate ? (
            <div className="col-sm-4">
              <span className="small text-secondary d-block">Issued on</span>
              <strong>{issuedDate}</strong>
            </div>
          ) : null}
        </div>

        <div className="ratio ratio-16x9 rounded-3 overflow-hidden border bg-body-secondary">
          <iframe
            src={CERTIFICATE_PRESENTATION_PREVIEW}
            title={`Briticana certificate for ${profile.name}`}
            allowFullScreen
            loading="lazy"
          />
        </div>

        <div className="d-flex flex-wrap gap-3 mt-4">
          <a
            href={CERTIFICATE_PRESENTATION_EXTERNAL}
            target="_blank"
            rel="noopener noreferrer"
            className="main-btn"
          >
            <i className="ri-external-link-line me-2" aria-hidden /> Open in Google Slides
          </a>
        </div>
      </div>
    </div>
  );
}
