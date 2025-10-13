import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaHome, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

interface BannerProps {
  onSearchClick?: () => void;
}

export const Banner: React.FC<BannerProps> = ({ onSearchClick }) => {
  return (
    <div
      className="position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background Pattern */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      <Container className="position-relative">
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <div className="text-white">
              <FaHome className="mb-4" size={60} />
              <h1 className="display-4 fw-bold mb-4">Tìm Phòng Trọ Hoàn Hảo</h1>
              <p className="lead mb-5 fs-4">
                Khám phá hàng ngàn phòng trọ chất lượng cao với giá cả phù hợp.
                Từ phòng đơn đến căn hộ cao cấp, chúng tôi có tất cả những gì
                bạn cần.
              </p>

              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mb-5">
                <Button
                  variant="light"
                  size="lg"
                  className="px-4 py-3 fw-semibold"
                  onClick={onSearchClick}
                >
                  <FaSearch className="me-2" />
                  Tìm kiếm ngay
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  className="px-4 py-3 fw-semibold"
                >
                  <FaMapMarkerAlt className="me-2" />
                  Xem bản đồ
                </Button>
              </div>

              {/* Stats */}
              <Row className="text-center">
                <Col md={4} className="mb-3 mb-md-0">
                  <div className="h3 fw-bold mb-2">1000+</div>
                  <div className="fs-6 opacity-75">Phòng trọ</div>
                </Col>
                <Col md={4} className="mb-3 mb-md-0">
                  <div className="h3 fw-bold mb-2">500+</div>
                  <div className="fs-6 opacity-75">Chủ trọ</div>
                </Col>
                <Col md={4}>
                  <div className="h3 fw-bold mb-2">50+</div>
                  <div className="fs-6 opacity-75">Khu vực</div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Decorative Elements */}
      <div
        className="position-absolute"
        style={{
          top: "20%",
          right: "10%",
          width: "100px",
          height: "100px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        className="position-absolute"
        style={{
          bottom: "20%",
          left: "5%",
          width: "60px",
          height: "60px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          animation: "float 4s ease-in-out infinite reverse",
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Banner;
