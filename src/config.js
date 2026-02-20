export const API_BASE_URL = import.meta.env.VITE_SMARTSME_API_BASE_URL
const parsedSessionTimeout = Number(import.meta.env.VITE_SMARTSME_SESSION_TIMEOUT)
export const SESSION_TIMEOUT = Number.isFinite(parsedSessionTimeout) && parsedSessionTimeout > 0
  ? parsedSessionTimeout
  : 3600000
export const BASE_PATH = import.meta.env.VITE_SMARTSME_BASE_PATH
