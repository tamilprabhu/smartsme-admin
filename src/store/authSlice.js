import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_BASE_URL } from '../config'
import { apiRequest } from '../services/api';

export const login = createAsyncThunk('auth/login', async ({ identifier, password }) => {
  const endpoint = `/auth/login`;
  const response = await apiRequest(endpoint,"POST",{ identifier, password });
  // const response = await fetch(`${API_BASE_URL}/auth/login`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ identifier, password })
  // })
  if (!response.ok) throw new Error('Login failed')
  const data = await response.json()
  localStorage.setItem('accessToken', data.accessToken)
  localStorage.setItem('refreshToken', data.refreshToken)
  return data
})

export const refreshToken = createAsyncThunk('auth/refresh', async () => {
  const endpoint = `/auth/refresh`;
  const token = localStorage.getItem('refreshToken')
  const response = await apiRequest(endpoint,"POST",{ refreshToken: token });
  // const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ refreshToken: token })
  // })
  if (!response.ok) throw new Error('Refresh failed')
  const data = await response.json()
  localStorage.setItem('accessToken', data.accessToken)
  return data
})

export const getMe = createAsyncThunk('auth/me', async () => {
  const endpoint = `/auth/me`;
  const response = await apiRequest(endpoint);
  // const token = localStorage.getItem('accessToken')
  // const response = await fetch(`${API_BASE_URL}/auth/me`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // })
  if (!response.ok) throw new Error('Failed to get user')
  return response.json()
})

export const logout = createAsyncThunk('auth/logout', async () => {
  const endpoint = `/auth/logout`;
  await apiRequest(endpoint,"POST");
  // const token = localStorage.getItem('accessToken')
  // await fetch(`${API_BASE_URL}/auth/logout`, {
  //   method: 'POST',
  //   headers: { 'Authorization': `Bearer ${token}` }
  // })
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.isAuthenticated = true
      })
  }
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
