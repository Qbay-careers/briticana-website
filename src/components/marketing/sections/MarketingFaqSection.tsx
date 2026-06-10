import { marketingImage } from "@/components/marketing/marketingAssetPaths";

export default function MarketingFaqSection() {
  return (
    <div className="faq-area marketing-home-section-y">
      <div className="container mw-1345">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="categories-content position-sticky z-1">
              <h2>
                Frequently <span>asked</span> questions
              </h2>
              <div className="ms-lg-5 d-none d-lg-block">
                <img src={marketingImage("title-shape.png")} alt="" />
              </div>
              <div className="d-none d-lg-block shape3 text-center ms-3 position-absolute mt-4">
                <img src={marketingImage("shape3.png")} alt="" />
              </div>
              <img
                src={marketingImage("shape4.png")}
                className="position-absolute top-0 d-none d-lg-inline-block"
                style={{ right: "-30px" }}
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="accordion faq-wrap" id="accordionExample">
              <div className="accordion-item active">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Is this a traditional internship?
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>
                      No. Briticana is a structured project-based experience platform focused on practical learning and
                      execution.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Will I work on real projects?
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>Yes. Participants work on startup-style real-world projects in mentored teams.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Do I need prior experience?
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>No. Programs are designed for beginners as well as intermediate learners.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Do you provide certificates?
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>Yes. Participants receive a Briticana Experience Certificate after successful completion.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    Do you guarantee jobs?
                  </button>
                </h2>
                <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>
                      We do not guarantee jobs, but we help participants become industry-ready through practical
                      experience and portfolio development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
