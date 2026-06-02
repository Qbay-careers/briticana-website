import Link from "next/link";

import { marketingIcon, marketingImage } from "@/components/marketing/marketingAssetPaths";

const PARTNERS = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `partner${n}.png`);

const CATEGORY_ITEMS: { title: string; count: string; icon: string; href: string }[] = [
  { title: "Web Design", count: "25 Courses", icon: "categories1.svg", href: "/courses" },
  { title: "Graphic Design", count: "10 Courses", icon: "categories2.svg", href: "/courses" },
  { title: "Development", count: "05 Courses", icon: "categories3.svg", href: "/courses" },
  { title: "IT And Software", count: "08 Courses", icon: "categories4.svg", href: "/courses" },
  { title: "Sales Marketing", count: "11 Courses", icon: "categories5.svg", href: "/courses" },
  { title: "Art & Humanities", count: "22 Courses", icon: "categories6.svg", href: "/courses" },
  { title: "Mobile Application", count: "15 Courses", icon: "categories7.svg", href: "/courses" },
  { title: "Finance Accounting", count: "04 Courses", icon: "categories8.svg", href: "/courses" },
];

const COURSE_CARDS: {
  tag: string;
  title: string;
  author: string;
  userImg: string;
  hours: string;
  students: string;
  priceWas: string;
  priceNow: string;
  img: string;
}[] = [
  {
    tag: "Mobile Development",
    title: "Android App Development Using Java for Beginners",
    author: "Michael Turner",
    userImg: "user1.jpg",
    hours: "3 hrs",
    students: "34",
    priceWas: "$75.00",
    priceNow: "$55.00",
    img: "course1.jpg",
  },
  {
    tag: "Web Development",
    title: "Complete Frontend Web Development Bootcamp",
    author: "Sarah Williams",
    userImg: "user2.jpg",
    hours: "4 hrs",
    students: "48",
    priceWas: "$80.00",
    priceNow: "$60.00",
    img: "course2.jpg",
  },
  {
    tag: "UI/UX Design",
    title: "User Experience Design for Modern Applications",
    author: "Daniel Roberts",
    userImg: "user3.jpg",
    hours: "2.5 hrs",
    students: "22",
    priceWas: "$65.00",
    priceNow: "$45.00",
    img: "course3.jpg",
  },
  {
    tag: "Digital Marketing",
    title: "SEO and Social Media Marketing Masterclass",
    author: "Emily Johnson",
    userImg: "user1.jpg",
    hours: "3.5 hrs",
    students: "41",
    priceWas: "$70.00",
    priceNow: "$50.00",
    img: "course4.jpg",
  },
  {
    tag: "Data Science",
    title: "Data Analysis and Visualization with Python",
    author: "James Anderson",
    userImg: "user2.jpg",
    hours: "4.5 hrs",
    students: "29",
    priceWas: "$85.00",
    priceNow: "$65.00",
    img: "course5.jpg",
  },
  {
    tag: "Cyber Security",
    title: "Ethical Hacking and Network Security Basics",
    author: "Kevin Martinez",
    userImg: "user3.jpg",
    hours: "3 hrs",
    students: "26",
    priceWas: "$78.00",
    priceNow: "$58.00",
    img: "course6.jpg",
  },
];

export default function MarketingHomeTop() {
  return (
    <>
      <div className="banner-area">
        <div className="container mw-1345">
          <div className="position-relative z-1">
            <div className="banner-content text-center" data-cues="slideInUp" data-group="images">
              <h1>LEARN THE SKILLS OF TOMORROW.</h1>
              <Link href="/courses" className="main-btn">
                Explore Our All Courses
              </Link>
            </div>

            <div className="d-none d-md-inline-block" data-cues="slideInUp" data-group="images">
              <img src={marketingImage("banner-1.jpg")} className="banner1 position-absolute z-n1 rounded-3" alt="" />
              <img src={marketingImage("banner-2.jpg")} className="banner2 position-absolute z-n1 rounded-3" alt="" />
              <img src={marketingImage("banner-3.jpg")} className="banner3 position-absolute z-n1 rounded-3" alt="" />
              <img src={marketingImage("banner-4.jpg")} className="banner4 position-absolute z-n1 rounded-3" alt="" />
              <img src={marketingImage("banner-5.jpg")} className="banner5 position-absolute z-n1 rounded-3" alt="" />
              <img src={marketingImage("banner-6.jpg")} className="banner6 position-absolute z-n1 rounded-3" alt="" />
              <img src={marketingImage("shape1.png")} className="shape1 position-absolute z-n1 rounded-3" alt="" />
            </div>
          </div>
        </div>
        <div className="pb-120" />
        <div className="container mw-1345 position-relative z-1">
          <div className="row g-4" data-cues="slideInUp">
            <div className="col-lg-9">
              <div className="row g-4">
                <div className="col-lg-8">
                  <div className="banner-img7">
                    <img src={marketingImage("banner-7.jpg")} className="rounded-4" alt="" />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="qualified-success-wrap">
                    <div className="qualified mb-4">
                      <ul className="p-0 list-unstyled d-flex align-items-center user-list">
                        {["user1.jpg", "user2.jpg", "user3.jpg", "user4.jpg"].map((u) => (
                          <li key={u}>
                            <img src={marketingImage(u)} className="rounded-circle" alt="" />
                          </li>
                        ))}
                      </ul>
                      <h3>Learn from 40+ Qualified Educators</h3>
                    </div>
                    <div className="success-wrap">
                      <p>&ldquo;Keep growing, believe in your path, and success will find you.&rdquo;</p>
                      <h4>Eddie Lenz</h4>
                      <span>Quote from our teacher</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="banner-img8 h-100">
                <img src={marketingImage("banner-8.jpg")} className="h-100 rounded-4" alt="" />
              </div>
            </div>
          </div>
          <img src={marketingImage("shape2.png")} className="shape2 d-none d-lg-inline-block position-absolute" alt="" />
        </div>
      </div>

      <div className="partner-area ptb-120">
        <div className="container mw-1345">
          <span className="partner-title">Recognized by leading industry brands</span>
        </div>
        <div className="partner-slide owl-carousel owl-theme">
          {PARTNERS.map((name) => (
            <div key={name} className="partner-item">
              <img src={marketingImage(name)} alt="partner" />
            </div>
          ))}
        </div>
      </div>

      <div className="categories-area pb-120 tp-panel-pin-area">
        <div className="container mw-1345">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="categories-content position-sticky z-1">
                <h2>
                  Browse Course <span>Categories</span>
                </h2>
                <div className="ms-lg-5 d-none d-lg-block">
                  <img src={marketingImage("title-shape.png")} alt="" />
                </div>
                <img
                  src={marketingImage("shape4.png")}
                  className="position-absolute top-0 d-none d-lg-inline-block"
                  style={{ right: "-30px" }}
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="categories-wrap">
                <div className="row g-4" data-cues="slideInUp">
                  {CATEGORY_ITEMS.map((c) => (
                    <div key={c.title} className="col-md-4 col-sm-6">
                      <Link
                        href={c.href}
                        className="categories-single-item text-decoration-none d-block text-center bg-white"
                      >
                        <div className="icon-border">
                          <div className="icon d-flex justify-content-center align-items-center mx-auto rounded-circle">
                            <img src={marketingIcon(c.icon)} alt="" />
                          </div>
                        </div>
                        <h3>{c.title}</h3>
                        <div className="d-flex align-items-center gap-2 justify-content-center">
                          <span>{c.count}</span>
                          <img src={marketingIcon("right-arrow.svg")} className="right-arrow" alt="" />
                        </div>
                      </Link>
                    </div>
                  ))}
                  <div className="col-md-4 col-sm-6">
                    <Link
                      href="/programs"
                      className="categories-single-item text-decoration-none d-block text-center h-100 d-flex justify-content-center align-items-center all gap-2"
                    >
                      <span>All Categories</span>
                      <img src={marketingIcon("right-arrow.svg")} className="right-arrow" alt="" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="courses-area ptb-120 bg-f7f7f7">
        <div className="container mw-1345">
          <div
            className="section-title mw-100 d-flex flex-wrap gap-2 align-items-center justify-content-between"
            data-cues="slideInUp"
          >
            <div className="position-relative z-1 text-center">
              <h2>
                Most Popular <span>Courses</span>
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
              View All Courses
            </Link>
          </div>

          <div className="row g-4" data-cues="slideInUp">
            {COURSE_CARDS.map((c) => (
              <div key={c.title} className="col-lg-4 col-md-6">
                <div className="courses-single-item">
                  <Link href="/internships" className="d-block courses-img">
                    <img src={marketingImage(c.img)} alt="" />
                  </Link>
                  <div className="courses-content">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link href="/internships" className="tag">
                        {c.tag}
                      </Link>
                      <div className="d-flex align-items-center start">
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                        <i className="ri-star-fill" />
                      </div>
                    </div>
                    <Link href="/internships" className="title text-decoration-none">
                      <h3>{c.title}</h3>
                    </Link>
                    <Link href="/programs" className="d-flex align-items-center text-decoration-none">
                      <div className="flex-shrink-0">
                        <img
                          src={marketingImage(c.userImg)}
                          className="rounded-circle"
                          style={{ width: "35px", height: "35px" }}
                          alt=""
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">{c.author}</div>
                    </Link>
                    <div className="d-flex justify-content-between align-items-center course-info">
                      <div className="d-flex align-items-center" style={{ gap: "20px" }}>
                        <div className="d-flex align-items-center" style={{ gap: "7px" }}>
                          <i className="ri-time-line" />
                          <span>{c.hours}</span>
                        </div>
                        <div className="d-flex align-items-center" style={{ gap: "7px" }}>
                          <i className="ri-user-line" />
                          <span>{c.students}</span>
                        </div>
                      </div>
                      <h4 className="mb-0">
                        <del>{c.priceWas}</del>
                        <span>{c.priceNow}</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
