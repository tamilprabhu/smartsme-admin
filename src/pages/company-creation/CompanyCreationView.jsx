import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Alert, Card } from 'react-bootstrap'
import { getCompanyCreationWithUser } from './companyCreationApi'

function CompanyCreationView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getCompanyCreationWithUser(id)
        setItem(data)
      } catch (e) {
        setError(e?.message || e?.error || 'Failed to load')
      }
    }

    run()
  }, [id])

  if (error) return <Alert variant="danger">{error}</Alert>
  if (!item) return <div>Loading...</div>

  return (
    <div>
      <h1 className="mb-3">Company Registration Details</h1>
      <Card className="mb-3"><Card.Body>
        <h5>Company</h5>
        <p><strong>Sequence:</strong> {item.companySequence}</p>
        <p><strong>Company ID:</strong> {item.companyId}</p>
        <p><strong>Company Name:</strong> {item.companyName}</p>
        <p><strong>Type:</strong> {item.companyType}</p>
        <p><strong>Business Cons:</strong> {item.businessCons}</p>
        <p><strong>Address:</strong> {item.address}</p>
        <p><strong>Mail:</strong> {item.mailId}</p>
        <p><strong>Owner:</strong> {item.propName}</p>
      </Card.Body></Card>

      <Card className="mb-3"><Card.Body>
        <h5>Admin User</h5>
        <p><strong>User ID:</strong> {item.User?.id || '-'}</p>
        <p><strong>Username:</strong> {item.User?.username || '-'}</p>
        <p><strong>Name:</strong> {item.User?.name || '-'}</p>
        <p><strong>Email:</strong> {item.User?.email || '-'}</p>
        <p><strong>Mobile:</strong> {item.User?.mobile || '-'}</p>
        <p><strong>Role ID:</strong> {item.User?.UserRoles?.[0]?.roleId || '-'}</p>
      </Card.Body></Card>

      <Button variant="secondary" onClick={() => navigate('/company-creation')}>Back</Button>
    </div>
  )
}

export default CompanyCreationView
