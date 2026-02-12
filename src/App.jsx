import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AppNavbar from './components/Navbar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SessionModal from './components/SessionModal'
import { logout, refreshToken, getMe } from './store/authSlice'
import { SESSION_TIMEOUT } from './config'

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [showSessionModal, setShowSessionModal] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) return

    dispatch(getMe())

    const timer = setTimeout(() => {
      setShowSessionModal(true)
    }, SESSION_TIMEOUT)

    return () => clearTimeout(timer)
  }, [isAuthenticated, dispatch])

  const handleLogout = () => {
    dispatch(logout())
    setShowSessionModal(false)
  }

  const handleStayLoggedIn = async () => {
    try {
      await dispatch(refreshToken()).unwrap()
      await dispatch(getMe()).unwrap()
      setShowSessionModal(false)
      window.location.reload()
    } catch {
      handleLogout()
    }
  }

  if (isAuthenticated) {
    return (
      <>
        <Dashboard />
        <SessionModal 
          show={showSessionModal} 
          onStayLoggedIn={handleStayLoggedIn}
          onLogout={handleLogout}
        />
      </>
    )
  }

  return (
    <>
      <AppNavbar />
      <Login />
    </>
  )
}

export default App
