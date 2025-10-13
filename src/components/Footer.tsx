import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <h5 className="fw-bold mb-3">
              <FaMapMarkerAlt className="me-2 text-primary" />
              PhòngTrọ.VN
            </h5>
            <p className="text-muted">
              Nền tảng tìm kiếm và quản lý phòng trọ hàng đầu Việt Nam. Kết nối
              người thuê và chủ trọ một cách nhanh chóng, an toàn.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-light">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-light">
                <FaTwitter size={24} />
              </a>
            </div>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Dành cho khách thuê</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/search" className="text-muted text-decoration-none">
                  Tìm phòng trọ
                </a>
              </li>
              <li>
                <a href="/services" className="text-muted text-decoration-none">
                  Dịch vụ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Hướng dẫn thuê
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Bảo hiểm
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Dành cho chủ trọ</h6>
            <ul className="list-unstyled">
              <li>
                <a
                  href="/dashboard"
                  className="text-muted text-decoration-none"
                >
                  Quản lý trọ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Đăng tin miễn phí
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Hướng dẫn cho thuê
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Báo cáo thống kê
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Liên hệ</h6>
            <div className="d-flex align-items-center mb-2">
              <FaPhone className="me-2 text-primary" />
              <span className="text-muted">1900-1234</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaEnvelope className="me-2 text-primary" />
              <span className="text-muted">support@phongtro.vn</span>
            </div>
            <div className="d-flex align-items-start">
              <FaMapMarkerAlt className="me-2 text-primary mt-1" />
              <span className="text-muted">
                Tầng 10, Tòa nhà ABC
                <br />
                123 Nguyễn Huệ, Q1, TP.HCM
              </span>
            </div>
          </Col>
        </Row>

        <hr className="my-4" />

        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-muted mb-0">
              © 2024 PhòngTrọ.VN. Tất cả quyền được bảo lưu.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <span className="text-muted">
              <a href="#" className="text-muted text-decoration-none me-3">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-muted text-decoration-none me-3">
                Điều khoản sử dụng
              </a>
              <a href="#" className="text-muted text-decoration-none">
                Hỗ trợ
              </a>
            </span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
