export const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken')
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

const parseJsonSafely = async (response) => {
  try {
    return await response.json()
  } catch {
    return null
  }
}

export const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {})
    }
  })

  if (!response.ok) {
    const errorPayload = await parseJsonSafely(response)
    throw errorPayload || { status: response.status, message: 'Request failed' }
  }

  if (response.status === 204) {
    return null
  }

  return parseJsonSafely(response)
}

export const buildPagedUrl = ({ baseUrl, page, itemsPerPage, search, sortBy, sortOrder }) => {
  let url = `${baseUrl}?page=${page}&itemsPerPage=${itemsPerPage}`

  if (search && String(search).trim()) {
    url += `&search=${encodeURIComponent(String(search).trim())}`
  }

  if (sortBy) {
    url += `&sortBy=${encodeURIComponent(sortBy)}`
  }

  if (sortOrder) {
    url += `&sortOrder=${encodeURIComponent(sortOrder)}`
  }

  return url
}
