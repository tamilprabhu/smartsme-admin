import { API_BASE_URL } from '../../config'
import { apiRequest, buildPagedUrl } from '../../api/httpClient'
import { ItemsPerPage, SortBy, SortOrder } from '../../constants/listing'

const API_ORIGIN = new URL(API_BASE_URL, window.location.origin).origin
const COMPANY_CREATION_API_URL = `${API_ORIGIN}/api/1.0.0/company-registrations`
const ROLE_API_URL = `${API_BASE_URL}/role`
const REFERENCE_API_URL = `${API_BASE_URL}/reference`

export const getCompanyCreationsWithUser = async (
  page = 1,
  limit = ItemsPerPage.TEN,
  search = '',
  sortBy = SortBy.SEQUENCE,
  sortOrder = SortOrder.DESC
) => {
  const url = buildPagedUrl({
    baseUrl: COMPANY_CREATION_API_URL,
    page,
    itemsPerPage: limit,
    search,
    sortBy,
    sortOrder
  })
  return apiRequest(url)
}

export const getCompanyCreationWithUser = async (companySequence) => {
  return apiRequest(`${COMPANY_CREATION_API_URL}/${companySequence}`)
}

export const createCompanyWithUser = async (payload) => {
  return apiRequest(COMPANY_CREATION_API_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export const updateCompanyWithUser = async (companySequence, payload) => {
  return apiRequest(`${COMPANY_CREATION_API_URL}/${companySequence}`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  })
}

export const deleteCompanyWithUser = async (companySequence) => {
  return apiRequest(`${COMPANY_CREATION_API_URL}/${companySequence}`, {
    method: 'DELETE'
  })
}

export const getRoles = async (
  page = 1,
  limit = ItemsPerPage.HUNDRED,
  search = '',
  sortBy = SortBy.SEQUENCE,
  sortOrder = SortOrder.DESC
) => {
  const url = buildPagedUrl({
    baseUrl: ROLE_API_URL,
    page,
    itemsPerPage: limit,
    search,
    sortBy,
    sortOrder
  })
  return apiRequest(url)
}

export const getStates = async () => {
  return apiRequest(`${REFERENCE_API_URL}/states`)
}

export const getDistricts = async (stateId) => {
  return apiRequest(`${REFERENCE_API_URL}/districts/${stateId}`)
}

export const getPincodes = async (pincode) => {
  return apiRequest(`${REFERENCE_API_URL}/pincodes?pincode=${encodeURIComponent(String(pincode || '').trim())}`)
}

// Backward-compatible aliases for current pages
export const listCompanyCreations = ({ page = 1, itemsPerPage = ItemsPerPage.TEN, search = '' }) =>
  getCompanyCreationsWithUser(page, itemsPerPage, search, SortBy.SEQUENCE, SortOrder.DESC)

export const getCompanyCreation = (id) => getCompanyCreationWithUser(id)
export const createCompanyCreation = (payload) => createCompanyWithUser(payload)
export const updateCompanyCreation = (id, payload) => updateCompanyWithUser(id, payload)
export const deleteCompanyCreation = (id) => deleteCompanyWithUser(id)
