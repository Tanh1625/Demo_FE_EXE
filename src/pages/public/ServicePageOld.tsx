import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import {
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import { mockServices, formatPrice, type ServicePackage } from "../../data/mockData";

const ServicePage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Mock data - Replace with actual API call
  const mockServices: Service[] = [
    {
      id: "1",
      name: "Dịch vụ dọn dẹp phòng trọ",
      description: "Dọn dẹp phòng trọ chuyên nghiệp, sạch sẽ, giá cả hợp lý",
      category: "cleaning",
      provider: "Công ty Clean Pro",
      contactPhone: "0123 456 789",
      contactEmail: "info@cleanpro.vn",
      priceRange: {
        min: 150000,
        max: 300000,
        unit: "per_room",
      },
      coverage: ["Quận 1", "Quận 3", "Quận 7", "Quận 10"],
      rating: 4.5,
      reviewCount: 128,
      isActive: true,
      availableHours: {
        start: "08:00",
        end: "18:00",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "Sửa chữa điện nước",
      description:
        "Sửa chữa các thiết bị điện, nước trong phòng trọ nhanh chóng",
      category: "maintenance",
      provider: "Thợ Tốt 24/7",
      contactPhone: "0987 654 321",
      contactEmail: "hotro@thotot247.vn",
      priceRange: {
        min: 100000,
        max: 500000,
        unit: "per_service",
      },
      coverage: ["Tất cả quận TP.HCM"],
      rating: 4.8,
      reviewCount: 95,
      isActive: true,
      availableHours: {
        start: "06:00",
        end: "22:00",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Bảo vệ khu trọ",
      description: "Dịch vụ bảo vệ chuyên nghiệp cho khu trọ, an toàn 24/7",
      category: "security",
      provider: "An Ninh Việt",
      contactPhone: "0911 222 333",
      priceRange: {
        min: 5000000,
        max: 8000000,
        unit: "monthly",
      },
      coverage: ["TP. Hồ Chí Minh", "Hà Nội"],
      rating: 4.2,
      reviewCount: 42,
      isActive: true,
      availableHours: {
        start: "00:00",
        end: "23:59",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      name: "Lắp đặt Internet",
      description: "Lắp đặt mạng Internet tốc độ cao cho phòng trọ",
      category: "utilities",
      provider: "FiberNet Solutions",
      contactPhone: "1800 1234",
      contactEmail: "support@fibernet.vn",
      priceRange: {
        min: 200000,
        max: 800000,
        unit: "monthly",
      },
      coverage: ["Toàn quốc"],
      rating: 4.6,
      reviewCount: 203,
      isActive: true,
      availableHours: {
        start: "08:00",
        end: "17:00",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchServices = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setServices(mockServices);
      setLoading(false);
    };

    fetchServices();
  }, []);

  const getCategoryLabel = (category: string) => {
    const labels = {
      cleaning: "Dọn dẹp",
      maintenance: "Sửa chữa",
      security: "Bảo vệ",
      utilities: "Tiện ích",
      other: "Khác",
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      cleaning: "success",
      maintenance: "warning",
      security: "danger",
      utilities: "info",
      other: "secondary",
    };
    return colors[category as keyof typeof colors] || "secondary";
  };

  const formatPrice = (min: number, max: number, unit: string) => {
    const formatNumber = (num: number) => {
      return new Intl.NumberFormat("vi-VN").format(num);
    };

    const unitLabels = {
      per_hour: "/giờ",
      per_room: "/phòng",
      per_service: "/dịch vụ",
      monthly: "/tháng",
    };

    const unitLabel = unitLabels[unit as keyof typeof unitLabels] || "";

    if (min === max) {
      return `${formatNumber(min)}đ${unitLabel}`;
    }
    return `${formatNumber(min)}đ - ${formatNumber(max)}đ${unitLabel}`;
  };

  const filteredServices = services.filter((service) => {
    const matchesKeyword =
      !searchKeyword ||
      service.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      service.description.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchesCategory =
      !selectedCategory || service.category === selectedCategory;

    return matchesKeyword && matchesCategory && service.isActive;
  });

  const handleContactService = (service: Service) => {
    // Open phone dialer or show contact modal
    window.open(`tel:${service.contactPhone}`);
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Dịch vụ trọ</h2>
        <p className="text-muted">
          Tìm kiếm các dịch vụ hỗ trợ cho phòng trọ của bạn
        </p>
      </div>

      {/* Search and Filter */}
      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            <option value="cleaning">Dọn dẹp</option>
            <option value="maintenance">Sửa chữa</option>
            <option value="security">Bảo vệ</option>
            <option value="utilities">Tiện ích</option>
            <option value="other">Khác</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Services Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Row className="g-4">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <Col md={6} lg={4} key={service.id}>
                <Card className="h-100 shadow-sm hover-card">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <Badge bg={getCategoryColor(service.category)}>
                        {getCategoryLabel(service.category)}
                      </Badge>
                      {service.rating && (
                        <div className="d-flex align-items-center">
                          <FaStar className="text-warning me-1" />
                          <small className="fw-bold">{service.rating}</small>
                          <small className="text-muted ms-1">
                            ({service.reviewCount})
                          </small>
                        </div>
                      )}
                    </div>

                    <Card.Title className="fw-bold mb-2">
                      {service.name}
                    </Card.Title>
                    <Card.Text className="text-muted flex-grow-1">
                      {service.description}
                    </Card.Text>

                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <strong className="text-primary">
                          {formatPrice(
                            service.priceRange.min,
                            service.priceRange.max,
                            service.priceRange.unit
                          )}
                        </strong>
                      </div>

                      <small className="text-muted d-block">
                        <strong>Nhà cung cấp:</strong> {service.provider}
                      </small>

                      {service.availableHours && (
                        <small className="text-muted d-flex align-items-center mt-1">
                          <FaClock className="me-1" />
                          {service.availableHours.start} -{" "}
                          {service.availableHours.end}
                        </small>
                      )}

                      <small className="text-muted d-flex align-items-center mt-1">
                        <FaMapMarkerAlt className="me-1" />
                        {service.coverage.join(", ")}
                      </small>
                    </div>

                    <div className="mt-auto">
                      <Row className="g-2">
                        <Col>
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-100 d-flex align-items-center justify-content-center"
                            onClick={() => handleContactService(service)}
                          >
                            <FaPhone className="me-1" />
                            Gọi ngay
                          </Button>
                        </Col>
                        {service.contactEmail && (
                          <Col>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className="w-100 d-flex align-items-center justify-content-center"
                              onClick={() =>
                                window.open(`mailto:${service.contactEmail}`)
                              }
                            >
                              <FaEnvelope className="me-1" />
                              Email
                            </Button>
                          </Col>
                        )}
                      </Row>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Card className="text-center py-5">
                <Card.Body>
                  <h5>Không tìm thấy dịch vụ nào</h5>
                  <p className="text-muted">
                    Thử thay đổi từ khóa tìm kiếm hoặc danh mục
                  </p>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default ServicePage;
