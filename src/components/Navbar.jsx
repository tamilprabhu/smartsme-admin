import { Navbar, Nav, Container } from 'react-bootstrap'

function AppNavbar() {
  return (
    <Navbar className="navbar-dark bg-dark">
      <Container fluid>
        <Navbar.Brand href="/">SmartSME Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarsExample01" />
        <Navbar.Collapse id="navbarsExample01">
          <Nav className="me-auto mb-2">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
