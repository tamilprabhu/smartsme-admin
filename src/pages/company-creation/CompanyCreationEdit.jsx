import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Alert } from 'react-bootstrap'
import CompanyCreationForm from './CompanyCreationForm'
import {
  getCompanyCreationWithUser,
  updateCompanyWithUser,
  getRoles,
  getStates,
  getDistricts,
  getPincodes
} from './companyCreationApi'
import { clearValidationError, extractServerValidationErrors, getFirstServerError } from '../../utils/serverValidation'

const emptyForm = {
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
  const user = { ...form.user }
  if (!user.password) {
    delete user.password
  }

  return {
    company: {
      ...company,
      pincode: company.pincode ? String(company.pincode) : ''
    },
    user,
    roleUser: { ...form.roleUser }
  }
}

function CompanyCreationEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [roles, setRoles] = useState([])
  const [states, setStates] = useState([])
  const [districts, setDistricts] = useState([])
  const [pincodeOptions, setPincodeOptions] = useState([])
  const [serverValidationErrors, setServerValidationErrors] = useState({})

  useEffect(() => {
    const run = async () => {
      try {
        const [data, roleResponse, stateResponse] = await Promise.all([
          getCompanyCreationWithUser(id),
          getRoles(1, 100),
          getStates()
        ])

        const allRoles = roleResponse?.items || []
        const ownerRole = allRoles.find((role) => role?.name === 'OWNER')
        setRoles(ownerRole ? [ownerRole] : [])
        setStates(stateResponse || [])

        setForm({
          company: {
            companyName: data.companyName || '', businessCons: data.businessCons || 'CORPORATION', companyType: data.companyType || 'MEDIUM',
            address: data.address || '', pincode: data.pincode || '', propName: data.propName || '', directPhone: data.directPhone || '', officePhone: data.officePhone || '', mgmtPhone: data.mgmtPhone || '',
            mailId: data.mailId || '', natureOfBusiness: data.natureOfBusiness || 'MANUFACTURING', authPerson: data.authPerson || '', mobileNo: data.mobileNo || '',
            stateId: '', districtId: ''
          },
          user: {
            username: data.User?.username || '', firstName: data.User?.firstName || '', lastName: data.User?.lastName || '',
            name: data.User?.name || '', email: data.User?.email || '', mobile: data.User?.mobile || '', address: data.User?.address || '', password: ''
          },
          roleUser: { roleId: ownerRole?.id || '' }
        })

        if (/^\d{6}$/.test(String(data.pincode || '').trim())) {
          const pincodeResponse = await getPincodes(data.pincode)
          setPincodeOptions(pincodeResponse || [])
        }
      } catch (e) {
        setError(e?.message || e?.error || 'Failed to load')
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [id])

  const clearServerError = (field) => {
    clearValidationError(serverValidationErrors, setServerValidationErrors, field)
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
      setSaving(true)
      setError('')
      setServerValidationErrors({})
      await updateCompanyWithUser(id, buildPayload(form))
      navigate('/company-creation')
    } catch (err) {
      const parsed = extractServerValidationErrors(err)
      setServerValidationErrors(parsed)
      setError(getFirstServerError(parsed) || err?.message || err?.error || 'Failed to update')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1 className="mb-3">Edit Company Registration</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={onSubmit}>
        <CompanyCreationForm
          form={form}
          setForm={setForm}
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
          <Button type="submit" disabled={saving}>{saving ? 'Updating...' : 'Update'}</Button>
          <Button variant="secondary" onClick={() => navigate('/company-creation')}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}

export default CompanyCreationEdit
