import type { ReactNode } from "react";
import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import {
  FaBuilding,
  FaCogs,
  FaFileInvoiceDollar,
  FaHome,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ChatBox from "../components/ChatBox";

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout, isLandlord, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if not landlord or admin
  React.useEffect(() => {
    if (user && !isLandlord && !isAdmin) {
      navigate("/");
    }
  }, [user, isLandlord, isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  if (!user || (!isLandlord && !isAdmin)) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column vh-100">
      {/* Top Header */}
      <Navbar bg="white" className="shadow-sm border-bottom">
        <Container fluid>
          <Navbar.Brand className="fw-bold text-primary">
            <FaHome className="me-2" />
            TroViet - Quản lý
          </Navbar.Brand>

          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className="d-flex align-items-center me-3"
            >
              <FaHome className="me-1" />
              Về trang chủ
            </Nav.Link>
            <Nav.Link className="d-flex align-items-center me-3">
              <FaUser className="me-1" />
              {user.name}
            </Nav.Link>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleLogout}
              className="d-flex align-items-center"
            >
              <FaSignOutAlt className="me-1" />
              Đăng xuất
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <div className="flex-grow-1 d-flex">
        {/* Sidebar */}
        <div
          className="bg-light border-end"
          style={{ width: "250px", minHeight: "100%" }}
        >
          <Nav className="flex-column p-3">
            {/* Landlord Menu */}
            {isLandlord && (
              <>
                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  className={`d-flex align-items-center mb-2 ${
                    isActiveRoute("/dashboard") ? "bg-primary text-white" : ""
                  } rounded`}
                >
                  <FaTachometerAlt className="me-2" />
                  Tổng quan
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/dashboard/rooms"
                  className={`d-flex align-items-center mb-2 ${
                    isActiveRoute("/dashboard/rooms")
                      ? "bg-primary text-white"
                      : ""
                  } rounded`}
                >
                  <FaBuilding className="me-2" />
                  Quản lý phòng
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/dashboard/hostels"
                  className={`d-flex align-items-center mb-2 ${
                    isActiveRoute("/dashboard/hostels")
                      ? "bg-primary text-white"
                      : ""
                  } rounded`}
                >
                  <FaHome className="me-2" />
                  Quản lý dãy trọ
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/dashboard/billing"
                  className={`d-flex align-items-center mb-2 ${
                    isActiveRoute("/dashboard/billing")
                      ? "bg-primary text-white"
                      : ""
                  } rounded`}
                >
                  <FaFileInvoiceDollar className="me-2" />
                  Thu chi
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/dashboard/services"
                  className={`d-flex align-items-center mb-2 ${
                    isActiveRoute("/dashboard/services")
                      ? "bg-primary text-white"
                      : ""
                  } rounded`}
                >
                  <FaCogs className="me-2" />
                  Dịch vụ
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/dashboard/tenants"
                  className={`d-flex align-items-center mb-2 ${
                    isActiveRoute("/dashboard/tenants")
                      ? "bg-primary text-white"
                      : ""
                  } rounded`}
                >
                  <FaUsers className="me-2" />
                  Khách thuê
                </Nav.Link>
              </>
            )}

            {/* Admin Menu */}
            {isAdmin && (
              <>
                <Nav.Link
                  as={Link}
                  to="/admin"
                  className={`d-flex align-items-center mb-2 ${
                    isActiveRoute("/admin") ? "bg-primary text-white" : ""
                  } rounded`}
                >
                  <FaTachometerAlt className="me-2" />
                  Dashboard
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/admin/users"
                  className={`d-flex align-items-center mb-2 ${
                    isActiveRoute("/admin/users") ? "bg-primary text-white" : ""
                  } rounded`}
                >
                  <FaUsers className="me-2" />
                  Quản lý người dùng
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/admin/posts"
                  className={`d-flex align-items-center mb-2 ${
                    isActiveRoute("/admin/posts") ? "bg-primary text-white" : ""
                  } rounded`}
                >
                  <FaBuilding className="me-2" />
                  Duyệt bài đăng
                </Nav.Link>
              </>
            )}
          </Nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 overflow-auto">
          <Container fluid className="p-4">
            {children || <Outlet />}
          </Container>
        </div>
      </div>

      {/* ChatBox */}
      <ChatBox />
    </div>
  );
};

export default DashboardLayout;
