import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function AppNavbar() {
  return (
    <Navbar className="navbar-dark bg-dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">SmartSME Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarsExample01" />
        <Navbar.Collapse id="navbarsExample01">
          <Nav className="me-auto mb-2">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
