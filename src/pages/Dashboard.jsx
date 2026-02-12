import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import ProductList from './product/ProductList'
import ProductView from './product/ProductView'
import ProductCreate from './product/ProductCreate'
import ProductEdit from './product/ProductEdit'
import ChangePassword from './ChangePassword'
import EmptyPage from './EmptyPage'

function Dashboard() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <Routes>
          <Route path="/" element={<h1>Dashboard</h1>} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/product/create" element={<ProductCreate />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/product/:id/edit" element={<ProductEdit />} />
          <Route path="/buyer" element={<EmptyPage title="Buyer" />} />
          <Route path="/seller" element={<EmptyPage title="Seller" />} />
          <Route path="/employee" element={<EmptyPage title="Employee" />} />
          <Route path="/machine" element={<EmptyPage title="Machine" />} />
          <Route path="/production-shift" element={<EmptyPage title="Production Shift" />} />
          <Route path="/dispatch" element={<EmptyPage title="Dispatch" />} />
          <Route path="/stock" element={<EmptyPage title="Stock" />} />
          <Route path="/order" element={<EmptyPage title="Order" />} />
          <Route path="/invoice" element={<EmptyPage title="Invoice" />} />
          <Route path="/user" element={<EmptyPage title="User" />} />
          <Route path="/profile" element={<EmptyPage title="Profile" />} />
          <Route path="/settings" element={<ChangePassword />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard
