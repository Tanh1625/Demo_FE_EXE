import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import {
  FaBolt,
  FaCalendarAlt,
  FaCar,
  FaEnvelope,
  FaHeart,
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaRuler,
  FaShare,
  FaSnowflake,
  FaTint,
  FaUsers,
  FaWifi,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { Room } from "../../types/Room";

const RoomDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLandlord, isAdmin } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showRentalRequestModal, setShowRentalRequestModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "Tôi quan tâm đến phòng trọ này. Vui lòng liên hệ với tôi.",
  });

  const [rentalRequestForm, setRentalRequestForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    idCard: "",
    occupation: "",
    currentAddress: "",
    message: "",
    moveInDate: "",
  });

  // Mock room data
  const mockRoom: Room = {
    id: id || "1",
    title: "Phòng trọ cao cấp Quận 1 - Đầy đủ nội thất",
    description: `Phòng trọ cao cấp tại vị trí đắc địa Quận 1, gần các trường đại học và khu vực trung tâm thành phố. 
    Phòng được trang bị đầy đủ nội thất hiện đại, sạch sẽ và thoáng mát. 
    
    Đặc điểm nổi bật:
    - Vị trí thuận tiện di chuyển
    - Môi trường an toàn, yên tĩnh
    - Chủ trọ thân thiện, hỗ trợ nhiệt tình
    - Giá điện nước hợp lý
    - Có thể vào ở ngay`,
    address: "123 Nguyễn Huệ, Phường Bến Nghé",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    price: 3500000,
    area: 25,
    roomType: "single",
    amenities: [
      "WiFi miễn phí tốc độ cao",
      "Điều hòa 2 chiều",
      "Tủ lạnh riêng",
      "Máy giặt chung",
      "Nhà vệ sinh riêng",
      "Ban công thoáng mát",
      "Bảo vệ 24/7",
      "Thang máy",
    ],
    images: [
      "https://via.placeholder.com/800x600/007bff/ffffff?text=Phòng+Chính",
      "https://via.placeholder.com/800x600/28a745/ffffff?text=Nhà+Vệ+Sinh",
      "https://via.placeholder.com/800x600/ffc107/ffffff?text=Ban+Công",
      "https://via.placeholder.com/800x600/dc3545/ffffff?text=Khu+Vực+Chung",
      "https://via.placeholder.com/800x600/6f42c1/ffffff?text=Lối+Vào",
    ],
    isAvailable: true,
    landlordId: "1",
    maxOccupants: 2,
    electricityPrice: 3500,
    waterPrice: 20000,
    internetIncluded: true,
    parkingIncluded: true,
    airConditioned: true,
    furnished: true,
    approvalStatus: "approved",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
  };

  const landlordInfo = {
    name: "Chị Lan Anh",
    phone: "0123 456 789",
    email: "lananh@gmail.com",
    avatar: "https://via.placeholder.com/100x100/007bff/ffffff?text=LA",
    verifiedPhone: true,
    verifiedEmail: true,
    responseRate: 95,
    responseTime: "30 phút",
    totalRooms: 12,
    memberSince: "2022",
  };

  useEffect(() => {
    // Simulate API call
    const fetchRoom = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRoom(mockRoom);
      setLoading(false);
    };

    fetchRoom();
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getRoomTypeLabel = (type: string) => {
    const typeLabels = {
      single: "Phòng đơn",
      shared: "Phòng chia sẻ",
      apartment: "Căn hộ",
      studio: "Studio",
    };
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    // Handle contact form submission
    setShowContactModal(false);
    alert("Tin nhắn đã được gửi! Chủ trọ sẽ liên hệ với bạn sớm.");
  };

  const handleCallLandlord = () => {
    window.open(`tel:${landlordInfo.phone}`);
  };

  const handleSubmitRentalRequest = () => {
    // Validate
    if (
      !rentalRequestForm.fullName ||
      !rentalRequestForm.phone ||
      !rentalRequestForm.email
    ) {
      alert("Vui lòng điền đầy đủ thông tin cá nhân!");
      return;
    }
    if (!rentalRequestForm.moveInDate) {
      alert("Vui lòng chọn ngày dự kiến chuyển vào!");
      return;
    }

    console.log("Submitting rental request:", {
      roomId: room?.id,
      ...rentalRequestForm,
    });

    setShowRentalRequestModal(false);
    alert(
      "Yêu cầu thuê phòng đã được gửi! Chủ trọ sẽ xem xét và phản hồi sớm."
    );

    // Reset form
    setRentalRequestForm({
      fullName: "",
      phone: "",
      email: "",
      idCard: "",
      occupation: "",
      currentAddress: "",
      message: "",
      moveInDate: "",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: room?.title,
        text: `${room?.title} - ${formatPrice(room?.price || 0)}/tháng`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link đã được sao chép!");
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Đang tải thông tin phòng trọ...</p>
        </div>
      </Container>
    );
  }

  if (!room) {
    return (
      <Container className="py-5">
        <Card className="text-center">
          <Card.Body>
            <h5>Không tìm thấy phòng trọ</h5>
            <p className="text-muted">
              Phòng trọ này có thể đã không còn tồn tại hoặc đã bị xóa.
            </p>
            <Button variant="primary" onClick={() => navigate("/search")}>
              Quay lại tìm kiếm
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2 className="fw-bold mb-2">{room.title}</h2>
              <div className="d-flex align-items-center text-muted mb-2">
                <FaMapMarkerAlt className="me-1" />
                <span>
                  {room.address}, {room.district}, {room.city}
                </span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <Badge bg={room.isAvailable ? "success" : "secondary"}>
                  {room.isAvailable ? "Có sẵn" : "Đã thuê"}
                </Badge>
                <Badge bg="outline-primary">
                  {getRoomTypeLabel(room.roomType)}
                </Badge>
                <small className="text-muted">
                  <FaCalendarAlt className="me-1" />
                  Đăng ngày {room.createdAt.toLocaleDateString("vi-VN")}
                </small>
              </div>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <FaHeart className={isFavorited ? "text-danger" : ""} />
              </Button>
              <Button variant="outline-secondary" onClick={handleShare}>
                <FaShare />
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Images */}
        <Col lg={8}>
          <Card className="mb-4">
            <Carousel className="rounded">
              {room.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`${room.title} - Ảnh ${index + 1}`}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Card>

          {/* Description */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Mô tả chi tiết</h5>
            </Card.Header>
            <Card.Body>
              <p style={{ whiteSpace: "pre-line" }}>{room.description}</p>
            </Card.Body>
          </Card>

          {/* Amenities */}
          <Card>
            <Card.Header>
              <h5 className="mb-0">Tiện nghi & Dịch vụ</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                {room.amenities.map((amenity, index) => (
                  <Col sm={6} md={4} key={index}>
                    <div className="d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                        {amenity.includes("WiFi") && (
                          <FaWifi className="text-primary" />
                        )}
                        {amenity.includes("điều hòa") && (
                          <FaSnowflake className="text-primary" />
                        )}
                        {amenity.includes("xe") && (
                          <FaCar className="text-primary" />
                        )}
                        {!amenity.includes("WiFi") &&
                          !amenity.includes("điều hòa") &&
                          !amenity.includes("xe") && (
                            <FaUsers className="text-primary" />
                          )}
                      </div>
                      <span className="small">{amenity}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Sidebar */}
        <Col lg={4}>
          {/* Price & Basic Info */}
          <Card className="mb-4 sticky-top" style={{ top: "1rem" }}>
            <Card.Body>
              <div className="text-center mb-4">
                <h3 className="text-primary fw-bold mb-1">
                  {formatPrice(room.price)}
                  <small className="text-muted">/tháng</small>
                </h3>
              </div>

              <Row className="g-3 mb-4">
                <Col xs={6}>
                  <div className="text-center">
                    <FaRuler className="text-primary mb-2" size={24} />
                    <div className="fw-bold">{room.area}m²</div>
                    <small className="text-muted">Diện tích</small>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="text-center">
                    <FaUsers className="text-primary mb-2" size={24} />
                    <div className="fw-bold">{room.maxOccupants} người</div>
                    <small className="text-muted">Tối đa</small>
                  </div>
                </Col>
              </Row>

              <ListGroup className="mb-4">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <FaBolt className="text-warning me-2" />
                    Điện
                  </span>
                  <span>{room.electricityPrice?.toLocaleString()}đ/kWh</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    <FaTint className="text-info me-2" />
                    Nước
                  </span>
                  <span>{room.waterPrice?.toLocaleString()}đ/m³</span>
                </ListGroup.Item>
              </ListGroup>

              <div className="d-grid gap-2">
                {!isLandlord && !isAdmin && (
                  <Button
                    variant="success"
                    size="lg"
                    onClick={() => setShowRentalRequestModal(true)}
                    className="fw-bold"
                  >
                    <FaHome className="me-2" />
                    Yêu cầu thuê phòng
                  </Button>
                )}
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleCallLandlord}
                  className="fw-bold"
                >
                  <FaPhone className="me-2" />
                  Gọi ngay
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => setShowContactModal(true)}
                >
                  <FaEnvelope className="me-2" />
                  Gửi tin nhắn
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Landlord Info */}
          <Card>
            <Card.Header>
              <h6 className="mb-0">Thông tin chủ trọ</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <img
                  src={landlordInfo.avatar}
                  alt={landlordInfo.name}
                  className="rounded-circle me-3"
                  width="60"
                  height="60"
                />
                <div>
                  <h6 className="mb-1">{landlordInfo.name}</h6>
                  <div className="d-flex gap-1 mb-1">
                    {landlordInfo.verifiedPhone && (
                      <Badge bg="success" className="small">
                        ✓ SĐT
                      </Badge>
                    )}
                    {landlordInfo.verifiedEmail && (
                      <Badge bg="success" className="small">
                        ✓ Email
                      </Badge>
                    )}
                  </div>
                  <small className="text-muted">
                    Thành viên từ {landlordInfo.memberSince}
                  </small>
                </div>
              </div>

              <Row className="g-2 text-center mb-3">
                <Col>
                  <div className="small">
                    <div className="fw-bold text-primary">
                      {landlordInfo.responseRate}%
                    </div>
                    <div className="text-muted">Tỷ lệ phản hồi</div>
                  </div>
                </Col>
                <Col>
                  <div className="small">
                    <div className="fw-bold text-primary">
                      {landlordInfo.responseTime}
                    </div>
                    <div className="text-muted">Thời gian phản hồi</div>
                  </div>
                </Col>
                <Col>
                  <div className="small">
                    <div className="fw-bold text-primary">
                      {landlordInfo.totalRooms}
                    </div>
                    <div className="text-muted">Phòng trọ</div>
                  </div>
                </Col>
              </Row>

              <Button
                variant="outline-secondary"
                size="sm"
                className="w-100"
                onClick={() => console.log("View landlord profile")}
              >
                Xem thông tin chi tiết
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Contact Modal */}
      <Modal
        show={showContactModal}
        onHide={() => setShowContactModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Liên hệ với chủ trọ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleContactSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ tên *</Form.Label>
                  <Form.Control
                    type="text"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại *</Form.Label>
                  <Form.Control
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tin nhắn</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowContactModal(false)}
              >
                Hủy
              </Button>
              <Button type="submit" variant="primary">
                Gửi tin nhắn
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Rental Request Modal */}
      <Modal
        show={showRentalRequestModal}
        onHide={() => setShowRentalRequestModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Yêu cầu thuê phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mb-3">Thông tin cá nhân</h6>

          <Form.Group className="mb-3">
            <Form.Label>
              Họ và tên <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập họ tên đầy đủ"
              value={rentalRequestForm.fullName}
              onChange={(e) =>
                setRentalRequestForm({
                  ...rentalRequestForm,
                  fullName: e.target.value,
                })
              }
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Số điện thoại <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="0912345678"
                  value={rentalRequestForm.phone}
                  onChange={(e) =>
                    setRentalRequestForm({
                      ...rentalRequestForm,
                      phone: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Email <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email@example.com"
                  value={rentalRequestForm.email}
                  onChange={(e) =>
                    setRentalRequestForm({
                      ...rentalRequestForm,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>CMND/CCCD</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Số CMND/CCCD"
                  value={rentalRequestForm.idCard}
                  onChange={(e) =>
                    setRentalRequestForm({
                      ...rentalRequestForm,
                      idCard: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nghề nghiệp</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Sinh viên, nhân viên..."
                  value={rentalRequestForm.occupation}
                  onChange={(e) =>
                    setRentalRequestForm({
                      ...rentalRequestForm,
                      occupation: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ hiện tại</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập địa chỉ hiện tại của bạn"
              value={rentalRequestForm.currentAddress}
              onChange={(e) =>
                setRentalRequestForm({
                  ...rentalRequestForm,
                  currentAddress: e.target.value,
                })
              }
            />
          </Form.Group>

          <hr />
          <h6 className="mb-3">Thông tin thuê phòng</h6>

          <Form.Group className="mb-3">
            <Form.Label>
              Ngày dự kiến chuyển vào <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="date"
              value={rentalRequestForm.moveInDate}
              onChange={(e) =>
                setRentalRequestForm({
                  ...rentalRequestForm,
                  moveInDate: e.target.value,
                })
              }
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lời nhắn cho chủ trọ</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Giới thiệu về bản thân, mục đích thuê, thời gian dự kiến thuê..."
              value={rentalRequestForm.message}
              onChange={(e) =>
                setRentalRequestForm({
                  ...rentalRequestForm,
                  message: e.target.value,
                })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowRentalRequestModal(false)}
          >
            Hủy
          </Button>
          <Button variant="success" onClick={handleSubmitRentalRequest}>
            <FaHome className="me-2" />
            Gửi yêu cầu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RoomDetailsPage;
