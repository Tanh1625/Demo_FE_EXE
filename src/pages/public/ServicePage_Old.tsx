import React from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import {
  FaCheck,
  FaCrown,
  FaUsers,
} from "react-icons/fa";
import { mockServices, formatPrice } from "../../data/mockData";

const ServicePage: React.FC = () => {
  const handleSelectPackage = (packageId: string) => {
    console.log("Selected package:", packageId);
    // Handle package selection logic here
  };

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-3">Gói Dịch Vụ</h1>
            <p className="lead text-muted">
              Chọn gói dịch vụ phù hợp để quản lý phòng trọ hiệu quả
            </p>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {mockServices.map((service) => (
          <Col key={service.id} lg={3} md={6} className="mb-4">
            <Card 
              className={`h-100 shadow-sm position-relative ${
                service.popular ? 'border-primary border-2' : 'border-0'
              }`}
            >
              {service.popular && (
                <div className="position-absolute top-0 start-50 translate-middle">
                  <Badge bg="primary" className="px-3 py-2">
                    <FaCrown className="me-1" />
                    Phổ biến nhất
                  </Badge>
                </div>
              )}
              
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <FaUsers size={40} className="text-primary mb-2" />
                </div>
                
                <h4 className="fw-bold mb-2">{service.name}</h4>
                <p className="text-muted mb-3">{service.description}</p>
                
                <div className="mb-4">
                  <h2 className="text-primary fw-bold mb-0">
                    {formatPrice(service.price)}
                  </h2>
                  <small className="text-muted">/{service.duration} ngày</small>
                </div>

                <ul className="list-unstyled text-start">
                  {service.features.map((feature, index) => (
                    <li key={index} className="mb-2">
                      <FaCheck className="text-success me-2" size={14} />
                      <small>{feature}</small>
                    </li>
                  ))}
                </ul>
              </Card.Body>
              
              <Card.Footer className="bg-transparent border-0 p-4 pt-0">
                <Button
                  variant={service.popular ? "primary" : "outline-primary"}
                  size="lg"
                  className="w-100"
                  onClick={() => handleSelectPackage(service.id)}
                >
                  {service.popular ? "Chọn gói này" : "Bắt đầu"}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Additional Info Section */}
      <Row className="mt-5 pt-5 border-top">
        <Col>
          <h3 className="text-center mb-4">Tại sao chọn TroViet?</h3>
        </Col>
      </Row>
      
      <Row className="g-4">
        <Col md={4}>
          <Card className="text-center h-100 border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="mb-3">
                <div className="bg-primary rounded-circle mx-auto d-flex align-items-center justify-content-center" 
                     style={{ width: '60px', height: '60px' }}>
                  <span className="text-white fw-bold" style={{ fontSize: '1.5rem' }}>⚡</span>
                </div>
              </div>
              <h5 className="fw-bold mb-3">Dễ sử dụng</h5>
              <p className="text-muted">
                Giao diện thân thiện, dễ sử dụng cho mọi đối tượng người dùng
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="text-center h-100 border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="mb-3">
                <div className="bg-success rounded-circle mx-auto d-flex align-items-center justify-content-center" 
                     style={{ width: '60px', height: '60px' }}>
                  <span className="text-white fw-bold" style={{ fontSize: '1.5rem' }}>🔒</span>
                </div>
              </div>
              <h5 className="fw-bold mb-3">An toàn & Bảo mật</h5>
              <p className="text-muted">
                Thông tin được mã hóa và bảo mật tuyệt đối theo tiêu chuẩn quốc tế
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="text-center h-100 border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="mb-3">
                <div className="bg-warning rounded-circle mx-auto d-flex align-items-center justify-content-center" 
                     style={{ width: '60px', height: '60px' }}>
                  <span className="text-white fw-bold" style={{ fontSize: '1.5rem' }}>📞</span>
                </div>
              </div>
              <h5 className="fw-bold mb-3">Hỗ trợ 24/7</h5>
              <p className="text-muted">
                Đội ngũ hỗ trợ chuyên nghiệp luôn sẵn sàng giải đáp mọi thắc mắc
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FAQ Section */}
      <Row className="mt-5 pt-5">
        <Col lg={8} className="mx-auto">
          <h3 className="text-center mb-4">Câu hỏi thường gặp</h3>
          
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button 
                  className="accordion-button" 
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#faq1"
                >
                  Tôi có thể hủy gói dịch vụ không?
                </button>
              </h2>
              <div id="faq1" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  Có, bạn có thể hủy gói dịch vụ bất kỳ lúc nào. Chúng tôi sẽ hoàn trả phí theo tỷ lệ thời gian còn lại.
                </div>
              </div>
            </div>
            
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button 
                  className="accordion-button collapsed" 
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#faq2"
                >
                  Có thể nâng cấp gói dịch vụ không?
                </button>
              </h2>
              <div id="faq2" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Có, bạn có thể nâng cấp lên gói cao hơn bất kỳ lúc nào và chỉ trả phần chênh lệch.
                </div>
              </div>
            </div>
            
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button 
                  className="accordion-button collapsed" 
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#faq3"
                >
                  Phương thức thanh toán nào được hỗ trợ?
                </button>
              </h2>
              <div id="faq3" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Chúng tôi hỗ trợ thanh toán qua thẻ ngân hàng, ví điện tử (MoMo, ZaloPay) và chuyển khoản ngân hàng.
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ServicePage;