import { marketingImage } from "@/components/marketing/marketingAssetPaths";

export default function MarketingSubscribeSection() {
  return (
    <div className="subscribe-area bg-03010d pb-100">
      <div className="container mw-1345">
        <div className="row align-items-end">
          <div className="col-lg-7">
            <div className="subscribe-content">
              <div className="section-title text-start mb-0" style={{ maxWidth: "600px" }}>
                <div className="position-relative z-1">
                  <h2 className="text-white">
                    Stay Updated <span>with Briticana</span>
                  </h2>
                  <div className="text-center">
                    <img src={marketingImage("title-shape.png")} className="d-none d-lg-inline-block" alt="" />
                  </div>
                  <img
                    src={marketingImage("shape4.png")}
                    className="d-none d-lg-inline-block position-absolute top-0"
                    style={{ right: "-40px" }}
                    alt=""
                  />
                </div>
                <p className="text-white mt-lg-4 mt-3">
                  Subscribe to our newsletter and get the latest programs, learning tips, and career guidance
                  delivered straight to your inbox every week.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="subscribe-form bg-white mt-4 mt-lg-0">
              <h3>Join Our Newsletter</h3>
              <p>Sign up to receive updates on new cohorts, tutorials, and exclusive offers.</p>
              <form className="position-relative">
                <input type="email" className="form-control" placeholder="Enter your email address" required />
                <button className="subscribe-btn bg-transparent border-0" type="submit">
                  <i className="ri-send-plane-fill lh-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
