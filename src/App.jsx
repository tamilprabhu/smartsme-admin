import { useState } from 'react'
import AppNavbar from './components/Navbar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  if (isLoggedIn) {
    return <Dashboard />
  }

  return (
    <>
      <AppNavbar />
      <Login />
    </>
  )
}

export default App
