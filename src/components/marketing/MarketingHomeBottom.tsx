import Link from "next/link";

import { marketingIcon, marketingImage } from "@/components/marketing/marketingAssetPaths";

const TESTIMONIALS = [
  {
    quote:
      "EduMove helped me sharpen my skills with practical lessons and clear explanations. The learning experience felt structured, engaging, and useful for real-world projects.",
    name: "Jason Miller",
    role: "Product Designer",
    img: "user1.jpg",
  },
  {
    quote:
      "The courses are well-organized and easy to follow. I especially liked how complex topics were broken down into simple, actionable steps that boosted my confidence.",
    name: "Olivia Brown",
    role: "Frontend Developer",
    img: "user2.jpg",
  },
  {
    quote:
      "What I love most about EduMove is the balance between theory and practice. The instructors explain concepts clearly and always focus on real industry needs.",
    name: "Ryan Cooper",
    role: "Software Engineer",
    img: "user3.jpg",
  },
  {
    quote:
      "From beginner to advanced lessons, everything feels thoughtfully designed. EduMove made online learning enjoyable, effective, and truly worth the time invested.",
    name: "Emily Carter",
    role: "Digital Marketer",
    img: "user2.jpg",
  },
];

const TEAM = [
  { name: "Laura Bennett", role: "Senior Lecturer", img: "team1.jpg" },
  { name: "Andrew Collins", role: "Lead Professor", img: "team2.jpg" },
  { name: "Matthew Rogers", role: "Software Architect", img: "team3.jpg" },
  { name: "Sophia Turner", role: "Academic Mentor", img: "team4.jpg" },
  { name: "Natalie Perez", role: "Course Facilitator", img: "team5.jpg" },
  { name: "Daniel Thompson", role: "Professional Instructor", img: "team6.jpg" },
];

const BLOGS = [
  {
    date: "12 March 2025",
    comments: "14",
    title: "How Skill-Based Learning Is Shaping the Future Workforce",
    img: "blog1.jpg",
  },
  {
    date: "28 April 2025",
    comments: "09",
    title: "Choosing the Right Online Course for Long-Term Career Growth",
    img: "blog2.jpg",
  },
  {
    date: "05 May 2025",
    comments: "21",
    title: "Practical Learning Methods That Help Students Succeed Faster",
    img: "blog3.jpg",
  },
];

export default function MarketingHomeBottom() {
  return (
    <>
      <div className="about-area ptb-120">
        <div className="container mw-1345">
          <div className="row g-4 align-items-center" data-cues="slideInUp">
            <div className="col-lg-6">
              <div className="about-img position-relative z-1">
                <img src={marketingImage("about.png")} alt="" />
                <img src={marketingImage("shape5.png")} className="shape5 position-absolute d-none d-lg-inline-block" alt="" />
                <img src={marketingImage("shape6.png")} className="shape6 position-absolute d-none d-lg-inline-block" alt="" />
                <img src={marketingImage("shape7.png")} className="shape7 position-absolute d-none d-lg-inline-block" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content">
                <div className="d-inline-block position-relative z-1 mb-50">
                  <h2>
                    A Fresh Approach to Enhancing <span>Your Skills</span>
                  </h2>
                  <img src={marketingImage("title-shape.png")} className="ms-lg-5" alt="" />
                  <img
                    src={marketingImage("shape4.png")}
                    className="shape4 position-absolute top-0"
                    style={{ right: "-20px" }}
                    alt=""
                  />
                </div>
                <p className="dec">
                  Possessing a strong education is among the most important advantages a person can hold. It profoundly
                  impacts personal and professional development.
                </p>
                <div className="d-sm-flex about-info mt-40">
                  <div className="flex-shrink-0">
                    <div className="icon d-flex justify-content-center align-items-center rounded-circle">
                      <img src={marketingIcon("call.svg")} alt="" />
                    </div>
                  </div>
                  <div className="flex-grow-1 mt-3 mt-sm-0">
                    <h3>Flexible Study Hours</h3>
                    <p>Flexible scheduling empowers students to learn at their own pace and convenience.</p>
                  </div>
                </div>
                <div className="d-sm-flex about-info">
                  <div className="flex-shrink-0">
                    <div className="icon d-flex justify-content-center align-items-center rounded-circle">
                      <img src={marketingIcon("instructors.svg")} alt="" />
                    </div>
                  </div>
                  <div className="flex-grow-1 mt-3 mt-sm-0">
                    <h3>Qualified Instructors</h3>
                    <p>
                      Every Instructor is certified and holds advanced degrees, ensuring you&apos;re guided by true
                      professionals.
                    </p>
                  </div>
                </div>
                <div className="d-sm-flex about-info">
                  <div className="flex-shrink-0">
                    <div className="icon d-flex justify-content-center align-items-center rounded-circle">
                      <img src={marketingIcon("career.svg")} alt="" />
                    </div>
                  </div>
                  <div className="flex-grow-1 mt-3 mt-sm-0">
                    <h3>Advance Your Career</h3>
                    <p>
                      Build confidence for job interviews through realistic practice sessions, detailed feedback, and
                      presentation tips.
                    </p>
                  </div>
                </div>
                <Link href="/programs" className="main-btn">
                  Know More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="choose-us-area">
        <div className="container mw-1345">
          <div className="choose-us-wrap bg-f7f7f7 pb-0 position-relative z-1" data-cues="slideInUp">
            <div className="section-title" style={{ maxWidth: "525px" }}>
              <div className="position-relative z-1">
                <h2>
                  Why Choose Us for Your <span>Learning</span>
                </h2>
                <img src={marketingImage("title-shape.png")} className="d-none d-lg-inline-block ms-lg-5" alt="" />
                <img
                  src={marketingImage("shape4.png")}
                  className="d-none d-lg-inline-block position-absolute top-0"
                  style={{ right: "-40px" }}
                  alt=""
                />
              </div>
            </div>
            <Link href="/contact" className="text-center d-block text-lg-center">
              <img src={marketingImage("choose-us.png")} alt="" />
            </Link>
            <img
              src={marketingImage("shape8.png")}
              className="position-absolute d-none d-lg-inline-block"
              style={{ top: "130px", right: "160px" }}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="testimonial-area ptb-120">
        <div className="container mw-1345">
          <div className="section-title text-center mx-auto" style={{ maxWidth: "615px" }}>
            <div className="position-relative z-1">
              <h2>
                What <span>Students Say</span> About Briticana
              </h2>
              <img src={marketingImage("title-shape.png")} className="d-none d-lg-inline-block" alt="" />
              <img
                src={marketingImage("shape4.png")}
                className="d-none d-lg-inline-block position-absolute top-0"
                style={{ right: "-40px" }}
                alt=""
              />
            </div>
          </div>
          <div className="testimonial-slide owl-carousel owl-theme">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testimonial-single-item bg-f7f7f7">
                <img src={marketingImage("quat.svg")} className="quat" alt="" />
                <p>{t.quote}</p>
                <div className="d-flex align-items-center info">
                  <div className="flex-shrink-0">
                    <img src={marketingImage(t.img)} style={{ width: "60px" }} className="rounded-circle" alt="" />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="more-testimonial d-flex justify-content-center justify-content-md-end">
            <div>
              <h4>
                Trusted by <span>120K+</span> Learners Worldwide
              </h4>
              <ul className="p-0 m-0 list-unstyled d-flex justify-content-center justify-content-md-start">
                {["user1.jpg", "user2.jpg", "user3.jpg", "user4.jpg"].map((u, i) => (
                  <li key={u} className={i === 3 ? "position-relative z-1" : undefined}>
                    <img src={marketingImage(u)} alt="" />
                    {i === 3 ? (
                      <Link href="/programs" className="more d-flex justify-content-center align-items-center text-decoration-none text-white">
                        <i className="ri-add-line" />
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

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

      <div className="team-area pb-120">
        <div className="container mw-1345">
          <div className="section-title text-center mx-auto" style={{ maxWidth: "760px" }}>
            <div className="position-relative z-1" data-cues="slideInUp">
              <h2>
                Expert <span>Instructors Committed</span> to Your Success
              </h2>
              <img src={marketingImage("title-shape.png")} className="d-none d-lg-inline-block" alt="" />
              <img
                src={marketingImage("shape4.png")}
                className="d-none d-lg-inline-block position-absolute top-0"
                style={{ right: "-40px" }}
                alt=""
              />
            </div>
          </div>
          <div className="row g-4" data-cues="slideInUp">
            {TEAM.map((m) => (
              <div key={m.name} className="col-lg-4 col-sm-6">
                <Link href="/programs" className="team-single-item d-block text-decoration-none">
                  <div className="team-img">
                    <img src={marketingImage(m.img)} alt="" />
                  </div>
                  <div className="team-content">
                    <h3>{m.name}</h3>
                    <span>{m.role}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <p className="apply">
            Interested in teaching with us?{" "}
            <Link href="/login">Join our instructor team</Link>
          </p>
        </div>
      </div>

      <div className="journey-area">
        <div className="container mw-1345">
          <div className="journey-content ptb-120 position-relative z-1 overflow-hidden">
            <div className="section-title text-center mx-auto" style={{ maxWidth: "760px" }} data-cues="slideInUp">
              <div className="position-relative z-1 mb-4">
                <h2>
                  Ready to <span>Begin Your</span> Learning Journey?
                </h2>
                <img src={marketingImage("title-shape.png")} className="d-none d-lg-inline-block" alt="" />
                <img
                  src={marketingImage("shape4.png")}
                  className="d-none d-lg-inline-block position-absolute top-0"
                  style={{ right: "-40px" }}
                  alt=""
                />
              </div>
              <p>
                A gentle calm has wrapped around me, much like the tender embrace of a spring morning that fills my
                heart with quiet joy.
              </p>
              <div className="d-flex flex-wrap justify-content-center mt-lg-5 mt-4" style={{ gap: "20px" }}>
                <Link href="/courses" className="main-btn black">
                  Browse Courses
                </Link>
                <Link href="/programs" className="main-btn">
                  Become A Teacher
                </Link>
              </div>
            </div>
            <img src={marketingImage("shape9.png")} className="position-absolute top-50 start-50 translate-middle z-n1" alt="" />
          </div>
        </div>
      </div>

      <div className="blog-area ptb-120">
        <div className="container mw-1345">
          <div
            className="section-title mw-100 d-flex flex-wrap gap-2 align-items-center justify-content-between"
            data-cues="slideInUp"
          >
            <div className="position-relative z-1 text-center">
              <h2>
                Trending <span>Insights & Articles</span>
              </h2>
              <img src={marketingImage("title-shape.png")} className="d-none d-lg-inline-block " alt="" />
              <img
                src={marketingImage("shape4.png")}
                className="d-none d-lg-inline-block position-absolute top-0"
                style={{ right: "-40px" }}
                alt=""
              />
            </div>
            <Link href="/courses" className="main-btn">
              Explore All Courses
            </Link>
          </div>
          <div className="row justify-content-center g-4" data-cues="slideInUp">
            {BLOGS.map((b) => (
              <div key={b.title} className="col-lg-4 col-md-6">
                <div className="blog-single-item">
                  <Link href="/programs">
                    <img src={marketingImage(b.img)} alt="" />
                  </Link>
                  <div className="blog-content">
                    <ul className="p-0 list-unstyled info d-flex align-items-center" style={{ gap: "30px" }}>
                      <li className="d-flex align-items-center gap-2">
                        <i className="ri-calendar-line" />
                        <span>{b.date}</span>
                      </li>
                      <li>
                        <Link href="/programs" className="text-decoration-none d-flex align-items-center gap-2">
                          <i className="ri-chat-2-line position-relative" style={{ top: "2px" }} />
                          <span>Comment ({b.comments})</span>
                        </Link>
                      </li>
                    </ul>
                    <Link href="/programs" className="text-decoration-none d-block">
                      <h3>{b.title}</h3>
                    </Link>
                    <Link href="/programs" className="main-btn">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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

      <div className="footer-area bg-03010d">
        <div className="container mw-1345 border-top-bottom ptb-100">
          <div className="row g-4">
            <div className="col-lg-3 col-sm-6">
              <div className="footer-single-item">
                <Link href="/" className="fw-bold logo text-white">
                  <span>Briti</span>cana
                </Link>
                <p>Internship experiences and startup collaboration across Ireland, the UK, Germany, and Finland.</p>
                <ul className="p-0 list-unstyled d-flex align-items-center social">
                  <li>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="bg-white text-decoration-none">
                      <i className="ri-facebook-fill" />
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="bg-white text-decoration-none">
                      <i className="ri-twitter-fill" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="bg-white text-decoration-none">
                      <i className="ri-linkedin-fill" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="bg-white text-decoration-none">
                      <i className="ri-instagram-fill" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer-single-item">
                <h3>Explore</h3>
                <ul className="import-links p-0 b-0 list-unstyled">
                  <li>
                    <Link href="/programs">Programs</Link>
                  </li>
                  <li>
                    <Link href="/courses">Courses</Link>
                  </li>
                  <li>
                    <Link href="/internships">Internships</Link>
                  </li>
                  <li>
                    <Link href="/verification">Verification</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer-single-item">
                <h3>Pages</h3>
                <ul className="import-links p-0 b-0 list-unstyled">
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link href="/refund-policy">Refund Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer-single-item">
                <h3>Contact Us</h3>
                <ul className="import-links p-0 b-0 list-unstyled">
                  <li>
                    <div className="d-flex align-items-center gap-2">
                      <i className="ri-phone-fill text-white" />
                      <a href="tel:+353000000000">+353 (0) 000 0000</a>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center gap-2">
                      <i className="ri-mail-line text-white" />
                      <a href="mailto:hello@briticana.com">hello@briticana.com</a>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center gap-2">
                      <i className="ri-map-pin-line text-white" />
                      <span className="text-white">Dublin · London · Berlin</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-area bg-03010d">
        <div className="container mw-1345">
          <p className="text-white">
            Copyright <span>Briticana</span> || All Rights Reserved
          </p>
        </div>
      </div>

      <div className="back-to-top">
        <i className="ri-arrow-up-s-line" />
      </div>
    </>
  );
}
