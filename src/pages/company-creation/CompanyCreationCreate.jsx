import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Alert } from 'react-bootstrap'
import CompanyCreationForm from './CompanyCreationForm'
import {
  createCompanyWithUser,
  getRoles,
  getStates,
  getDistricts,
  getPincodes
} from './companyCreationApi'
import { extractServerValidationErrors, getFirstServerError } from '../../utils/serverValidation'

const defaultForm = {
  company: {
    companyName: '', businessCons: 'CORPORATION', companyType: 'MEDIUM',
    address: '', pincode: '', propName: '', directPhone: '', officePhone: '', mgmtPhone: '',
    mailId: '', natureOfBusiness: 'MANUFACTURING', authPerson: '', mobileNo: '',
    stateId: '', districtId: ''
  },
  user: {
    username: '', firstName: '', lastName: '', name: '', email: '', mobile: '', address: '', password: ''
  },
  roleUser: { roleId: '' }
}

const buildPayload = (form) => {
  const { stateId, districtId, ...company } = form.company
  return {
    company: {
      ...company,
      pincode: company.pincode ? String(company.pincode) : ''
    },
    user: { ...form.user },
    roleUser: { ...form.roleUser }
  }
}

function CompanyCreationCreate() {
  const navigate = useNavigate()
  const [form, setForm] = useState(defaultForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [states, setStates] = useState([])
  const [districts, setDistricts] = useState([])
  const [pincodeOptions, setPincodeOptions] = useState([])
  const [serverValidationErrors, setServerValidationErrors] = useState({})

  useEffect(() => {
    const loadHelpers = async () => {
      try {
        const [roleResponse, stateResponse] = await Promise.all([getRoles(1, 100), getStates()])
        const allRoles = roleResponse?.items || []
        const ownerRole = allRoles.find((role) => role?.name === 'OWNER')
        setRoles(ownerRole ? [ownerRole] : [])
        setForm((prev) => ({ ...prev, roleUser: { ...prev.roleUser, roleId: ownerRole?.id || '' } }))
        setStates(stateResponse || [])
      } catch {
        setError('Failed to load helper APIs (roles/states)')
      }
    }
    loadHelpers()
  }, [])

  const clearServerError = (field) => {
    if (!serverValidationErrors[field]) return
    const next = { ...serverValidationErrors }
    delete next[field]
    setServerValidationErrors(next)
  }

  const handleStateChange = async (stateId) => {
    setDistricts([])
    setForm((prev) => ({ ...prev, company: { ...prev.company, districtId: '' } }))
    if (!stateId) return
    try {
      const response = await getDistricts(stateId)
      setDistricts(response || [])
    } catch {
      setError('Failed to load districts')
    }
  }

  const handlePincodeChange = async (pincode) => {
    if (!/^\d{6}$/.test(String(pincode || '').trim())) {
      setPincodeOptions([])
      return
    }
    try {
      const response = await getPincodes(pincode)
      setPincodeOptions(response || [])
    } catch {
      setPincodeOptions([])
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      setServerValidationErrors({})
      await createCompanyWithUser(buildPayload(form))
      navigate('/company-creation')
    } catch (err) {
      const parsed = extractServerValidationErrors(err)
      setServerValidationErrors(parsed)
      setError(getFirstServerError(parsed) || err?.message || err?.error || 'Failed to create')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="mb-3">Create Company Registration</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={onSubmit}>
        <CompanyCreationForm
          form={form}
          setForm={setForm}
          includePassword
          roles={roles}
          states={states}
          districts={districts}
          pincodeOptions={pincodeOptions}
          onStateChange={handleStateChange}
          onPincodeChange={handlePincodeChange}
          serverValidationErrors={serverValidationErrors}
          clearServerError={clearServerError}
        />
        <div className="d-flex gap-2">
          <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</Button>
          <Button variant="secondary" onClick={() => navigate('/company-creation')}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}

export default CompanyCreationCreate
