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
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center mb-2">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-center text-muted">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi!
          </p>
        </Col>
      </Row>

      {showAlert && (
        <Alert variant="success" className="mb-4">
          Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
        </Alert>
      )}

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Gửi Tin Nhắn</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Họ và Tên *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Nhập họ và tên của bạn"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Nhập địa chỉ email"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Số Điện Thoại</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Nhập số điện thoại"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Chủ Đề *</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="Nhập chủ đề"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Nội Dung *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Nhập nội dung tin nhắn..."
                  />
                </Form.Group>

                <Button type="submit" variant="primary" size="lg">
                  Gửi Tin Nhắn
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">Thông Tin Liên Hệ</h5>
            </Card.Header>
            <Card.Body>
              <div className="contact-info">
                <div className="d-flex align-items-center mb-3">
                  <FaPhone className="text-primary me-3" size={20} />
                  <div>
                    <strong>Điện thoại</strong>
                    <br />
                    <span className="text-muted">1900 1234 (24/7)</span>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <FaEnvelope className="text-primary me-3" size={20} />
                  <div>
                    <strong>Email</strong>
                    <br />
                    <span className="text-muted">support@troviet.com</span>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <FaMapMarkerAlt className="text-primary me-3" size={20} />
                  <div>
                    <strong>Địa chỉ</strong>
                    <br />
                    <span className="text-muted">
                      123 Đường ABC, Quận 1<br />
                      TP. Hồ Chí Minh
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <FaClock className="text-primary me-3" size={20} />
                  <div>
                    <strong>Giờ làm việc</strong>
                    <br />
                    <span className="text-muted">
                      T2 - T6: 8:00 - 18:00
                      <br />
                      T7 - CN: 9:00 - 17:00
                    </span>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">Câu Hỏi Thường Gặp</h5>
            </Card.Header>
            <Card.Body>
              <div className="faq-section">
                <p>
                  <strong>Q: Làm sao để đăng tin cho thuê?</strong>
                </p>
                <p className="text-muted small">
                  A: Đăng ký tài khoản chủ trọ và sử dụng tính năng "Quản lý
                  phòng trọ"
                </p>

                <p>
                  <strong>Q: Phí dịch vụ là bao nhiêu?</strong>
                </p>
                <p className="text-muted small">
                  A: Chúng tôi miễn phí cho người tìm trọ, chỉ thu phí từ chủ
                  trọ
                </p>

                <p>
                  <strong>Q: Thông tin có được bảo mật?</strong>
                </p>
                <p className="text-muted small">
                  A: Có, chúng tôi cam kết bảo mật 100% thông tin khách hàng
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
