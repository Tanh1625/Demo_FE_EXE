import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login({
        email: formData.email,
        password: formData.password,
      });

      if (success) {
        // Redirect to intended page or dashboard/home based on role
        if (formData.email === "admin@demo.com") {
          navigate("/dashboard");
        } else {
          navigate(from);
        }
      } else {
        setError("Email hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      setError("Đã xảy ra lỗi trong quá trình đăng nhập");
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (role: "landlord" | "seeker") => {
    if (role === "landlord") {
      setFormData({
        email: "landlord@demo.com",
        password: "password",
      });
    } else {
      setFormData({
        email: "seeker@demo.com",
        password: "password",
      });
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-primary">Đăng nhập</h3>
                <p className="text-muted">Chào mừng trở lại TroViet</p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="email"
                      placeholder="Nhập email của bạn"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                      className="pe-5"
                    />
                    <FaUser className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Mật khẩu</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      required
                      className="pe-5"
                    />
                    <Button
                      variant="link"
                      className="position-absolute top-50 end-0 translate-middle-y p-0 me-3 text-muted"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Đang đăng nhập...
                    </>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </Form>

              <hr />

              <div className="text-center">
                <p className="text-muted mb-2">
                  <small>Demo - Sử dụng tài khoản mẫu:</small>
                </p>
                <div className="d-grid gap-2">
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => fillDemoCredentials("landlord")}
                  >
                    Chủ trọ Demo
                  </Button>
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => fillDemoCredentials("seeker")}
                  >
                    Người thuê Demo
                  </Button>
                </div>
              </div>

              <div className="text-center mt-4">
                <small className="text-muted">
                  Chưa có tài khoản?{" "}
                  <a href="/register" className="text-decoration-none">
                    Đăng ký ngay
                  </a>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
