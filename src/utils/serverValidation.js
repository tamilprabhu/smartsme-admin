const normalizeMessages = (messages) => {
  if (Array.isArray(messages)) {
    return messages.map((m) => String(m).trim()).filter(Boolean)
  }
  if (typeof messages === 'string') {
    const trimmed = messages.trim()
    return trimmed ? [trimmed] : []
  }
  return []
}

export const extractServerValidationErrors = (errorResponse) => {
  const payload = errorResponse?.error || errorResponse || {}
  const rawErrors = payload?.errors

  if (!rawErrors) return {}

  if (Array.isArray(rawErrors)) {
    return rawErrors.reduce((acc, entry) => {
      const field = entry?.field
      const message = String(entry?.message || '').trim()
      if (!field || !message) return acc
      if (!acc[field]) acc[field] = []
      acc[field].push(message)
      return acc
    }, {})
  }

  if (typeof rawErrors === 'object') {
    return Object.entries(rawErrors).reduce((acc, [field, messages]) => {
      const normalized = normalizeMessages(messages)
      if (normalized.length) acc[field] = normalized
      return acc
    }, {})
  }

  return {}
}

export const getFirstServerError = (serverErrors) => {
  const firstField = Object.keys(serverErrors || {})[0]
  if (!firstField) return ''
  return serverErrors[firstField]?.[0] || ''
}
