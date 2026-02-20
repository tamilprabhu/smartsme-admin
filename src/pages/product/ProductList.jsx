import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Form, Pagination } from 'react-bootstrap'
import { API_BASE_URL } from '../../config'

function ProductList() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [page, search])

  const fetchProducts = async () => {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`${API_BASE_URL}/product?page=${page}&itemsPerPage=10&search=${search}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    setProducts(data.items)
    setTotalPages(data.paging.totalPages)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return
    const token = localStorage.getItem('accessToken')
    await fetch(`${API_BASE_URL}/product/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    fetchProducts()
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Products</h1>
        <Link to="/product/create" className="btn btn-primary">Create Product</Link>
      </div>
      <Form.Control
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Raw Material</th>
            <th>Sales Type</th>
            <th>Sales Code</th>
            <th>Sales %</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.prodIdSeq}>
              <td>{product.prodId}</td>
              <td>{product.prodName}</td>
              <td>{product.rawMaterial}</td>
              <td>{product.salesType}</td>
              <td>{product.salesCode}</td>
              <td>{product.salesPercent}</td>
              <td>{product.weight}</td>
              <td>
                <Link to={`/product/${product.prodIdSeq}`} className="btn btn-sm btn-info me-2">View</Link>
                <Link to={`/product/${product.prodIdSeq}/edit`} className="btn btn-sm btn-warning me-2">Edit</Link>
                <Button size="sm" variant="danger" onClick={() => handleDelete(product.prodIdSeq)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item key={i + 1} active={i + 1 === page} onClick={() => setPage(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
      </Pagination>
    </div>
  )
}

export default ProductList
