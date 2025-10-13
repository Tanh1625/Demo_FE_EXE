import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { FaBuilding, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { RegisterData } from "../../types/User";

const RegisterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"seeker" | "landlord">("seeker");
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "seeker",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleTabChange = (tab: string | null) => {
    if (tab === "seeker" || tab === "landlord") {
      setActiveTab(tab);
      setFormData((prev) => ({ ...prev, role: tab }));
    }
  };

  const handleInputChange = (
    field: keyof RegisterData | "confirmPassword",
    value: string
  ) => {
    if (field === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError("Đã xảy ra lỗi trong quá trình đăng ký");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="success" className="text-center">
              <h4>Đăng ký thành công!</h4>
              <p>
                Tài khoản của bạn đã được tạo. Đang chuyển hướng đến trang đăng
                nhập...
              </p>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-primary">Đăng ký tài khoản</h3>
                <p className="text-muted">Tham gia cộng đồng TroViet</p>
              </div>

              <Tabs
                activeKey={activeTab}
                onSelect={handleTabChange}
                className="mb-4"
                fill
              >
                <Tab
                  eventKey="seeker"
                  title={
                    <div className="d-flex align-items-center justify-content-center">
                      <FaUser className="me-2" />
                      Người thuê trọ
                    </div>
                  }
                >
                  <div className="text-center mb-3">
                    <small className="text-muted">
                      Dành cho người đang tìm kiếm phòng trọ
                    </small>
                  </div>
                </Tab>
                <Tab
                  eventKey="landlord"
                  title={
                    <div className="d-flex align-items-center justify-content-center">
                      <FaBuilding className="me-2" />
                      Chủ trọ
                    </div>
                  }
                >
                  <div className="text-center mb-3">
                    <small className="text-muted">
                      Dành cho người có phòng trọ cho thuê
                    </small>
                  </div>
                </Tab>
              </Tabs>

              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên *</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Nhập họ và tên đầy đủ"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      required
                      className="pe-5"
                    />
                    <FaUser className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="email"
                      placeholder="Nhập địa chỉ email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                      className="pe-5"
                    />
                    <FaEnvelope className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="pe-5"
                    />
                    <FaPhone className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                  </div>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mật khẩu *</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Tối thiểu 6 ký tự"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Xác nhận mật khẩu *</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {activeTab === "landlord" && (
                  <Alert variant="info" className="mb-3">
                    <small>
                      <strong>Lưu ý cho chủ trọ:</strong> Sau khi đăng ký thành
                      công, bạn sẽ có thể đăng tin cho thuê và quản lý phòng trọ
                      của mình.
                    </small>
                  </Alert>
                )}

                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    label={
                      <span>
                        Tôi đồng ý với{" "}
                        <a href="#" className="text-decoration-none">
                          Điều khoản sử dụng
                        </a>{" "}
                        và{" "}
                        <a href="#" className="text-decoration-none">
                          Chính sách bảo mật
                        </a>
                      </span>
                    }
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mb-3"
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Đang đăng ký...
                    </>
                  ) : (
                    `Đăng ký làm ${
                      activeTab === "seeker" ? "Người thuê trọ" : "Chủ trọ"
                    }`
                  )}
                </Button>
              </Form>

              <div className="text-center">
                <small className="text-muted">
                  Đã có tài khoản?{" "}
                  <a href="/login" className="text-decoration-none">
                    Đăng nhập ngay
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

export default RegisterPage;
