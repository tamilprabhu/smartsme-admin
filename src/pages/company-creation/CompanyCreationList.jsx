import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Form, Pagination, Alert } from 'react-bootstrap'
import { deleteCompanyWithUser, getCompanyCreationsWithUser } from './companyCreationApi'
import { ItemsPerPage, SortBy, SortOrder } from '../../constants/listing'

function CompanyCreationList() {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      setError('')
      const data = await getCompanyCreationsWithUser(page, ItemsPerPage.TEN, search, SortBy.SEQUENCE, SortOrder.DESC)
      setItems(data.items || [])
      setTotalPages(data.paging?.totalPages || 1)
    } catch (e) {
      setError(e?.message || e?.error || 'Failed to load company registrations')
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, search])

  const onDelete = async (id) => {
    if (!confirm('Delete this company registration?')) return
    await deleteCompanyWithUser(id)
    fetchData()
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Company Registration</h1>
        <Link to="/company-creation/create" className="btn btn-primary">Create Company Registration</Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Control
        type="text"
        placeholder="Search company name, ID, owner, mail..."
        value={search}
        onChange={(e) => {
          setPage(1)
          setSearch(e.target.value)
        }}
        className="mb-3"
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Company ID</th>
            <th>Company Name</th>
            <th>Owner</th>
            <th>Admin Username</th>
            <th>Admin Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.companySequence}>
              <td>{item.companyId}</td>
              <td>{item.companyName}</td>
              <td>{item.propName}</td>
              <td>{item.User?.username || '-'}</td>
              <td>{item.User?.email || '-'}</td>
              <td>
                <Link to={`/company-creation/${item.companySequence}`} className="btn btn-sm btn-info me-2">View</Link>
                <Link to={`/company-creation/${item.companySequence}/edit`} className="btn btn-sm btn-warning me-2">Edit</Link>
                <Button size="sm" variant="danger" onClick={() => onDelete(item.companySequence)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev disabled={page <= 1} onClick={() => setPage(page - 1)} />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item key={i + 1} active={i + 1 === page} onClick={() => setPage(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next disabled={page >= totalPages} onClick={() => setPage(page + 1)} />
      </Pagination>
    </div>
  )
}

export default CompanyCreationList
