"use client";

import Link from "next/link";
import { Container, Nav, Navbar as BootstrapNavbar } from "react-bootstrap";

type NavbarProps = Record<string, never>;

export default function Navbar(_props: NavbarProps) {
  // TODO: render full Briticana navigation with active states, mobile collapse, and primary CTA to internships.
  return (
    <div data-component="Navbar">
      <BootstrapNavbar expand="lg" bg="white" className="border-bottom shadow-sm">
        <Container>
          <BootstrapNavbar.Brand as={Link} href="/" className="fw-semibold">
            Briticana
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="brit-navbar" />
          <BootstrapNavbar.Collapse id="brit-navbar">
            <Nav className="ms-auto">
              <Nav.Link as={Link} href="/internships">
                Internships
              </Nav.Link>
              <Nav.Link as={Link} href="/programs">
                Programs
              </Nav.Link>
              <Nav.Link as={Link} href="/courses">
                Courses
              </Nav.Link>
              <Nav.Link as={Link} href="/verification">
                Verification
              </Nav.Link>
              <Nav.Link as={Link} href="/contact">
                Contact
              </Nav.Link>
              <Nav.Link as={Link} href="/login">
                Login
              </Nav.Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </div>
  );
}
