import { Modal, Button } from 'react-bootstrap'

function SessionModal({ show, onStayLoggedIn, onLogout }) {
  return (
    <Modal show={show} backdrop="static" keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>Session Expiring</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your session is about to expire. Do you want to stay logged in?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onLogout}>
          Logout
        </Button>
        <Button variant="primary" onClick={onStayLoggedIn}>
          Stay Logged In
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SessionModal
