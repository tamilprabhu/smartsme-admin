import { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { API_BASE_URL } from '../config'
import { clearValidationError, extractServerValidationErrors, getFirstServerError, getValidationError, hasValidationError } from '../utils/serverValidation'

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    clearValidationError(validationErrors, setValidationErrors, e.target.name)
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.newPassword !== formData.confirmPassword) {
      setValidationErrors({ confirmPassword: ['New passwords do not match'] })
      setError('New passwords do not match')
      return
    }

    if (formData.newPassword.length < 6) {
      setValidationErrors({ newPassword: ['New password must be at least 6 characters'] })
      setError('New password must be at least 6 characters')
      return
    }

    setValidationErrors({})
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      })

      const data = await response.json()

      if (!response.ok) {
        const parsed = extractServerValidationErrors(data)
        setValidationErrors(parsed)
        throw new Error(getFirstServerError(parsed) || data.error || data.message || 'Failed to change password')
      }

      setSuccess('Password changed successfully')
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Change Password</h1>
      <Card style={{ maxWidth: '500px' }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                isInvalid={hasValidationError(validationErrors, 'currentPassword')}
                required
              />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'currentPassword')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                isInvalid={hasValidationError(validationErrors, 'newPassword')}
                required
              />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'newPassword')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={hasValidationError(validationErrors, 'confirmPassword')}
                required
              />
              <Form.Control.Feedback type="invalid">{getValidationError(validationErrors, 'confirmPassword')}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Changing...' : 'Change Password'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ChangePassword
