import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import {
  FaPhone,
  FaShoppingCart,
  FaStar,
  FaUserTie,
} from "react-icons/fa";
import { mockRoomServices, formatPrice, type RoomService } from "../../data/mockData";

const ServicePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<RoomService | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    address: "",
    preferredTime: "",
    notes: ""
  });

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(mockRoomServices.map(s => s.category)))];

  // Filter services by category
  const filteredServices = selectedCategory === "all" 
    ? mockRoomServices 
    : mockRoomServices.filter(s => s.category === selectedCategory);

  const handleBookService = (service: RoomService) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", { service: selectedService, form: bookingForm });
    // Handle booking logic here
    alert(`Đã đặt dịch vụ "${selectedService?.name}" thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.`);
    setShowBookingModal(false);
    setBookingForm({ name: "", phone: "", address: "", preferredTime: "", notes: "" });
  };

  const handleFormChange = (field: string, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-3">Dịch Vụ Phòng Trọ</h1>
            <p className="lead text-muted mb-4">
              Giải pháp toàn diện cho mọi nhu cầu sinh hoạt trong phòng trọ
            </p>
            
            {/* Service Stats */}
            <Row className="justify-content-center">
              <Col md={3} className="text-center mb-3">
                <h4 className="text-primary fw-bold">500+</h4>
                <small className="text-muted">Khách hàng tin tưởng</small>
              </Col>
              <Col md={3} className="text-center mb-3">
                <h4 className="text-primary fw-bold">24/7</h4>
                <small className="text-muted">Hỗ trợ khách hàng</small>
              </Col>
              <Col md={3} className="text-center mb-3">
                <h4 className="text-primary fw-bold">98%</h4>
                <small className="text-muted">Độ hài lòng</small>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* Category Filter */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-center flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline-primary"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category === "all" ? "Tất cả dịch vụ" : category}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Services Grid */}
      <Row>
        {filteredServices.map((service) => (
          <Col key={service.id} lg={4} md={6} className="mb-4">
            <Card className="h-100 shadow-sm border-0 position-relative">
              {service.popular && (
                <div className="position-absolute top-0 end-0 m-2">
                  <Badge bg="danger" className="px-2 py-1">
                    <FaStar className="me-1" size={12} />
                    Phổ biến
                  </Badge>
                </div>
              )}
              
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="me-3 p-3 rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px", fontSize: "24px" }}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <h5 className="mb-1 fw-bold">{service.name}</h5>
                    <Badge bg="light" text="dark" className="rounded-pill">
                      {service.category}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-muted mb-3 lh-base">
                  {service.description}
                </p>
                
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Giá dịch vụ:</span>
                    <span className="fw-bold text-primary fs-5">
                      {formatPrice(service.price)}/{service.unit}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">Thời gian:</span>
                    <span className="fw-semibold">{service.estimatedTime}</span>
                  </div>
                </div>
                
                {/* Features */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-2">Bao gồm:</h6>
                  <ul className="list-unstyled">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="mb-1">
                        <small className="text-success">✓</small>
                        <small className="ms-2 text-muted">{feature}</small>
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="mb-1">
                        <small className="text-muted">
                          +{service.features.length - 3} dịch vụ khác
                        </small>
                      </li>
                    )}
                  </ul>
                </div>
              </Card.Body>
              
              <Card.Footer className="bg-white border-0 p-4 pt-0">
                <Button 
                  variant="primary" 
                  className="w-100 fw-semibold"
                  onClick={() => handleBookService(service)}
                >
                  <FaShoppingCart className="me-2" />
                  Đặt dịch vụ ngay
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Contact Section */}
      <Row className="mt-5 py-5 bg-light rounded">
        <Col lg={8} className="mx-auto text-center">
          <h3 className="fw-bold mb-3">Cần tư vấn thêm?</h3>
          <p className="text-muted mb-4">
            Liên hệ với đội ngũ chuyên viên của chúng tôi để được tư vấn dịch vụ phù hợp nhất
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="primary" size="lg">
              <FaPhone className="me-2" />
              Gọi ngay: 1900-1234
            </Button>
            <Button variant="outline-primary" size="lg">
              <FaUserTie className="me-2" />
              Tư vấn miễn phí
            </Button>
          </div>
        </Col>
      </Row>

      {/* Booking Modal */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Đặt dịch vụ: {selectedService?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedService && (
            <div className="mb-4 p-3 bg-light rounded">
              <div className="d-flex align-items-center">
                <span className="me-3" style={{ fontSize: "30px" }}>{selectedService.icon}</span>
                <div>
                  <h6 className="mb-1">{selectedService.name}</h6>
                  <div className="text-primary fw-bold">
                    {formatPrice(selectedService.price)}/{selectedService.unit}
                  </div>
                  <small className="text-muted">Thời gian: {selectedService.estimatedTime}</small>
                </div>
              </div>
            </div>
          )}
          
          <Form onSubmit={handleBookingSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên *</Form.Label>
                  <Form.Control
                    type="text"
                    value={bookingForm.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    placeholder="Nhập họ và tên"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại *</Form.Label>
                  <Form.Control
                    type="tel"
                    value={bookingForm.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ phòng trọ *</Form.Label>
              <Form.Control
                type="text"
                value={bookingForm.address}
                onChange={(e) => handleFormChange("address", e.target.value)}
                placeholder="Nhập địa chỉ chi tiết"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Thời gian mong muốn</Form.Label>
              <Form.Control
                type="datetime-local"
                value={bookingForm.preferredTime}
                onChange={(e) => handleFormChange("preferredTime", e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Ghi chú thêm</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={bookingForm.notes}
                onChange={(e) => handleFormChange("notes", e.target.value)}
                placeholder="Yêu cầu đặc biệt hoặc ghi chú thêm..."
              />
            </Form.Group>

            {selectedService && (
              <div className="bg-light p-3 rounded mb-3">
                <h6 className="mb-2">Chi tiết dịch vụ:</h6>
                <ul className="mb-0 list-unstyled">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="mb-1">
                      <small className="text-success">✓</small>
                      <small className="ms-2">{feature}</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleBookingSubmit}>
            <FaShoppingCart className="me-2" />
            Xác nhận đặt dịch vụ
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ServicePage;