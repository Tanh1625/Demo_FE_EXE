import React from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import {
  FaAward,
  FaClock,
  FaHandshake,
  FaHome,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

const AboutPage: React.FC = () => {
  const stats = [
    { icon: <FaHome />, number: "10,000+", label: "Phòng trọ" },
    { icon: <FaUsers />, number: "50,000+", label: "Người dùng" },
    { icon: <FaShieldAlt />, number: "100%", label: "Bảo mật" },
    { icon: <FaClock />, number: "24/7", label: "Hỗ trợ" },
  ];

  const features = [
    {
      icon: <FaHome className="text-primary" size={40} />,
      title: "Đa Dạng Lựa Chọn",
      description:
        "Hàng nghìn phòng trọ chất lượng với mức giá phù hợp từ khắp nơi trên cả nước.",
    },
    {
      icon: <FaUsers className="text-success" size={40} />,
      title: "Cộng Đồng Tin Cậy",
      description:
        "Kết nối với hàng nghìn chủ trọ và người thuê uy tín, đã được xác thực.",
    },
    {
      icon: <FaShieldAlt className="text-warning" size={40} />,
      title: "An Toàn & Bảo Mật",
      description:
        "Thông tin cá nhân được bảo vệ tuyệt đối với công nghệ mã hóa tiên tiến.",
    },
    {
      icon: <FaClock className="text-info" size={40} />,
      title: "Hỗ Trợ 24/7",
      description:
        "Đội ngũ chăm sóc khách hàng chuyên nghiệp, sẵn sàng hỗ trợ mọi lúc.",
    },
  ];

  const values = [
    {
      icon: <FaAward className="text-primary" size={30} />,
      title: "Chất Lượng",
      description:
        "Cam kết cung cấp dịch vụ tốt nhất với chất lượng hàng đầu thị trường.",
    },
    {
      icon: <FaHandshake className="text-success" size={30} />,
      title: "Tin Cậy",
      description:
        "Xây dựng mối quan hệ lâu dài dựa trên sự tin tưởng và minh bạch.",
    },
    {
      icon: <FaUsers className="text-warning" size={30} />,
      title: "Cộng Đồng",
      description:
        "Tạo ra một cộng đồng kết nối, hỗ trợ lẫn nhau trong việc tìm kiếm nhà trọ.",
    },
  ];

  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-3">Về Chúng Tôi</h1>
            <p className="lead text-muted">
              TroViet - Nền tảng tìm kiếm và quản lý trọ hàng đầu Việt Nam
            </p>
          </div>
        </Col>
      </Row>

      {/* Stats Section */}
      <Row className="mb-5">
        {stats.map((stat, index) => (
          <Col md={3} key={index} className="mb-3">
            <Card className="text-center h-100 shadow-sm border-0">
              <Card.Body className="py-4">
                <div className="text-primary mb-3" style={{ fontSize: "2rem" }}>
                  {stat.icon}
                </div>
                <h3 className="fw-bold text-primary">{stat.number}</h3>
                <p className="text-muted mb-0">{stat.label}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Mission Section */}
      <Row className="mb-5">
        <Col lg={6}>
          <h2 className="fw-bold mb-3">Sứ Mệnh Của Chúng Tôi</h2>
          <p className="text-muted mb-3">
            TroViet được thành lập với sứ mệnh kết nối những người cần thuê trọ
            với các chủ nhà một cách nhanh chóng, an toàn và hiệu quả. Chúng tôi
            hiểu rằng việc tìm kiếm một nơi ở phù hợp là nhu cầu cơ bản và quan
            trọng của mỗi người.
          </p>
          <p className="text-muted mb-3">
            Với công nghệ hiện đại và giao diện thân thiện, chúng tôi mong muốn
            tạo ra một nền tảng tin cậy, giúp giải quyết bài toán nhà ở cho hàng
            triệu người Việt Nam.
          </p>
          <Badge bg="primary" className="me-2 px-3 py-2">
            Công nghệ
          </Badge>
          <Badge bg="success" className="me-2 px-3 py-2">
            Tin cậy
          </Badge>
          <Badge bg="warning" className="px-3 py-2">
            An toàn
          </Badge>
        </Col>
        <Col lg={6}>
          <Card className="bg-light border-0">
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-3">Tầm Nhìn 2025</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Trở thành nền tảng số 1 về cho thuê trọ tại Việt Nam
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Mở rộng ra 63 tỉnh thành trên cả nước
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Phục vụ hơn 1 triệu người dùng
                </li>
                <li className="mb-0">
                  <i className="fas fa-check text-success me-2"></i>
                  Ứng dụng AI trong tư vấn tìm trọ
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-center fw-bold mb-5">Tại Sao Chọn TroViet?</h2>
        </Col>
      </Row>
      <Row>
        {features.map((feature, index) => (
          <Col md={6} lg={3} key={index} className="mb-4">
            <Card className="h-100 shadow-sm border-0 text-center">
              <Card.Body className="p-4">
                <div className="mb-3">{feature.icon}</div>
                <h5 className="fw-bold mb-3">{feature.title}</h5>
                <p className="text-muted">{feature.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Values Section */}
      <Row className="mt-5">
        <Col>
          <h2 className="text-center fw-bold mb-5">Giá Trị Cốt Lõi</h2>
        </Col>
      </Row>
      <Row>
        {values.map((value, index) => (
          <Col md={4} key={index} className="mb-4">
            <div className="d-flex align-items-start">
              <div className="me-3 mt-1">{value.icon}</div>
              <div>
                <h5 className="fw-bold mb-2">{value.title}</h5>
                <p className="text-muted">{value.description}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Team Section */}
      <Row className="mt-5 pt-5 border-top">
        <Col>
          <h2 className="text-center fw-bold mb-5">Đội Ngũ Lãnh Đạo</h2>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm border-0 text-center">
            <Card.Body className="p-4">
              <div
                className="bg-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: "80px", height: "80px" }}
              >
                <span
                  className="text-white fw-bold"
                  style={{ fontSize: "1.5rem" }}
                >
                  NT
                </span>
              </div>
              <h5 className="fw-bold">Nguyễn Thành</h5>
              <p className="text-muted small">CEO & Founder</p>
              <p className="text-muted">
                10+ năm kinh nghiệm trong lĩnh vực bất động sản và công nghệ
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm border-0 text-center">
            <Card.Body className="p-4">
              <div
                className="bg-success rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: "80px", height: "80px" }}
              >
                <span
                  className="text-white fw-bold"
                  style={{ fontSize: "1.5rem" }}
                >
                  LH
                </span>
              </div>
              <h5 className="fw-bold">Lê Hương</h5>
              <p className="text-muted small">CTO</p>
              <p className="text-muted">
                Chuyên gia về phát triển sản phẩm và công nghệ thông tin
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm border-0 text-center">
            <Card.Body className="p-4">
              <div
                className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: "80px", height: "80px" }}
              >
                <span
                  className="text-white fw-bold"
                  style={{ fontSize: "1.5rem" }}
                >
                  TM
                </span>
              </div>
              <h5 className="fw-bold">Trần Minh</h5>
              <p className="text-muted small">Head of Marketing</p>
              <p className="text-muted">
                Chuyên gia marketing số và phát triển thương hiệu
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
