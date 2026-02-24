import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Alert, Form, Button, Card } from 'react-bootstrap'
import { API_BASE_URL } from '../../config'
import { clearValidationError, extractServerValidationErrors, getFirstServerError, getValidationError, hasValidationError } from '../../utils/serverValidation'

function ProductCreate() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [formData, setFormData] = useState({
    productName: '',
    rawMaterial: '',
    weight: '',
    wastage: '',
    norms: '',
    totalWeight: '',
    cavity: '',
    shotRate: '',
    perItemRate: '',
    incentiveLimit: '',
    salesType: 'Sales',
    salesCode: '',
    salesPercent: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    clearValidationError(validationErrors, setValidationErrors, name)
    const next = { ...formData, [name]: value }

    if (name === 'weight' || name === 'wastage') {
      const weight = Number(name === 'weight' ? value : next.weight) || 0
      const wastage = Number(name === 'wastage' ? value : next.wastage) || 0
      next.totalWeight = (weight * (1 + wastage / 100)).toFixed(4)
    }

    setFormData(next)
  }

  const toPayload = () => ({
    productName: formData.productName.trim(),
    rawMaterial: formData.rawMaterial.trim(),
    weight: Number(formData.weight),
    wastage: Number(formData.wastage),
    norms: Number(formData.norms),
    totalWeight: Number(formData.totalWeight),
    cavity: Number(formData.cavity),
    shotRate: Number(formData.shotRate),
    perItemRate: Number(formData.perItemRate),
    incentiveLimit: Number(formData.incentiveLimit),
    salesType: formData.salesType.trim(),
    salesCode: formData.salesCode.trim(),
    salesPercent: Number(formData.salesPercent)
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setValidationErrors({})

    const token = localStorage.getItem('accessToken')
    const response = await fetch(`${API_BASE_URL}/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(toPayload())
    })

    if (!response.ok) {
      const body = await response.json().catch(() => ({}))
      const parsed = extractServerValidationErrors(body)
      setValidationErrors(parsed)
      setError(getFirstServerError(parsed) || body?.message || body?.error || 'Failed to create product')
      return
    }

    navigate('/product')
  }

  return (
    <div>
      <h1>Create Product</h1>
      <Card>
        <Card.Body>
          {error ? <Alert variant="danger">{error}</Alert> : null}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product ID</Form.Label>
              <Form.Control value="Auto-generated" readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control name="productName" value={formData.productName} onChange={handleChange} required isInvalid={hasValidationError(validationErrors, 'productName')} />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'productName')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Raw Material</Form.Label>
              <Form.Control name="rawMaterial" value={formData.rawMaterial} onChange={handleChange} required isInvalid={hasValidationError(validationErrors, 'rawMaterial')} />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'rawMaterial')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Weight</Form.Label>
              <Form.Control type="number" step="0.0001" name="weight" value={formData.weight} onChange={handleChange} required isInvalid={hasValidationError(validationErrors, 'weight')} />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'weight')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Wastage (%)</Form.Label>
              <Form.Control type="number" step="1" name="wastage" value={formData.wastage} onChange={handleChange} required isInvalid={hasValidationError(validationErrors, 'wastage')} />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'wastage')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Norms</Form.Label>
              <Form.Control type="number" step="0.0001" name="norms" value={formData.norms} onChange={handleChange} required isInvalid={hasValidationError(validationErrors, 'norms')} />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'norms')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total Weight</Form.Label>
              <Form.Control type="number" step="0.0001" name="totalWeight" value={formData.totalWeight} onChange={handleChange} required isInvalid={hasValidationError(validationErrors, 'totalWeight')} />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'totalWeight')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cavity</Form.Label>
              <Form.Control type="number" step="1" name="cavity" value={formData.cavity} onChange={handleChange} required isInvalid={hasValidationError(validationErrors, 'cavity')} />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'cavity')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Shot Rate</Form.Label>
              <Form.Control type="number" step="0.01" name="shotRate" value={formData.shotRate} onChange={handleChange} required isInvalid={hasValidationError(validationErrors, 'shotRate')} />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'shotRate')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Per Item Rate</Form.Label>
              <Form.Control type="number" step="0.01" name="perItemRate" value={formData.perItemRate} onChange={handleChange} required isInvalid={hasValidationError(validationErrors, 'perItemRate')} />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'perItemRate')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Incentive Limit</Form.Label>
              <Form.Control type="number" step="1" name="incentiveLimit" value={formData.incentiveLimit} onChange={handleChange} required isInvalid={hasValidationError(validationErrors, 'incentiveLimit')} />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'incentiveLimit')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sales Type</Form.Label>
              <Form.Select name="salesType" value={formData.salesType} onChange={handleChange} required isInvalid={hasValidationError(validationErrors, 'salesType')}>
                <option value="Sales">Sales</option>
                <option value="Contract">Contract</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'salesType')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sales Code</Form.Label>
              <Form.Control name="salesCode" value={formData.salesCode} onChange={handleChange} required isInvalid={hasValidationError(validationErrors, 'salesCode')} />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'salesCode')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sales %</Form.Label>
              <Form.Control type="number" step="0.01" name="salesPercent" value={formData.salesPercent} onChange={handleChange} required isInvalid={hasValidationError(validationErrors, 'salesPercent')} />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'salesPercent')}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary" className="me-2">Create</Button>
            <Link to="/product" className="btn btn-secondary">Cancel</Link>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ProductCreate
