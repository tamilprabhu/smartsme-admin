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

const normalizeFieldName = (field) => String(field || '').trim()

const pushFieldError = (acc, field, message) => {
  const normalizedField = normalizeFieldName(field)
  const normalizedMessage = String(message || '').trim()
  if (!normalizedField || !normalizedMessage) return
  if (!acc[normalizedField]) acc[normalizedField] = []
  acc[normalizedField].push(normalizedMessage)
}

export const extractServerValidationErrors = (errorResponse) => {
  const payload = errorResponse?.error || errorResponse || {}
  const rawErrors = payload?.errors || payload?.validationErrors

  if (!rawErrors) return {}

  if (Array.isArray(rawErrors)) {
    return rawErrors.reduce((acc, entry) => {
      if (entry && typeof entry === 'object') {
        pushFieldError(acc, entry?.field, entry?.message)
      }
      return acc
    }, {})
  }

  if (typeof rawErrors === 'object') {
    return Object.entries(rawErrors).reduce((acc, [field, messages]) => {
      const normalizedField = normalizeFieldName(field)
      if (!normalizedField) return acc
      const normalized = normalizeMessages(messages)
      if (normalized.length) acc[normalizedField] = normalized
      return acc
    }, {})
  }

  return {}
}

export const getFirstServerError = (serverErrors) => {
  const firstField = Object.keys(serverErrors || {}).find(
    (field) => Array.isArray(serverErrors[field]) && serverErrors[field].length > 0
  )
  if (!firstField) return ''
  return serverErrors[firstField]?.[0] || ''
}

export const hasValidationError = (validationErrors, fieldOrFields) => {
  const fields = Array.isArray(fieldOrFields) ? fieldOrFields : [fieldOrFields]
  return fields.some((field) => (validationErrors?.[field] || []).length > 0)
}

export const getValidationError = (validationErrors, fieldOrFields) => {
  const fields = Array.isArray(fieldOrFields) ? fieldOrFields : [fieldOrFields]
  for (const field of fields) {
    const messages = validationErrors?.[field] || []
    if (messages.length > 0) return messages.join(' ')
  }
  return ''
}

export const clearValidationError = (validationErrors, setValidationErrors, fieldOrFields) => {
  const fields = Array.isArray(fieldOrFields) ? fieldOrFields : [fieldOrFields]
  const hasAny = fields.some((field) => validationErrors?.[field])
  if (!hasAny) return

  const next = { ...(validationErrors || {}) }
  fields.forEach((field) => {
    delete next[field]
  })
  setValidationErrors(next)
}
