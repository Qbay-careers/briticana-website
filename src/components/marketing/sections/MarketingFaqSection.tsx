import { marketingImage } from "@/components/marketing/marketingAssetPaths";

export default function MarketingFaqSection() {
  return (
    <div className="faq-area pb-120">
      <div className="container mw-1345">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="categories-content position-sticky z-1">
              <h2>
                Frequently <span>Asked</span> Questions
              </h2>
              <div className="ms-lg-5 d-none d-lg-block">
                <img src={marketingImage("title-shape.png")} alt="" />
              </div>
              <div className="d-none d-lg-block shape3 text-center ms-3 position-absolute mt-50">
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
                    What Is Briticana?
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>
                      Briticana is an internship and startup showcase platform designed to help learners build
                      practical skills through mentor-led programs and flexible options across Europe.
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
                    How do I enroll in a program?
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>
                      Browse open internships, pick your domain and region, then follow the application link for your
                      chosen batch.
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
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Can I access materials on mobile devices?
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>Yes — the platform is responsive and works across modern phones and tablets.</p>
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
                    Is there a certificate upon completion?
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>Eligible tracks include verification-friendly completion records; see our certification policy.</p>
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
                    What is the duration of programs?
                  </button>
                </h2>
                <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>Most internship tracks offer 3, 6, or 9 month options depending on the listing.</p>
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
