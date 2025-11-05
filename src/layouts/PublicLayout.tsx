import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import {
  FaCog,
  FaEnvelope,
  FaHome,
  FaKey,
  FaSearch,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PublicLayoutProps {
  children?: ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ẩn header khi cuộn xuống, hiện khi cuộn lên
      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <Navbar
        bg="white"
        expand="lg"
        className="shadow-sm sticky-top"
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: isHeaderVisible ? "translateY(0)" : "translateY(-100%)",
          top: 0,
          zIndex: 1030,
        }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
            <FaHome className="me-2" />
            TroViet
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/search"
                className="d-flex align-items-center"
              >
                <FaSearch className="me-1" />
                Tìm trọ
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/services"
                className="d-flex align-items-center"
              >
                <FaCog className="me-1" />
                Dịch vụ
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                className="d-flex align-items-center"
              >
                <FaHome className="me-1" />
                Giới thiệu
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact"
                className="d-flex align-items-center"
              >
                <FaEnvelope className="me-1" />
                Liên hệ
              </Nav.Link>
            </Nav>

            <Nav className="ms-auto">
              {isAuthenticated ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/profile"
                    className="d-flex align-items-center"
                  >
                    <FaUser className="me-1" />
                    {user?.name}
                  </Nav.Link>
                  {user?.role === "seeker" && (
                    <Nav.Link
                      as={Link}
                      to="/my-rental"
                      className="d-flex align-items-center"
                    >
                      <FaKey className="me-1" />
                      Trọ của tôi
                    </Nav.Link>
                  )}
                  {user?.role === "landlord" && (
                    <Nav.Link
                      as={Link}
                      to="/dashboard"
                      className="d-flex align-items-center"
                    >
                      Quản lý
                    </Nav.Link>
                  )}
                  <Nav.Link
                    onClick={handleLogout}
                    className="d-flex align-items-center cursor-pointer"
                  >
                    <FaSignOutAlt className="me-1" />
                    Đăng xuất
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate("/login")}
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate("/register")}
                  >
                    Đăng ký
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="flex-grow-1">{children || <Outlet />}</main>

      <footer className="bg-dark text-light py-4 mt-5">
        <Container>
          <div className="row">
            <div className="col-md-6">
              <h5>TroViet</h5>
              <p className="text-muted">
                Nền tảng tìm kiếm và quản lý trọ hàng đầu Việt Nam
              </p>
            </div>
            <div className="col-md-3">
              <h6>Liên kết</h6>
              <ul className="list-unstyled">
                <li>
                  <Link
                    to="/search"
                    className="text-light text-decoration-none"
                  >
                    Tìm trọ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-light text-decoration-none"
                  >
                    Dịch vụ
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-light text-decoration-none">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-light text-decoration-none"
                  >
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6>Hỗ trợ</h6>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="tel:+84123456789"
                    className="text-light text-decoration-none"
                  >
                    Hotline: 0123 456 789
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@troviet.com"
                    className="text-light text-decoration-none"
                  >
                    Email: support@troviet.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-3" />
          <div className="text-center">
            <small className="text-muted">
              © 2024 TroViet. Tất cả quyền được bảo lưu.
            </small>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default PublicLayout;
