import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaExclamationTriangle, FaHome, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 text-center">
            <Card.Body className="py-5">
              <div className="mb-4">
                <FaExclamationTriangle size={80} className="text-warning" />
              </div>

              <h1 className="display-1 fw-bold text-primary mb-3">404</h1>

              <h2 className="h4 mb-3">Trang không tìm thấy</h2>

              <p className="text-muted mb-4">
                Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di
                chuyển. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
              </p>

              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link
                  to="/"
                  className="btn btn-primary btn-lg d-flex align-items-center text-decoration-none"
                >
                  <FaHome className="me-2" />
                  Về trang chủ
                </Link>

                <Link
                  to="/search"
                  className="btn btn-outline-primary btn-lg d-flex align-items-center text-decoration-none"
                >
                  <FaSearch className="me-2" />
                  Tìm phòng trọ
                </Link>
              </div>

              <div className="mt-4 pt-4 border-top">
                <p className="text-muted small mb-2">Cần hỗ trợ?</p>
                <p className="mb-0">
                  <Link to="/contact" className="text-decoration-none">
                    Liên hệ với chúng tôi
                  </Link>
                  {" hoặc gọi "}
                  <a href="tel:+84123456789" className="text-decoration-none">
                    0123 456 789
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <div className="text-center">
            <h4 className="mb-3">Hoặc khám phá các tính năng khác</h4>
            <div className="row justify-content-center">
              <div className="col-md-4 mb-3">
                <Card className="h-100 shadow-sm">
                  <Card.Body className="text-center">
                    <FaSearch size={30} className="text-primary mb-2" />
                    <h6>Tìm kiếm phòng trọ</h6>
                    <p className="text-muted small">
                      Khám phá hàng nghìn phòng trọ chất lượng
                    </p>
                    <Link
                      to="/search"
                      className="btn btn-outline-primary btn-sm text-decoration-none"
                    >
                      Khám phá ngay
                    </Link>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-md-4 mb-3">
                <Card className="h-100 shadow-sm">
                  <Card.Body className="text-center">
                    <FaHome size={30} className="text-success mb-2" />
                    <h6>Dành cho chủ trọ</h6>
                    <p className="text-muted small">
                      Quản lý và cho thuê phòng trọ hiệu quả
                    </p>
                    <Link
                      to="/register"
                      className="btn btn-outline-success btn-sm text-decoration-none"
                    >
                      Đăng ký ngay
                    </Link>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-md-4 mb-3">
                <Card className="h-100 shadow-sm">
                  <Card.Body className="text-center">
                    <div
                      className="text-info mb-2"
                      style={{ fontSize: "30px" }}
                    >
                      💬
                    </div>
                    <h6>Hỗ trợ 24/7</h6>
                    <p className="text-muted small">
                      Liên hệ với đội ngũ hỗ trợ chuyên nghiệp
                    </p>
                    <Link
                      to="/contact"
                      className="btn btn-outline-info btn-sm text-decoration-none"
                    >
                      Liên hệ ngay
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
