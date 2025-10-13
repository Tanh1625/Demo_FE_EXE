import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    role: "Sinh viên Đại học Bách Khoa",
    avatar: "https://via.placeholder.com/80x80/007bff/ffffff?text=MA",
    rating: 5,
    comment:
      "Tìm được phòng trọ chất lượng chỉ trong vài ngày. Giao diện dễ sử dụng, thông tin chi tiết và chính xác. Rất hài lòng với dịch vụ!",
  },
  {
    id: 2,
    name: "Trần Văn Đức",
    role: "Chủ trọ tại Quận 3",
    avatar: "https://via.placeholder.com/80x80/28a745/ffffff?text=TD",
    rating: 5,
    comment:
      "Quản lý phòng trọ chưa bao giờ dễ dàng đến thế. Từ việc đăng tin đến thu chi đều được tự động hóa. Tiết kiệm rất nhiều thời gian!",
  },
  {
    id: 3,
    name: "Lê Thị Hương",
    role: "Nhân viên văn phòng",
    avatar: "https://via.placeholder.com/80x80/dc3545/ffffff?text=LH",
    rating: 5,
    comment:
      "Dịch vụ hỗ trợ rất tận tình. Tìm được căn hộ mini gần công ty với giá hợp lý. Quy trình thuê phòng đơn giản và minh bạch.",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <h2 className="display-5 fw-bold mb-3">
              Khách hàng nói gì về chúng tôi
            </h2>
            <p className="lead text-muted">
              Hơn 10,000 khách hàng đã tin tùng và sử dụng dịch vụ của chúng tôi
            </p>
          </Col>
        </Row>

        <Row>
          {testimonials.map((testimonial) => (
            <Col lg={4} md={6} key={testimonial.id} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <FaQuoteLeft className="text-primary mb-3" size={24} />

                  <p className="text-muted mb-4 lh-lg">
                    "{testimonial.comment}"
                  </p>

                  <div className="d-flex align-items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="rounded-circle me-3"
                      width={50}
                      height={50}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-bold">{testimonial.name}</h6>
                      <small className="text-muted">{testimonial.role}</small>
                    </div>
                  </div>

                  <div className="mt-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-warning me-1" size={14} />
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
