import { Collapse, Dropdown } from 'react-bootstrap'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'

function Sidebar() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [openMenus, setOpenMenus] = useState({
    company: false,
    production: false,
    inventory: false,
    account: false
  })

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '280px', height: '100vh' }}>
      <a href="/" className="d-flex align-items-center pb-3 mb-3 text-white text-decoration-none border-bottom">
        <span className="fs-5 fw-semibold">SmartSME Admin</span>
      </a>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 text-white" onClick={() => toggleMenu('company')}>
              Company
            </button>
            <Collapse in={openMenus.company}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-3">
                <li><a href="#" className="link-light d-inline-flex text-decoration-none rounded py-1">Buyer</a></li>
                <li><a href="#" className="link-light d-inline-flex text-decoration-none rounded py-1">Seller</a></li>
                <li><a href="#" className="link-light d-inline-flex text-decoration-none rounded py-1">Employee</a></li>
              </ul>
            </Collapse>
          </li>
          <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 text-white" onClick={() => toggleMenu('production')}>
              Production
            </button>
            <Collapse in={openMenus.production}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-3">
                <li><a href="#" className="link-light d-inline-flex text-decoration-none rounded py-1">Machine</a></li>
                <li><a href="#" className="link-light d-inline-flex text-decoration-none rounded py-1">Production Shift</a></li>
                <li><a href="#" className="link-light d-inline-flex text-decoration-none rounded py-1">Dispatch</a></li>
              </ul>
            </Collapse>
          </li>
          <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 text-white" onClick={() => toggleMenu('inventory')}>
              Inventory
            </button>
            <Collapse in={openMenus.inventory}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-3">
                <li><a href="#" className="link-light d-inline-flex text-decoration-none rounded py-1">Product</a></li>
                <li><a href="#" className="link-light d-inline-flex text-decoration-none rounded py-1">Stock</a></li>
                <li><a href="#" className="link-light d-inline-flex text-decoration-none rounded py-1">Order</a></li>
                <li><a href="#" className="link-light d-inline-flex text-decoration-none rounded py-1">Invoice</a></li>
              </ul>
            </Collapse>
          </li>
          <li className="border-top my-3"></li>
          <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 text-white" onClick={() => toggleMenu('account')}>
              Account
            </button>
            <Collapse in={openMenus.account}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-3">
                <li><a href="#" className="link-light d-inline-flex text-decoration-none rounded py-1">User</a></li>
                <li><a href="#" className="link-light d-inline-flex text-decoration-none rounded py-1">Profile</a></li>
                <li><a href="#" className="link-light d-inline-flex text-decoration-none rounded py-1">Settings</a></li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </div>
      <div className="border-top pt-3">
        <Dropdown drop="up">
          <Dropdown.Toggle variant="link" className="d-flex align-items-center text-white text-decoration-none w-100" id="dropdown-user">
            <div className="bg-secondary rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
              <span className="text-white fw-bold">{user?.firstName?.[0] || 'U'}</span>
            </div>
            <strong>{user?.name || 'User'}</strong>
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            <Dropdown.Item href="#">Profile</Dropdown.Item>
            <Dropdown.Item href="#">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export default Sidebar
