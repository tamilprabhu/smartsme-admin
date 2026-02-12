import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppNavbar from './components/Navbar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SessionModal from './components/SessionModal'
import { logout, refreshToken, getMe } from './store/authSlice'
import { SESSION_TIMEOUT } from './config'

// Guest pages
import Home from './pages/guest/Home'
import About from './pages/guest/About'
import Contact from './pages/guest/Contact'

// Protected pages
import ProductList from './pages/product/ProductList'
import ProductView from './pages/product/ProductView'
import ProductCreate from './pages/product/ProductCreate'
import ProductEdit from './pages/product/ProductEdit'
import EmptyPage from './pages/EmptyPage'

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
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
