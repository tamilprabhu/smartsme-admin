import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { API_BASE_URL } from '../../config'

function ProductView() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`${API_BASE_URL}/product/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    setProduct(data)
  }

  if (!product) return <div>Loading...</div>

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Product Details</h1>
        <div>
          <Link to={`/product/${id}/edit`} className="btn btn-warning me-2">Edit</Link>
          <Link to="/product" className="btn btn-secondary">Back</Link>
        </div>
      </div>
      <Card>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Product ID:</strong> {product.prodId}</p>
              <p><strong>Name:</strong> {product.prodName}</p>
              <p><strong>Company ID:</strong> {product.companyId}</p>
              <p><strong>Raw Material:</strong> {product.rawMaterial}</p>
              <p><strong>Weight:</strong> {product.weight}</p>
              <p><strong>Wastage:</strong> {product.wastage}%</p>
            </Col>
            <Col md={6}>
              <p><strong>Norms:</strong> {product.norms}</p>
              <p><strong>Total Weight:</strong> {product.totalWeight}</p>
              <p><strong>Cavity:</strong> {product.cavity}</p>
              <p><strong>Shot Rate:</strong> {product.shotRate}</p>
              <p><strong>Per Item Rate:</strong> {product.perItemRate}</p>
              <p><strong>Incentive Limit:</strong> {product.incentiveLimit}</p>
              <p><strong>Sales Type:</strong> {product.salesType}</p>
              <p><strong>Sales Code:</strong> {product.salesCode}</p>
              <p><strong>Sales %:</strong> {product.salesPercent}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ProductView
