import { Collapse, Dropdown } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/authSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    company: false,
    production: false,
    inventory: false,
    account: false,
  });

  const toggleMenu = (menu) => {
    if (!collapsed) {
      setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 text-bg-dark ${collapsed ? "sidebar-collapsed" : ""}`}
      style={{
        width: collapsed ? "80px" : "280px",
        height: "100vh",
        transition: "width 0.3s",
      }}
    >
      <div className="d-flex align-items-center pb-3 mb-3 border-bottom">
        {!collapsed && (
          <Link to="/" className="text-white text-decoration-none flex-grow-1">
            <span className="fs-5 fw-semibold">SmartSME Admin</span>
          </Link>
        )}
        <button
          className="btn btn-sm btn-dark ms-auto"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand" : "Collapse"}
        >
          <i className={`bi ${collapsed ? "bi-list" : "bi-x-lg"}`}></i>
        </button>
      </div>
      <div style={{ overflowY: "auto", flex: 1 }}>
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 text-white w-100"
              onClick={() => toggleMenu("company")}
              title="Company"
            >
              <i className="bi bi-building me-2"></i>
              {!collapsed && "Company"}
            </button>
            {!collapsed && (
              <Collapse in={openMenus.company}>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-3">
                  <li>
                    <Link
                      to="/userCreation"
                      className="link-light d-inline-flex text-decoration-none rounded py-1"
                    >
                      User Creation
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/buyer"
                      className="link-light d-inline-flex text-decoration-none rounded py-1"
                    >
                      Buyer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/seller"
                      className="link-light d-inline-flex text-decoration-none rounded py-1"
                    >
                      Seller
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/employee"
                      className="link-light d-inline-flex text-decoration-none rounded py-1"
                    >
                      Employee
                    </Link>
                  </li>
                </ul>
              </Collapse>
            )}
          </li>
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 text-white w-100"
              onClick={() => toggleMenu("production")}
              title="Production"
            >
              <i className="bi bi-gear-fill me-2"></i>
              {!collapsed && "Production"}
            </button>
            {!collapsed && (
              <Collapse in={openMenus.production}>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-3">
                  <li>
                    <Link
                      to="/machine"
                      className="link-light d-inline-flex text-decoration-none rounded py-1"
                    >
                      Machine
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/production-shift"
                      className="link-light d-inline-flex text-decoration-none rounded py-1"
                    >
                      Production Shift
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dispatch"
                      className="link-light d-inline-flex text-decoration-none rounded py-1"
                    >
                      Dispatch
                    </Link>
                  </li>
                </ul>
              </Collapse>
            )}
          </li>
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 text-white w-100"
              onClick={() => toggleMenu("inventory")}
              title="Inventory"
            >
              <i className="bi bi-box-seam me-2"></i>
              {!collapsed && "Inventory"}
            </button>
            {!collapsed && (
              <Collapse in={openMenus.inventory}>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-3">
                  <li>
                    <Link
                      to="/product"
                      className="link-light d-inline-flex text-decoration-none rounded py-1"
                    >
                      Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/stock"
                      className="link-light d-inline-flex text-decoration-none rounded py-1"
                    >
                      Stock
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/order"
                      className="link-light d-inline-flex text-decoration-none rounded py-1"
                    >
                      Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/invoice"
                      className="link-light d-inline-flex text-decoration-none rounded py-1"
                    >
                      Invoice
                    </Link>
                  </li>
                </ul>
              </Collapse>
            )}
          </li>
          <li className="border-top my-3"></li>
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 text-white w-100"
              onClick={() => toggleMenu("account")}
              title="Account"
            >
              <i className="bi bi-person-circle me-2"></i>
              {!collapsed && "Account"}
            </button>
            {!collapsed && (
              <Collapse in={openMenus.account}>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ps-3">
                  <li>
                    <Link
                      to="/user"
                      className="link-light d-inline-flex text-decoration-none rounded py-1"
                    >
                      User
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="link-light d-inline-flex text-decoration-none rounded py-1"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="link-light d-inline-flex text-decoration-none rounded py-1"
                    >
                      Settings
                    </Link>
                  </li>
                </ul>
              </Collapse>
            )}
          </li>
        </ul>
      </div>
      <div className="border-top pt-3">
        {collapsed ? (
          <button
            className="btn btn-link text-white p-0"
            onClick={handleLogout}
            title="Sign out"
          >
            <div
              className="bg-secondary rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "32px", height: "32px" }}
            >
              <span className="text-white fw-bold">
                {user?.firstName?.[0] || "U"}
              </span>
            </div>
          </button>
        ) : (
          <Dropdown drop="up">
            <Dropdown.Toggle
              variant="link"
              className="d-flex align-items-center text-white text-decoration-none w-100"
              id="dropdown-user"
            >
              <div
                className="bg-secondary rounded-circle me-2 d-flex align-items-center justify-content-center"
                style={{ width: "32px", height: "32px" }}
              >
                <span className="text-white fw-bold">
                  {user?.firstName?.[0] || "U"}
                </span>
              </div>
              <strong>{user?.name || "User"}</strong>
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item as={Link} to="/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/settings">
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
