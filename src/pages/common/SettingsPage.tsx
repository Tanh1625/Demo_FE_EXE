import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { FaCheckCircle, FaComment, FaEnvelope, FaKey } from "react-icons/fa";
import type { FeedbackData, PasswordChange } from "../../types/User";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("password");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<"success" | "danger">(
    "success"
  );

  // Password change form
  const [passwordForm, setPasswordForm] = useState<PasswordChange>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Email verification
  const [email, setEmail] = useState("user@example.com");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  // Feedback form
  const [feedbackForm, setFeedbackForm] = useState<FeedbackData>({
    rating: 5,
    comment: "",
    category: "platform",
  });

  const handlePasswordChange = (field: keyof PasswordChange, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitPasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setAlertVariant("danger");
      setAlertMessage("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      setShowAlert(true);
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setAlertVariant("danger");
      setAlertMessage("Mật khẩu mới phải có ít nhất 6 ký tự!");
      setShowAlert(true);
      return;
    }

    console.log("Change password:", passwordForm);
    setAlertVariant("success");
    setAlertMessage("Đổi mật khẩu thành công!");
    setShowAlert(true);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleSendVerificationCode = () => {
    console.log("Sending verification code to:", email);
    setAlertVariant("success");
    setAlertMessage("Mã xác thực đã được gửi đến email của bạn!");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleVerifyEmail = () => {
    if (verificationCode === "123456") {
      // Mock verification
      setIsEmailVerified(true);
      setAlertVariant("success");
      setAlertMessage("Xác thực email thành công!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      setAlertVariant("danger");
      setAlertMessage("Mã xác thực không đúng!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleFeedbackChange = (field: keyof FeedbackData, value: any) => {
    setFeedbackForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback:", feedbackForm);
    setAlertVariant("success");
    setAlertMessage("Cảm ơn bạn đã gửi phản hồi!");
    setShowAlert(true);
    setFeedbackForm({
      rating: 5,
      comment: "",
      category: "platform",
    });
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Cài đặt tài khoản</h2>

      {showAlert && (
        <Alert
          variant={alertVariant}
          dismissible
          onClose={() => setShowAlert(false)}
          className="mb-4"
        >
          {alertMessage}
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Body>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || "password")}
            className="mb-4"
          >
            {/* Password Change Tab */}
            <Tab
              eventKey="password"
              title={
                <>
                  <FaKey className="me-2" />
                  Đổi mật khẩu
                </>
              }
            >
              <Form onSubmit={handleSubmitPasswordChange}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mật khẩu hiện tại *</Form.Label>
                      <Form.Control
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                          handlePasswordChange(
                            "currentPassword",
                            e.target.value
                          )
                        }
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Mật khẩu mới *</Form.Label>
                      <Form.Control
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          handlePasswordChange("newPassword", e.target.value)
                        }
                        required
                        minLength={6}
                      />
                      <Form.Text className="text-muted">
                        Mật khẩu phải có ít nhất 6 ký tự
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Xác nhận mật khẩu mới *</Form.Label>
                      <Form.Control
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          handlePasswordChange(
                            "confirmPassword",
                            e.target.value
                          )
                        }
                        required
                      />
                    </Form.Group>

                    <Button type="submit" variant="primary">
                      Đổi mật khẩu
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Tab>

            {/* Email Verification Tab */}
            <Tab
              eventKey="email"
              title={
                <>
                  <FaEnvelope className="me-2" />
                  Liên kết Email
                </>
              }
            >
              <Row>
                <Col md={6}>
                  {isEmailVerified ? (
                    <Alert variant="success">
                      <FaCheckCircle className="me-2" />
                      Email của bạn đã được xác thực!
                    </Alert>
                  ) : (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>Địa chỉ email</Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          readOnly
                        />
                      </Form.Group>

                      <Button
                        variant="outline-primary"
                        className="mb-3"
                        onClick={handleSendVerificationCode}
                      >
                        Gửi mã xác thực
                      </Button>

                      <Form.Group className="mb-3">
                        <Form.Label>Nhập mã xác thực</Form.Label>
                        <Form.Control
                          type="text"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="Nhập mã 6 số"
                        />
                        <Form.Text className="text-muted">
                          (Dùng mã: 123456 để test)
                        </Form.Text>
                      </Form.Group>

                      <Button variant="primary" onClick={handleVerifyEmail}>
                        Xác thực Email
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
            </Tab>

            {/* Feedback Tab */}
            <Tab
              eventKey="feedback"
              title={
                <>
                  <FaComment className="me-2" />
                  Phản hồi
                </>
              }
            >
              <Form onSubmit={handleSubmitFeedback}>
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Danh mục</Form.Label>
                      <Form.Select
                        value={feedbackForm.category}
                        onChange={(e) =>
                          handleFeedbackChange(
                            "category",
                            e.target.value as FeedbackData["category"]
                          )
                        }
                      >
                        <option value="platform">Nền tảng</option>
                        <option value="room">Phòng trọ</option>
                        <option value="landlord">Chủ trọ</option>
                        <option value="service">Dịch vụ</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Đánh giá</Form.Label>
                      <Form.Select
                        value={feedbackForm.rating}
                        onChange={(e) =>
                          handleFeedbackChange("rating", Number(e.target.value))
                        }
                      >
                        <option value="5">⭐⭐⭐⭐⭐ Rất tốt</option>
                        <option value="4">⭐⭐⭐⭐ Tốt</option>
                        <option value="3">⭐⭐⭐ Trung bình</option>
                        <option value="2">⭐⭐ Kém</option>
                        <option value="1">⭐ Rất kém</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Nội dung phản hồi *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        value={feedbackForm.comment}
                        onChange={(e) =>
                          handleFeedbackChange("comment", e.target.value)
                        }
                        placeholder="Nhập ý kiến của bạn..."
                        required
                      />
                    </Form.Group>

                    <Button type="submit" variant="primary">
                      Gửi phản hồi
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SettingsPage;
