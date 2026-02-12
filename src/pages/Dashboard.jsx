import Sidebar from '../components/Sidebar'

function Dashboard() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <h1>Dashboard</h1>
        <p>Welcome to the admin panel</p>
      </div>
    </div>
  )
}

export default Dashboard
