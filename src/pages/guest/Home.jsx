import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <Container className="py-5">
      <h1>Welcome to SmartSME Admin</h1>
      <p>Manage your manufacturing operations efficiently.</p>
      <Link to="/login" className="btn btn-primary">Get Started</Link>
    </Container>
  )
}

export default Home
