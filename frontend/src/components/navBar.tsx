// components/Navbar.tsx
"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const MyNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expanded={expanded} expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Internship Task</Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(expanded ? false : true)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/crud">
              CRUD
            </Nav.Link>
            <NavDropdown title="Contact" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} target='_blank' href="https://sjadhav2002.github.io">
                Portfolio
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} target='_blank' href="https://www.linkedin.com/in/jadhavrshubham/">
                Linkedin
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} target='_blank' href="https://github.com/sjadhav2002">
                Github
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
