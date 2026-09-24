import type { Metadata } from "next";

import RevealObserver from "@/components/experience/RevealObserver";
import "@/styles/experience-pages.css";

export const metadata: Metadata = {
  title: "Briticana Experience Centers",
  description:
    "Briticana Experience Centers: hands-on learning, mentorship, innovation and student entrepreneurship.",
};

export default function ExperienceCentersPage() {
  return (
    <div className="briticana-experience-page">
      <RevealObserver />

      <section className="hero">
        <span className="blob a" aria-hidden="true" />
        <span className="blob b" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy glass">
            <p className="eyebrow">The future of Briticana</p>
            <h1>
              Beyond internships.
              <br />
              <span>Towards innovation.</span>
            </h1>
            <p className="subhead">Building the next generation of professionals and entrepreneurs.</p>
            <p className="intro">
              At Briticana, we believe an internship should be more than a certificate - it should be the
              beginning of a student&apos;s professional journey.
            </p>
            <a className="button" href="#centers">
              Discover the vision ↓
            </a>
          </div>
          <div className="visual">
            <figure>
              <img
                src="/assets/experience-hero.png"
                alt="Students collaborating with a mentor in a modern innovation studio"
              />
            </figure>
            <div className="float-card stat glass">
              <small>Real projects</small>
              <strong>Built together</strong>
            </div>
            <div className="float-card video-card glass">
              <video autoPlay muted loop playsInline poster="/assets/founder-mentorship.png">
                <source src="/assets/student-collaboration.mp4" type="video/mp4" />
              </video>
              <span>● &nbsp; Learning in motion</span>
            </div>
          </div>
        </div>
      </section>

      <section className="dark-strip">
        <div className="shell strip-grid">
          <p>
            While our digital internship platform has enabled students from around the world to gain
            practical experience through structured, mentor-led programs, our vision extends far beyond online
            learning.
          </p>
          <p>
            We are building an ecosystem where students don&apos;t just learn about industries - they become
            active contributors, innovators, and future business leaders.
          </p>
          <p>
            To bring this vision to life, Briticana is expanding into offline experience centers that combine
            hands-on learning, real-world collaboration, mentorship, and entrepreneurship under one roof.
          </p>
        </div>
      </section>

      <section className="section" id="centers">
        <div className="shell">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Introducing</p>
              <h2>Briticana Experience Centers</h2>
            </div>
            <div className="copy">
              <p>Briticana Experience Centers are designed to redefine how students prepare for their careers.</p>
              <p>
                These centers will provide immersive, in-person environments where students can collaborate with
                mentors, industry experts, startup founders, and fellow learners while working on real business
                challenges and innovative projects.
              </p>
              <p>
                Unlike traditional training institutes or classrooms, our centers will operate as professional
                workspaces that simulate the environment of modern startups and technology companies. Students
                won&apos;t simply attend sessions - they will become part of an ecosystem focused on innovation,
                execution, and continuous learning.
              </p>
            </div>
          </div>
          <div className="cards reveal">
            <article className="card">
              <span className="num">01</span>
              <span className="icon">✦</span>
              <h3>Hands-on learning</h3>
              <p>Real projects replace passive classroom learning.</p>
            </article>
            <article className="card purple">
              <span className="num">02</span>
              <span className="icon">◎</span>
              <h3>Expert mentorship</h3>
              <p>Guidance from people building modern industries.</p>
            </article>
            <article className="card">
              <span className="num">03</span>
              <span className="icon">↗</span>
              <h3>Founder mindset</h3>
              <p>Ideas move from concept to execution.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="shell two-col reveal">
          <div className="sticky">
            <p className="index">01</p>
            <p className="eyebrow">Practical execution</p>
            <h2>Learning by building</h2>
            <p>Education is most powerful when students apply knowledge to solve real problems.</p>
          </div>
          <div className="panel">
            <p className="lead">At Briticana, every internship experience is designed around practical execution.</p>
            <p>Students will have opportunities to:</p>
            <ul className="checks">
              <li>Work on live industry projects.</li>
              <li>Collaborate with multidisciplinary teams.</li>
              <li>Develop products and business solutions.</li>
              <li>Present ideas to mentors and industry professionals.</li>
              <li>Receive continuous feedback and performance evaluations.</li>
              <li>Build professional portfolios with real project outcomes.</li>
            </ul>
            <p>
              By focusing on project-based learning, students develop technical expertise, communication skills,
              leadership abilities, and confidence that cannot be gained through theoretical education alone.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col reveal">
          <div className="sticky">
            <p className="index">02</p>
            <p className="eyebrow">World-class mentorship</p>
            <h2>Guidance that moves students forward</h2>
            <p>Behind every successful professional is guidance from experienced mentors.</p>
          </div>
          <div className="panel dark">
            <p>
              Briticana is committed to building a network of industry leaders, entrepreneurs, researchers,
              engineers, designers, marketers, and business professionals who actively mentor students
              throughout their learning journey.
            </p>
            <p>Our mentorship model focuses on:</p>
            <ul className="checks">
              <li>Career guidance</li>
              <li>Technical skill development</li>
              <li>Leadership coaching</li>
              <li>Portfolio building</li>
              <li>Startup mentorship</li>
              <li>Interview preparation</li>
              <li>Professional networking</li>
            </ul>
            <p>
              Students receive personalized support from professionals who understand the challenges of
              today&apos;s rapidly evolving industries.
            </p>
          </div>
        </div>
      </section>

      <section className="section lavender">
        <div className="shell reveal">
          <div className="section-head">
            <div>
              <p className="eyebrow">Building student entrepreneurs</p>
              <h2>From an ambitious idea to a sustainable business.</h2>
            </div>
            <p>One of Briticana&apos;s most ambitious initiatives is empowering students to become founders.</p>
          </div>
          <figure className="media">
            <img
              src="/assets/founder-mentorship.png"
              alt="Student founders discussing a prototype with an experienced mentor"
            />
            <figcaption className="glass">Ideas become stronger through close, practical mentorship.</figcaption>
          </figure>
          <div className="statements">
            <p>
              Many students possess exceptional ideas but lack access to experienced mentors, business networks,
              technical resources, and startup guidance.
            </p>
            <p>
              Briticana aims to bridge this gap by helping aspiring entrepreneurs transform ideas into sustainable
              businesses.
            </p>
            <p>Our entrepreneurship ecosystem is designed to support students from the earliest stages of innovation.</p>
            <p>
              Whether a student has only an idea or an early prototype, Briticana provides the environment,
              mentorship, and strategic support needed to move from concept to execution.
            </p>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="shell two-col reveal">
          <div>
            <p className="eyebrow">From Zero to One</p>
            <h2>Every successful company begins with a single idea.</h2>
            <p>
              Briticana helps students navigate the critical journey from &quot;Zero to One&quot; - the stage
              where ideas evolve into viable products, businesses, and startups.
            </p>
          </div>
          <div className="panel">
            <p>Students receive guidance on:</p>
            <ul className="wide-list">
              <li>Idea validation</li>
              <li>Market research</li>
              <li>Product strategy</li>
              <li>MVP (Minimum Viable Product) development</li>
              <li>Business model creation</li>
              <li>Branding</li>
              <li>Marketing strategy</li>
              <li>Customer acquisition</li>
              <li>Team building</li>
              <li>Growth planning</li>
              <li>Investor readiness</li>
            </ul>
            <p className="lead">
              Rather than simply teaching entrepreneurship, Briticana enables students to experience
              entrepreneurship firsthand.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col reveal">
          <div>
            <p className="eyebrow">Incubation and startup assistance</p>
            <h2>Innovation requires more than inspiration.</h2>
            <p>
              Through our incubation initiatives, Briticana aims to provide selected student founders with
              structured support throughout their startup journey.
            </p>
            <p>
              Our objective is to help promising student ventures develop into sustainable businesses capable of
              creating meaningful impact.
            </p>
          </div>
          <div className="panel">
            <ul className="checks cols">
              <li>Dedicated mentorship</li>
              <li>Startup workspaces</li>
              <li>Business consultations</li>
              <li>Product development guidance</li>
              <li>Technology support</li>
              <li>Networking opportunities</li>
              <li>Industry connections</li>
              <li>Pitch preparation</li>
              <li>Funding readiness</li>
              <li>Collaboration opportunities</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="shell story-grid reveal">
          <article className="story">
            <p className="eyebrow">A community of builders</p>
            <h2>Collaboration becomes momentum.</h2>
            <p>Briticana is not simply creating internship programs.</p>
            <p>
              We are building a community where students, founders, mentors, educators, innovators, and
              professionals collaborate to solve real-world problems.
            </p>
            <p>
              Within this ecosystem, students learn from one another, exchange ideas, build products together, and
              develop the confidence to pursue ambitious goals.
            </p>
            <p>
              By encouraging collaboration across disciplines and cultures, we prepare participants for the
              realities of today&apos;s interconnected global economy.
            </p>
          </article>
          <article className="story">
            <p className="eyebrow">Bridging education and industry</p>
            <h2>Theory meets real execution.</h2>
            <p>Traditional education often emphasizes theory, while industry demands practical experience.</p>
            <p>Briticana exists to bridge this gap.</p>
            <p>
              Our platform combines academic learning with real project execution, professional mentorship,
              entrepreneurial thinking, and collaborative innovation.
            </p>
            <p>
              Students graduate not only with stronger résumés but with practical experience, problem-solving
              abilities, professional confidence, and a portfolio that demonstrates their capabilities.
            </p>
          </article>
        </div>
      </section>

      <section className="vision">
        <div className="shell vision-grid reveal">
          <div>
            <p className="eyebrow">Our vision</p>
            <h2>Meaningful experiential learning for every student.</h2>
          </div>
          <div className="vision-copy">
            <p>
              We envision a future where every student has access to meaningful experiential learning, regardless of
              background or location.
            </p>
            <p>
              Briticana aims to become one of the world&apos;s leading platforms for internships, innovation,
              entrepreneurship, and student-led venture creation.
            </p>
            <p>
              Our long-term goal is to establish Briticana Experience Centers across major education hubs worldwide,
              creating spaces where students can learn, collaborate, innovate, and build companies that address
              real-world challenges.
            </p>
            <p className="big">We are not just preparing students for jobs.</p>
            <p>
              We are preparing them to lead teams, launch startups, solve global problems, and shape the future of
              innovation.
            </p>
            <p>
              At Briticana, every internship is the beginning of a career, every project is an opportunity to
              create impact, and every student has the potential to become the next entrepreneur, innovator, or
              industry leader.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
