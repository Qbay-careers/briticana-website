import type { Metadata } from "next";

import RevealObserver from "@/components/experience/RevealObserver";
import "@/styles/experience-pages.css";

export const metadata: Metadata = {
  title: "Briticana Around the World",
  description: "Briticana Around the World: global, mentor-led digital internship experiences.",
};

export default function BriticanaWorldPage() {
  return (
    <div className="briticana-experience-page">
      <RevealObserver />

      <section className="hero">
        <span className="blob a" aria-hidden="true" />
        <span className="blob b" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy glass">
            <p className="eyebrow">Briticana around the world</p>
            <h1>
              Global opportunity.
              <br />
              <span>One connected platform.</span>
            </h1>
            <p className="subhead">Empowering students through global internship opportunities.</p>
            <p className="intro">
              Connecting ambitious students with mentor-led internship experiences across continents through a
              globally connected digital platform.
            </p>
            <a className="button" href="#presence">
              Explore our presence ↓
            </a>
          </div>
          <div className="visual">
            <figure>
              <img
                src="/assets/world-hero.png"
                alt="A diverse group of students collaborating in an international learning hub"
              />
            </figure>
            <div className="float-card stat glass">
              <small>Registered presence</small>
              <strong>08 global locations</strong>
            </div>
            <div className="float-card video-card glass">
              <video autoPlay muted loop playsInline poster="/assets/world-hero.png">
                <source src="/assets/tech-work.mp4" type="video/mp4" />
              </video>
              <span>● &nbsp; Digital-first. Human-led.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="shell two-col reveal">
          <div className="sticky">
            <p className="eyebrow">Introduction</p>
            <h2>Talent is no longer limited by geography.</h2>
          </div>
          <div className="panel">
            <p>
              In today&apos;s interconnected world, talent is no longer limited by geography. Students collaborate
              across borders, startups hire globally, and employers value practical experience gained through
              international teamwork.
            </p>
            <p>
              Briticana was created with one mission: to bridge the gap between education and industry by
              providing structured, mentor-led internship experiences that prepare students for the modern
              workforce.
            </p>
            <p>
              As our community continues to grow, we&apos;ve established a registered business presence in
              multiple countries to strengthen partnerships, improve regional support, and make Briticana more
              accessible to students, mentors, universities, and organizations around the world.
            </p>
            <p>
              While our internship programs are delivered through a digital-first platform, our international
              presence reflects our long-term commitment to building a trusted global education ecosystem.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="presence">
        <div className="shell">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Registered global presence</p>
              <h2>Local connection. Global standards.</h2>
            </div>
            <div className="panel dark">
              <p className="eyebrow">Global headquarters</p>
              <h3>🇺🇸 United States</h3>
            </div>
          </div>
          <div className="office-grid reveal">
            <article className="office">
              <span className="flag">🇬🇧</span>
              <p className="eyebrow">United Kingdom</p>
              <h3>European Education &amp; Partnership Office</h3>
              <p>The United Kingdom is where Briticana&apos;s strategic vision comes together.</p>
              <p>
                As one of the world&apos;s leading education and innovation hubs, the UK provides an ideal
                foundation for developing international internship programs that meet global standards.
              </p>
              <p>From here, our leadership team focuses on:</p>
              <ul>
                <li>Platform development</li>
                <li>Global partnerships</li>
                <li>Student success initiatives</li>
                <li>Academic collaborations</li>
                <li>Mentor network expansion</li>
                <li>Innovation in experiential learning</li>
              </ul>
              <p>The UK also serves as the central coordination point for our international operations.</p>
              <a className="email" href="mailto:info.uk@briticana.us">
                info.uk@briticana.us
              </a>
            </article>

            <article className="office">
              <span className="flag">🇩🇪</span>
              <p className="eyebrow">Germany</p>
              <h3>Supporting Innovation and Engineering Talent</h3>
              <p>
                Germany is recognized for its excellence in engineering, manufacturing, research, and technology.
              </p>
              <p>
                Briticana&apos;s presence in Germany strengthens our ability to collaborate with students and
                institutions interested in innovation-driven industries.
              </p>
              <p>
                Through our platform, students can develop practical skills while working on real-world projects
                guided by experienced mentors.
              </p>
              <p>
                Our German presence also supports future collaborations with startups, technology communities, and
                academic institutions across Europe.
              </p>
              <a className="email" href="mailto:info.germany@briticana.us">
                info.germany@briticana.us
              </a>
            </article>

            <article className="office">
              <span className="flag">🇮🇪</span>
              <p className="eyebrow">Ireland</p>
              <h3>Connecting Education and Technology</h3>
              <p>Ireland has become one of Europe&apos;s fastest-growing technology ecosystems.</p>
              <p>
                With a strong presence of multinational companies and world-class universities, Ireland plays an
                important role in Briticana&apos;s European expansion.
              </p>
              <p>Our presence in Ireland enables us to:</p>
              <ul>
                <li>Engage with educational institutions.</li>
                <li>Expand mentor networks.</li>
                <li>Support students interested in technology and business.</li>
                <li>Foster collaborations with innovation communities.</li>
              </ul>
              <a className="email" href="mailto:info.ireland@briticana.us">
                info.ireland@briticana.us
              </a>
            </article>

            <article className="office">
              <span className="flag">🇸🇪</span>
              <p className="eyebrow">Sweden</p>
              <h3>Driving Innovation Through Practical Learning</h3>
              <p>Sweden is globally recognized for its entrepreneurial mindset and commitment to innovation.</p>
              <p>
                Briticana&apos;s presence in Sweden reflects our belief that education should emphasize creativity,
                collaboration, and problem-solving.
              </p>
              <p>
                By connecting students with structured internship experiences, we aim to cultivate future
                innovators prepared for an increasingly digital world.
              </p>
              <a className="email" href="mailto:info.sweden@briticana.us">
                info.sweden@briticana.us
              </a>
            </article>

            <article className="office">
              <span className="flag">🇫🇷</span>
              <p className="eyebrow">France</p>
              <h3>Expanding Educational Collaboration</h3>
              <p>France has a rich tradition of academic excellence, research, and entrepreneurship.</p>
              <p>
                Our presence in France supports Briticana&apos;s vision of building stronger relationships with
                universities, student organizations, and innovation ecosystems.
              </p>
              <p>
                Students participating through our platform gain opportunities to apply their knowledge in
                practical environments while developing globally relevant skills.
              </p>
              <a className="email" href="mailto:info.france@briticana.us">
                info.france@briticana.us
              </a>
            </article>

            <article className="office">
              <span className="flag">🇨🇦</span>
              <p className="eyebrow">Canada</p>
              <h3>Supporting Career-Ready Graduates</h3>
              <p>
                Canada is internationally recognized for its diverse education system and strong focus on
                employability.
              </p>
              <p>
                Briticana&apos;s presence in Canada strengthens our ability to engage with students, mentors, and
                organizations across North America.
              </p>
              <p>
                Our goal is to help students transition from academic learning to professional readiness through
                structured, project-based internship experiences.
              </p>
              <a className="email" href="mailto:info.canada@briticana.us">
                info.canada@briticana.us
              </a>
            </article>

            <article className="office">
              <span className="flag">🇦🇺</span>
              <p className="eyebrow">Australia</p>
              <h3>Expanding Opportunities Across the Asia-Pacific Region</h3>
              <p>
                Australia&apos;s education sector attracts students from around the world and is known for its
                emphasis on practical, industry-focused learning.
              </p>
              <p>
                Briticana&apos;s presence in Australia supports our commitment to expanding opportunities throughout
                the Asia-Pacific region.
              </p>
              <p>
                By working with mentors, educational institutions, and industry professionals, we continue building
                internship programs that prepare students for global careers.
              </p>
              <a className="email" href="mailto:info.australia@briticana.us">
                info.australia@briticana.us
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="section process">
        <div className="shell process-grid reveal">
          <div>
            <p className="eyebrow">How Briticana works across borders</p>
            <h2>A unified digital platform.</h2>
            <p>
              Although our registered presence spans multiple countries, Briticana operates as a unified
              digital platform.
            </p>
            <p>
              Every internship program follows the same high standards, regardless of where a participant is
              located.
            </p>
            <p>
              This model enables students from different countries to collaborate, learn, and gain practical
              experience together.
            </p>
          </div>
          <ol className="steps">
            <li>
              <span>01</span>Student enrollment
            </li>
            <li>
              <span>02</span>Program onboarding
            </li>
            <li>
              <span>03</span>Mentor allocation
            </li>
            <li>
              <span>04</span>Live project participation
            </li>
            <li>
              <span>05</span>Weekly evaluations
            </li>
            <li>
              <span>06</span>Professional feedback
            </li>
            <li>
              <span>07</span>Portfolio development
            </li>
            <li>
              <span>08</span>Verified internship certification
            </li>
          </ol>
        </div>
      </section>

      <section className="section white">
        <div className="shell two-col reveal">
          <div>
            <p className="eyebrow">Why our global presence matters</p>
            <h2>Built for international collaboration.</h2>
          </div>
          <ul className="benefits">
            <li>Build partnerships with universities and educational institutions.</li>
            <li>Collaborate with mentors across industries.</li>
            <li>Support students in multiple regions.</li>
            <li>Strengthen trust through recognized business registrations.</li>
            <li>Expand opportunities for international collaboration.</li>
            <li>Foster a diverse learning community.</li>
          </ul>
        </div>
      </section>

      <section className="section lavender">
        <div className="shell two-col reveal">
          <div>
            <p className="eyebrow">A globally connected internship experience</p>
            <h2>Meaningful learning should never be limited by geography.</h2>
            <p>
              That&apos;s why we&apos;ve built a digital-first internship platform that brings together students,
              mentors, and industry professionals from around the world.
            </p>
            <p>
              Our international presence reflects our commitment to supporting a growing global community,
              fostering partnerships, and making our programs accessible across multiple regions. While Briticana
              maintains registered business addresses in several countries to strengthen our international
              operations and collaborations, all internship programs are delivered through our unified global
              digital platform.
            </p>
            <p>
              This approach allows students to participate from anywhere while maintaining the same high-quality
              learning experience, regardless of their location. Every participant receives access to the same
              structured curriculum, mentor guidance, collaborative project environment, performance evaluations,
              and verified internship certification.
            </p>
            <p>
              By combining a global business presence with a centralized digital learning ecosystem, Briticana
              ensures that every student benefits from a consistent, professional, and internationally accessible
              internship experience.
            </p>
          </div>
          <div className="panel">
            <p className="eyebrow">What this means for our students</p>
            <h3>Access from Anywhere</h3>
            <p>Join internship programs from any country without the need to relocate.</p>
            <h3>Industry Mentorship</h3>
            <p>Learn directly from experienced mentors working across different industries and regions.</p>
            <h3>Collaborative Learning</h3>
            <p>
              Work alongside students from diverse backgrounds, building teamwork and cross-cultural communication
              skills.
            </p>
            <h3>Standardized Quality</h3>
            <p>Every internship follows the same structured framework, learning objectives, and evaluation process.</p>
            <h3>Verified Experience</h3>
            <p>
              Complete real-world projects and earn internship certificates that showcase your practical skills
              and professional development.
            </p>
          </div>
        </div>
        <div className="shell panel dark reveal" style={{ marginTop: 50 }}>
          <p>
            At Briticana, our mission is to remove geographical barriers to experiential learning. Whether
            you&apos;re joining us from Europe, North America, Asia-Pacific, or beyond, you&apos;ll be part of one
            connected global internship community designed to prepare you for the modern workplace.
          </p>
        </div>
      </section>

      <section className="section white">
        <div className="shell two-col reveal">
          <div>
            <p className="eyebrow">Looking ahead</p>
            <h2>A global ecosystem built around meaningful learning.</h2>
          </div>
          <div>
            <p>Briticana&apos;s vision extends beyond delivering internship programs.</p>
            <p>
              We are building a global ecosystem where students, mentors, startups, universities, and
              organizations collaborate to create meaningful learning experiences.
            </p>
            <p>
              As we continue expanding our international presence, our focus remains on innovation, accessibility,
              and preparing the next generation of professionals for a rapidly evolving world.
            </p>
            <p>
              Whether you&apos;re joining us from Europe, North America, Asia-Pacific, or beyond, Briticana is
              committed to helping you gain practical experience that supports your academic and professional
              journey.
            </p>
          </div>
        </div>
      </section>

      <section className="section lavender">
        <div className="shell reveal">
          <p className="eyebrow">Global directory</p>
          <h2>One community across eight locations.</h2>
          <div className="directory">
            <article>
              <span className="flag">🇺🇸</span>
              <div>
                <strong>Global Headquarters</strong>
                <small>United States</small>
              </div>
            </article>
            <article>
              <span className="flag">🇬🇧</span>
              <div>
                <strong>European Partnership Office</strong>
                <small>United Kingdom</small>
              </div>
            </article>
            <article>
              <span className="flag">🇩🇪</span>
              <div>
                <strong>Central Europe Operations</strong>
                <small>Germany</small>
              </div>
            </article>
            <article>
              <span className="flag">🇮🇪</span>
              <div>
                <strong>Education Partnership Office</strong>
                <small>Ireland</small>
              </div>
            </article>
            <article>
              <span className="flag">🇫🇷</span>
              <div>
                <strong>Student Success Office</strong>
                <small>France</small>
              </div>
            </article>
            <article>
              <span className="flag">🇸🇪</span>
              <div>
                <strong>Nordic Operations</strong>
                <small>Sweden</small>
              </div>
            </article>
            <article>
              <span className="flag">🇨🇦</span>
              <div>
                <strong>North America Regional Office</strong>
                <small>Canada</small>
              </div>
            </article>
            <article>
              <span className="flag">🇦🇺</span>
              <div>
                <strong>Asia-Pacific Operations</strong>
                <small>Australia</small>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
