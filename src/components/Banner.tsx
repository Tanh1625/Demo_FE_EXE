import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaHome, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

interface BannerProps {
  onSearchClick?: () => void;
}

// Mảng ảnh phòng trọ
const roomImages = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
  "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=1200&q=80",
  "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=1200&q=80",
];

export const Banner: React.FC<BannerProps> = ({ onSearchClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === roomImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Chuyển ảnh mỗi 5 giây

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className="position-relative overflow-hidden"
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background Images Slideshow */}
      {roomImages.map((image, index) => (
        <div
          key={index}
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: currentImageIndex === index ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
            zIndex: 1,
          }}
        />
      ))}

      {/* Overlay gradient */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%)",
          zIndex: 2,
        }}
      />

      {/* Background Pattern */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3,
          zIndex: 3,
        }}
      />

      <Container className="position-relative" style={{ zIndex: 10 }}>
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
          zIndex: 4,
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
          zIndex: 4,
        }}
      />

      {/* Slide Indicators */}
      <div
        className="position-absolute d-flex gap-2"
        style={{
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        {roomImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              border: "none",
              background:
                currentImageIndex === index
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(255, 255, 255, 0.4)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
            onMouseEnter={(e) => {
              if (currentImageIndex !== index) {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.6)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentImageIndex !== index) {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.4)";
              }
            }}
            aria-label={`Chuyển đến ảnh ${index + 1}`}
          />
        ))}
      </div>

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
