import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaCogs, FaHome, FaSearch, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import Testimonials from "../../components/Testimonials";
import {
  featuredRooms,
  formatPrice,
  getRoomTypeLabel,
} from "../../data/mockData";

const HomePage: React.FC = () => {
  const [searchForm, setSearchForm] = useState({
    keyword: "",
    city: "",
    priceRange: "",
  });
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();

    if (searchForm.keyword) searchParams.set("keyword", searchForm.keyword);
    if (searchForm.city) searchParams.set("city", searchForm.city);
    if (searchForm.priceRange)
      searchParams.set("priceRange", searchForm.priceRange);

    navigate(`/search?${searchParams.toString()}`);
  };

  const handleInputChange = (field: string, value: string) => {
    setSearchForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      {/* Hero Banner Section */}
      <Banner onSearchClick={() => navigate("/search")} />

      <Container>
        {/* Search Form */}
        <Row className="justify-content-center mb-5">
          <Col lg={8}>
            <Card className="shadow-lg">
              <Card.Body className="p-4">
                <h4 className="text-center mb-4">
                  <FaSearch className="me-2 text-primary" />
                  Tìm kiếm phòng trọ
                </h4>

                <Form onSubmit={handleSearchSubmit}>
                  <Row className="g-3">
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Từ khóa</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nhập từ khóa..."
                          value={searchForm.keyword}
                          onChange={(e) =>
                            handleInputChange("keyword", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Thành phố</Form.Label>
                        <Form.Select
                          value={searchForm.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                        >
                          <option value="">Chọn thành phố</option>
                          <option value="hanoi">Hà Nội</option>
                          <option value="hochiminh">TP. Hồ Chí Minh</option>
                          <option value="danang">Đà Nẵng</option>
                          <option value="cantho">Cần Thơ</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Mức giá</Form.Label>
                        <Form.Select
                          value={searchForm.priceRange}
                          onChange={(e) =>
                            handleInputChange("priceRange", e.target.value)
                          }
                        >
                          <option value="">Chọn mức giá</option>
                          <option value="0-2000000">Dưới 2 triệu</option>
                          <option value="2000000-4000000">2 - 4 triệu</option>
                          <option value="4000000-6000000">4 - 6 triệu</option>
                          <option value="6000000-10000000">6 - 10 triệu</option>
                          <option value="10000000-999999999">
                            Trên 10 triệu
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="text-center mt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="px-5"
                    >
                      <FaSearch className="me-2" />
                      Tìm kiếm
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <FaHome className="text-primary mb-3" size={48} />
                <Card.Title>Tìm trọ dễ dàng</Card.Title>
                <Card.Text className="text-muted">
                  Tìm kiếm phòng trọ phù hợp với nhu cầu và túi tiền của bạn một
                  cách nhanh chóng
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <FaUsers className="text-success mb-3" size={48} />
                <Card.Title>Kết nối tin cậy</Card.Title>
                <Card.Text className="text-muted">
                  Kết nối trực tiếp với chủ trọ, thông tin minh bạch và đáng tin
                  cậy
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <FaCogs className="text-warning mb-3" size={48} />
                <Card.Title>Dịch vụ tiện ích</Card.Title>
                <Card.Text className="text-muted">
                  Hỗ trợ đa dạng dịch vụ từ dọn dẹp, sửa chữa đến bảo trì phòng
                  trọ
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Featured Rooms Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Phòng Trọ Nổi Bật</h2>
            <p className="text-center text-muted mb-4">
              Khám phá những phòng trọ được yêu thích nhất tại TroViet
            </p>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          {featuredRooms.map((room) => (
            <Col key={room.id} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={room.images[0]}
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="h6 mb-2">{room.title}</Card.Title>
                  <Card.Text className="text-muted small mb-2 flex-grow-1">
                    {room.description.substring(0, 100)}...
                  </Card.Text>
                  <div className="mb-2">
                    <small className="text-muted">📍 {room.address}</small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold text-primary">
                      {formatPrice(room.price)}/tháng
                    </span>
                    <span className="badge bg-secondary">
                      {getRoomTypeLabel(room.roomType)}
                    </span>
                  </div>
                  <div className="mb-3">
                    <small className="text-muted">
                      🏠 {room.area}m² • 👥 {room.maxOccupants} người
                    </small>
                  </div>
                  <div className="d-flex gap-2 mt-auto">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="flex-grow-1"
                      onClick={() => navigate(`/room/${room.id}`)}
                    >
                      Chi tiết
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-grow-1"
                      onClick={() => navigate("/contact")}
                    >
                      Liên hệ
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="text-center mb-5">
          <Col>
            <Button
              variant="outline-primary"
              size="lg"
              onClick={() => navigate("/search")}
            >
              Xem tất cả phòng trọ
            </Button>
          </Col>
        </Row>

        {/* Statistics Section */}
        <Row className="text-center py-5 bg-light rounded mb-5">
          <Col md={3}>
            <h3 className="text-primary fw-bold">10,000+</h3>
            <p className="text-muted">Phòng trọ</p>
          </Col>
          <Col md={3}>
            <h3 className="text-primary fw-bold">5,000+</h3>
            <p className="text-muted">Chủ trọ</p>
          </Col>
          <Col md={3}>
            <h3 className="text-primary fw-bold">50,000+</h3>
            <p className="text-muted">Khách thuê</p>
          </Col>
          <Col md={3}>
            <h3 className="text-primary fw-bold">100+</h3>
            <p className="text-muted">Dịch vụ</p>
          </Col>
        </Row>
      </Container>

      {/* Testimonials Section */}
      <Testimonials />
    </>
  );
};

export default HomePage;
