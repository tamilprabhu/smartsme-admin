import { Form, Row, Col } from 'react-bootstrap'

function CompanyCreationForm({
  form,
  setForm,
  readOnly = false,
  includePassword = false,
  roles = [],
  states = [],
  districts = [],
  pincodeOptions = [],
  onStateChange = () => {},
  onPincodeChange = () => {},
  serverValidationErrors = {},
  clearServerError = () => {}
}) {
  const hasServerError = (field) => (serverValidationErrors[field] || []).length > 0
  const getServerError = (field) => (serverValidationErrors[field] || [])[0] || ''

  const updateCompany = (field, value) => {
    clearServerError(field)
    setForm((prev) => ({ ...prev, company: { ...prev.company, [field]: value } }))
  }

  const updateUser = (field, value) => {
    clearServerError(field)
    setForm((prev) => ({ ...prev, user: { ...prev.user, [field]: value } }))
  }

  const updateRole = (field, value) => {
    clearServerError(field)
    setForm((prev) => ({ ...prev, roleUser: { ...prev.roleUser, [field]: value } }))
  }

  return (
    <>
      <h5 className="mb-3">Company</h5>
      <Row>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Company Name</Form.Label><Form.Control value={form.company.companyName} onChange={(e) => updateCompany('companyName', e.target.value)} disabled={readOnly} isInvalid={hasServerError('companyName')} /><Form.Control.Feedback type="invalid">{getServerError('companyName')}</Form.Control.Feedback></Form.Group></Col>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Company Type</Form.Label><Form.Select value={form.company.companyType} onChange={(e) => updateCompany('companyType', e.target.value)} disabled={readOnly}><option value="LARGE">LARGE</option><option value="MEDIUM">MEDIUM</option><option value="SMALL">SMALL</option></Form.Select></Form.Group></Col>
      </Row>
      <Row>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Business Constitution</Form.Label><Form.Control value={form.company.businessCons} onChange={(e) => updateCompany('businessCons', e.target.value)} disabled={readOnly} /></Form.Group></Col>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Nature Of Business</Form.Label><Form.Control value={form.company.natureOfBusiness} onChange={(e) => updateCompany('natureOfBusiness', e.target.value)} disabled={readOnly} /></Form.Group></Col>
      </Row>

      <Row>
        <Col md={4}><Form.Group className="mb-3"><Form.Label>State</Form.Label><Form.Select value={form.company.stateId || ''} onChange={(e) => { updateCompany('stateId', Number(e.target.value) || ''); onStateChange(Number(e.target.value) || null) }} disabled={readOnly}><option value="">Select State</option>{states.map((state) => <option key={state.id} value={state.id}>{state.stateName}</option>)}</Form.Select></Form.Group></Col>
        <Col md={4}><Form.Group className="mb-3"><Form.Label>District</Form.Label><Form.Select value={form.company.districtId || ''} onChange={(e) => updateCompany('districtId', Number(e.target.value) || '')} disabled={readOnly || !form.company.stateId}><option value="">Select District</option>{districts.map((district) => <option key={district.id} value={district.id}>{district.districtName}</option>)}</Form.Select></Form.Group></Col>
        <Col md={4}><Form.Group className="mb-3"><Form.Label>Pincode</Form.Label><Form.Control value={form.company.pincode} onChange={(e) => { updateCompany('pincode', e.target.value); onPincodeChange(e.target.value) }} disabled={readOnly} isInvalid={hasServerError('pincode')} /><Form.Control.Feedback type="invalid">{getServerError('pincode')}</Form.Control.Feedback>{pincodeOptions.length > 0 && <Form.Text className="text-muted">Matched post offices: {pincodeOptions.map((item) => item.postOfficeName).filter(Boolean).slice(0, 3).join(', ')}</Form.Text>}</Form.Group></Col>
      </Row>

      <Form.Group className="mb-3"><Form.Label>Address</Form.Label><Form.Control value={form.company.address} onChange={(e) => updateCompany('address', e.target.value)} disabled={readOnly} isInvalid={hasServerError('address')} /><Form.Control.Feedback type="invalid">{getServerError('address')}</Form.Control.Feedback></Form.Group>
      <Row>
        <Col md={4}><Form.Group className="mb-3"><Form.Label>Direct Phone</Form.Label><Form.Control value={form.company.directPhone} onChange={(e) => updateCompany('directPhone', e.target.value)} disabled={readOnly} /></Form.Group></Col>
        <Col md={4}><Form.Group className="mb-3"><Form.Label>Office Phone</Form.Label><Form.Control value={form.company.officePhone} onChange={(e) => updateCompany('officePhone', e.target.value)} disabled={readOnly} /></Form.Group></Col>
        <Col md={4}><Form.Group className="mb-3"><Form.Label>Management Phone</Form.Label><Form.Control value={form.company.mgmtPhone} onChange={(e) => updateCompany('mgmtPhone', e.target.value)} disabled={readOnly} /></Form.Group></Col>
      </Row>
      <Row>
        <Col md={4}><Form.Group className="mb-3"><Form.Label>Owner Name</Form.Label><Form.Control value={form.company.propName} onChange={(e) => updateCompany('propName', e.target.value)} disabled={readOnly} /></Form.Group></Col>
        <Col md={4}><Form.Group className="mb-3"><Form.Label>Authorized Person</Form.Label><Form.Control value={form.company.authPerson} onChange={(e) => updateCompany('authPerson', e.target.value)} disabled={readOnly} /></Form.Group></Col>
        <Col md={4}><Form.Group className="mb-3"><Form.Label>Company Mobile</Form.Label><Form.Control value={form.company.mobileNo} onChange={(e) => updateCompany('mobileNo', e.target.value)} disabled={readOnly} /></Form.Group></Col>
      </Row>
      <Row>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Company Mail</Form.Label><Form.Control value={form.company.mailId} onChange={(e) => updateCompany('mailId', e.target.value)} disabled={readOnly} /></Form.Group></Col>
      </Row>

      <h5 className="mb-3 mt-4">Admin User</h5>
      <Row>
        <Col md={4}><Form.Group className="mb-3"><Form.Label>Username</Form.Label><Form.Control value={form.user.username} onChange={(e) => updateUser('username', e.target.value)} disabled={readOnly} isInvalid={hasServerError('username')} /><Form.Control.Feedback type="invalid">{getServerError('username')}</Form.Control.Feedback></Form.Group></Col>
        <Col md={4}><Form.Group className="mb-3"><Form.Label>First Name</Form.Label><Form.Control value={form.user.firstName} onChange={(e) => updateUser('firstName', e.target.value)} disabled={readOnly} isInvalid={hasServerError('firstName')} /><Form.Control.Feedback type="invalid">{getServerError('firstName')}</Form.Control.Feedback></Form.Group></Col>
        <Col md={4}><Form.Group className="mb-3"><Form.Label>Last Name</Form.Label><Form.Control value={form.user.lastName} onChange={(e) => updateUser('lastName', e.target.value)} disabled={readOnly} isInvalid={hasServerError('lastName')} /><Form.Control.Feedback type="invalid">{getServerError('lastName')}</Form.Control.Feedback></Form.Group></Col>
      </Row>
      <Row>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Display Name</Form.Label><Form.Control value={form.user.name} onChange={(e) => updateUser('name', e.target.value)} disabled={readOnly} isInvalid={hasServerError('name')} /><Form.Control.Feedback type="invalid">{getServerError('name')}</Form.Control.Feedback></Form.Group></Col>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control value={form.user.email} onChange={(e) => updateUser('email', e.target.value)} disabled={readOnly} isInvalid={hasServerError('email')} /><Form.Control.Feedback type="invalid">{getServerError('email')}</Form.Control.Feedback></Form.Group></Col>
      </Row>
      <Row>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>Mobile</Form.Label><Form.Control value={form.user.mobile} onChange={(e) => updateUser('mobile', e.target.value)} disabled={readOnly} isInvalid={hasServerError('mobile')} /><Form.Control.Feedback type="invalid">{getServerError('mobile')}</Form.Control.Feedback></Form.Group></Col>
        <Col md={6}><Form.Group className="mb-3"><Form.Label>User Address</Form.Label><Form.Control value={form.user.address} onChange={(e) => updateUser('address', e.target.value)} disabled={readOnly} isInvalid={hasServerError('address')} /><Form.Control.Feedback type="invalid">{getServerError('address')}</Form.Control.Feedback></Form.Group></Col>
      </Row>
      {includePassword && (
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={form.user.password} onChange={(e) => updateUser('password', e.target.value)} disabled={readOnly} isInvalid={hasServerError('password')} />
          <Form.Control.Feedback type="invalid">{getServerError('password')}</Form.Control.Feedback>
        </Form.Group>
      )}

      <h5 className="mb-3 mt-4">Role</h5>
      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Select value={form.roleUser.roleId || ''} onChange={(e) => updateRole('roleId', Number(e.target.value) || '')} disabled={readOnly} isInvalid={hasServerError('roleId')}>
          <option value="">Select Role</option>
          {roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{getServerError('roleId')}</Form.Control.Feedback>
      </Form.Group>
    </>
  )
}

export default CompanyCreationForm
