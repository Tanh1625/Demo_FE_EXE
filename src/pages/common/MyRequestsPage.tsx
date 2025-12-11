import React, { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Nav,
  Row,
  Tab,
  Table,
} from "react-bootstrap";
import {
  FaCheckCircle,
  FaClock,
  FaHome,
  FaPaperPlane,
  FaTimesCircle,
  FaTools,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { RentalRequest } from "../../types";

interface ServiceRequest {
  id: string;
  serviceType: string;
  serviceName: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  requestDate: Date;
  completionDate?: Date;
  cost?: number;
  note?: string;
}

const MyRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isSeeker, isTenant } = useAuth();
  const [showRequestModal, setShowRequestModal] = useState(false);
  // const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [requestForm, setRequestForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    idCard: "",
    occupation: "",
    currentAddress: "",
    message: "",
    moveInDate: "",
  });

  // Mock data - Yêu cầu thuê phòng đã gửi
  const myRequests: RentalRequest[] = [
    {
      id: "RQ001",
      roomId: "R001",
      roomTitle: "Phòng trọ cao cấp gần trường ĐH",
      roomAddress: "123 Đường Láng, Đống Đa, Hà Nội",
      roomPrice: 3500000,
      requesterId: "U001",
      requesterName: "Nguyễn Văn A",
      requesterEmail: "tenant@demo.com",
      requesterPhone: "0901234567",
      landlordId: "L001",
      status: "pending",
      message: "Em muốn thuê phòng từ đầu tháng sau. Em là sinh viên.",
      moveInDate: "2025-01-01",
      requestDate: new Date("2024-12-08"),
    },
    {
      id: "RQ002",
      roomId: "R002",
      roomTitle: "Phòng trọ giá rẻ gần chợ",
      roomAddress: "456 Giải Phóng, Hai Bà Trưng, Hà Nội",
      roomPrice: 2500000,
      requesterId: "U001",
      requesterName: "Nguyễn Văn A",
      requesterEmail: "tenant@demo.com",
      requesterPhone: "0901234567",
      landlordId: "L002",
      status: "approved",
      message: "Tôi muốn xem phòng và thuê dài hạn.",
      moveInDate: "2024-12-15",
      requestDate: new Date("2024-12-05"),
      responseDate: new Date("2024-12-06"),
    },
    {
      id: "RQ003",
      roomId: "R003",
      roomTitle: "Căn hộ mini 1 phòng ngủ",
      roomAddress: "789 Nguyễn Trãi, Thanh Xuân, Hà Nội",
      roomPrice: 4500000,
      requesterId: "U001",
      requesterName: "Nguyễn Văn A",
      requesterEmail: "tenant@demo.com",
      requesterPhone: "0901234567",
      landlordId: "L003",
      status: "rejected",
      message: "Tôi cần thuê gấp trong tuần này.",
      moveInDate: "2024-12-12",
      requestDate: new Date("2024-12-03"),
      responseDate: new Date("2024-12-04"),
      rejectionReason: "Phòng đã có người thuê trước",
    },
  ];

  // Mock data - Yêu cầu dịch vụ
  const serviceRequests: ServiceRequest[] = [
    {
      id: "SR001",
      serviceType: "repair",
      serviceName: "Sửa điều hòa",
      description: "Điều hòa không lạnh, cần kiểm tra và sửa chữa",
      status: "in-progress",
      requestDate: new Date("2024-12-10"),
      cost: 200000,
      note: "Thợ sẽ đến vào chiều thứ 6",
    },
    {
      id: "SR002",
      serviceType: "cleaning",
      serviceName: "Vệ sinh phòng",
      description: "Dọn dẹp phòng định kỳ hàng tháng",
      status: "completed",
      requestDate: new Date("2024-12-01"),
      completionDate: new Date("2024-12-02"),
      cost: 150000,
    },
    {
      id: "SR003",
      serviceType: "maintenance",
      serviceName: "Thay bóng đèn",
      description: "Đèn trong phòng bị hỏng cần thay mới",
      status: "pending",
      requestDate: new Date("2024-12-12"),
    },
  ];

  // Mock available rooms for request
  // const availableRooms = [
  //   {
  //     id: "R004",
  //     title: "Phòng trọ mới xây",
  //     price: 3000000,
  //     address: "Hà Nội",
  //   },
  //   {
  //     id: "R005",
  //     title: "Phòng có ban công",
  //     price: 3800000,
  //     address: "Hà Nội",
  //   },
  //   { id: "R006", title: "Phòng gần Metro", price: 4000000, address: "Hà Nội" },
  // ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("vi-VN");
  };

  const getStatusBadge = (status: RentalRequest["status"]) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning">Chờ duyệt</Badge>;
      case "approved":
        return <Badge bg="success">Đã chấp nhận</Badge>;
      case "rejected":
        return <Badge bg="danger">Từ chối</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const getServiceStatusBadge = (status: ServiceRequest["status"]) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning">Chờ xử lý</Badge>;
      case "in-progress":
        return <Badge bg="info">Đang xử lý</Badge>;
      case "completed":
        return <Badge bg="success">Hoàn thành</Badge>;
      case "cancelled":
        return <Badge bg="danger">Đã hủy</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: RentalRequest["status"]) => {
    switch (status) {
      case "pending":
        return <FaClock className="text-warning" />;
      case "approved":
        return <FaCheckCircle className="text-success" />;
      case "rejected":
        return <FaTimesCircle className="text-danger" />;
    }
  };

  // const handleOpenRequestModal = (roomId: string) => {
  //   setSelectedRoomId(roomId);
  //   setRequestForm({
  //     fullName: "",
  //     phone: "",
  //     email: "",
  //     idCard: "",
  //     occupation: "",
  //     currentAddress: "",
  //     message: "",
  //     moveInDate: "",
  //   });
  //   setShowRequestModal(true);
  // };

  const handleSubmitRequest = () => {
    // Validate required fields
    if (!requestForm.fullName || !requestForm.phone || !requestForm.email) {
      alert("Vui lòng điền đầy đủ thông tin cá nhân!");
      return;
    }
    if (!requestForm.moveInDate) {
      alert("Vui lòng chọn ngày dự kiến chuyển vào!");
      return;
    }

    console.log("Submitting rental request:", {
      ...requestForm,
    });

    alert(
      "Yêu cầu thuê phòng đã được gửi! Chủ trọ sẽ xem xét và phản hồi sớm."
    );
    setShowRequestModal(false);
    // TODO: Call API to submit request
  };

  const handleCancelRequest = (requestId: string) => {
    if (window.confirm("Bạn có chắc muốn hủy yêu cầu này?")) {
      console.log("Canceling request:", requestId);
      alert("Đã hủy yêu cầu!");
      // TODO: Call API to cancel request
    }
  };

  const handleViewRoom = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <FaPaperPlane className="me-2 text-primary" />
            Yêu cầu của tôi
          </h2>
          <p className="text-muted mb-0">
            Quản lý các yêu cầu thuê phòng và dịch vụ
          </p>
        </div>
      </div>

      <Tab.Container
        defaultActiveKey={isSeeker ? "rental-requests" : "service-requests"}
      >
        <Nav variant="tabs" className="mb-4">
          {isSeeker && (
            <Nav.Item>
              <Nav.Link eventKey="rental-requests">
                <FaHome className="me-2" />
                Yêu cầu thuê phòng
                <Badge bg="warning" className="ms-2">
                  {myRequests.filter((r) => r.status === "pending").length}
                </Badge>
              </Nav.Link>
            </Nav.Item>
          )}
          {isTenant && (
            <Nav.Item>
              <Nav.Link eventKey="service-requests">
                <FaTools className="me-2" />
                Yêu cầu dịch vụ
                <Badge bg="warning" className="ms-2">
                  {serviceRequests.filter((s) => s.status === "pending").length}
                </Badge>
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>

        <Tab.Content>
          {/* Tab 1: Yêu cầu thuê phòng - Chỉ cho Seeker */}
          {isSeeker && (
            <Tab.Pane eventKey="rental-requests">
              {/* Statistics Cards */}
              <Row className="g-3 mb-4">
                <Col md={4}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted mb-1">Chờ duyệt</p>
                          <h3 className="mb-0">
                            {
                              myRequests.filter((r) => r.status === "pending")
                                .length
                            }
                          </h3>
                        </div>
                        <div className="bg-warning bg-opacity-10 p-3 rounded">
                          <FaClock size={24} className="text-warning" />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted mb-1">Đã chấp nhận</p>
                          <h3 className="mb-0">
                            {
                              myRequests.filter((r) => r.status === "approved")
                                .length
                            }
                          </h3>
                        </div>
                        <div className="bg-success bg-opacity-10 p-3 rounded">
                          <FaCheckCircle size={24} className="text-success" />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted mb-1">Từ chối</p>
                          <h3 className="mb-0">
                            {
                              myRequests.filter((r) => r.status === "rejected")
                                .length
                            }
                          </h3>
                        </div>
                        <div className="bg-danger bg-opacity-10 p-3 rounded">
                          <FaTimesCircle size={24} className="text-danger" />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* My Requests Table */}
              <Card className="shadow-sm mb-4">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Yêu cầu của tôi</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  {myRequests.length === 0 ? (
                    <div className="text-center py-5">
                      <FaHome size={48} className="text-muted mb-3" />
                      <p className="text-muted">
                        Bạn chưa có yêu cầu thuê phòng nào.
                      </p>
                      <Button
                        variant="primary"
                        onClick={() => navigate("/search")}
                      >
                        Tìm phòng trọ
                      </Button>
                    </div>
                  ) : (
                    <Table hover responsive className="mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th>Trạng thái</th>
                          <th>Phòng</th>
                          <th>Giá thuê</th>
                          <th>Ngày chuyển vào</th>
                          <th>Ngày gửi</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myRequests.map((request) => (
                          <tr key={request.id}>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                {getStatusIcon(request.status)}
                                {getStatusBadge(request.status)}
                              </div>
                            </td>
                            <td>
                              <div>
                                <div className="fw-semibold">
                                  {request.roomTitle}
                                </div>
                                <small className="text-muted">
                                  {request.roomAddress}
                                </small>
                              </div>
                            </td>
                            <td className="fw-bold text-primary">
                              {formatPrice(request.roomPrice)}
                            </td>
                            <td>
                              {request.moveInDate
                                ? formatDate(request.moveInDate)
                                : "-"}
                            </td>
                            <td>{formatDate(request.requestDate)}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <Button
                                  variant="outline-info"
                                  size="sm"
                                  onClick={() => handleViewRoom(request.roomId)}
                                >
                                  Xem phòng
                                </Button>
                                {request.status === "pending" && (
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() =>
                                      handleCancelRequest(request.id)
                                    }
                                  >
                                    Hủy
                                  </Button>
                                )}
                                {request.status === "approved" && (
                                  <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => navigate("/my-rental")}
                                  >
                                    Xem chi tiết
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </Card>

              {/* Request Details */}
              {myRequests.some((r) => r.status === "rejected") && (
                <Card className="shadow-sm border-danger">
                  <Card.Header className="bg-danger text-white">
                    <h6 className="mb-0">Lý do từ chối</h6>
                  </Card.Header>
                  <Card.Body>
                    {myRequests
                      .filter((r) => r.status === "rejected")
                      .map((request) => (
                        <Alert
                          key={request.id}
                          variant="danger"
                          className="mb-2"
                        >
                          <strong>{request.roomTitle}:</strong>{" "}
                          {request.rejectionReason || "Không có lý do cụ thể"}
                        </Alert>
                      ))}
                  </Card.Body>
                </Card>
              )}

              {/* Request Modal */}
              <Modal
                show={showRequestModal}
                onHide={() => setShowRequestModal(false)}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Gửi yêu cầu thuê phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Alert variant="info">
                    <FaPaperPlane className="me-2" />
                    Yêu cầu của bạn sẽ được gửi đến chủ trọ để xem xét.
                  </Alert>

                  <h6 className="mb-3">Thông tin cá nhân</h6>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Họ và tên <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập họ tên đầy đủ"
                      value={requestForm.fullName}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
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
                          value={requestForm.phone}
                          onChange={(e) =>
                            setRequestForm({
                              ...requestForm,
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
                          value={requestForm.email}
                          onChange={(e) =>
                            setRequestForm({
                              ...requestForm,
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
                          value={requestForm.idCard}
                          onChange={(e) =>
                            setRequestForm({
                              ...requestForm,
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
                          value={requestForm.occupation}
                          onChange={(e) =>
                            setRequestForm({
                              ...requestForm,
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
                      value={requestForm.currentAddress}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          currentAddress: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <hr />
                  <h6 className="mb-3">Thông tin thuê phòng</h6>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Ngày dự kiến chuyển vào{" "}
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={requestForm.moveInDate}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
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
                      value={requestForm.message}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          message: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Alert variant="warning" className="small mb-0">
                    <strong>Lưu ý:</strong> Chủ trọ sẽ xem xét yêu cầu và liên
                    hệ lại với bạn trong thời gian sớm nhất.
                  </Alert>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowRequestModal(false)}
                  >
                    Hủy
                  </Button>
                  <Button variant="primary" onClick={handleSubmitRequest}>
                    <FaPaperPlane className="me-2" />
                    Gửi yêu cầu
                  </Button>
                </Modal.Footer>
              </Modal>
            </Tab.Pane>
          )}

          {/* Tab 2: Yêu cầu dịch vụ - Chỉ cho Tenant */}
          {isTenant && (
            <Tab.Pane eventKey="service-requests">
              <Row className="g-3 mb-4">
                <Col md={4}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted mb-1">Chờ xử lý</p>
                          <h3 className="mb-0">
                            {
                              serviceRequests.filter(
                                (s) => s.status === "pending"
                              ).length
                            }
                          </h3>
                        </div>
                        <div className="bg-warning bg-opacity-10 p-3 rounded">
                          <FaClock size={24} className="text-warning" />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted mb-1">Đang xử lý</p>
                          <h3 className="mb-0">
                            {
                              serviceRequests.filter(
                                (s) => s.status === "in-progress"
                              ).length
                            }
                          </h3>
                        </div>
                        <div className="bg-info bg-opacity-10 p-3 rounded">
                          <FaTools size={24} className="text-info" />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted mb-1">Hoàn thành</p>
                          <h3 className="mb-0">
                            {
                              serviceRequests.filter(
                                (s) => s.status === "completed"
                              ).length
                            }
                          </h3>
                        </div>
                        <div className="bg-success bg-opacity-10 p-3 rounded">
                          <FaCheckCircle size={24} className="text-success" />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h5 className="mb-3">Danh sách yêu cầu dịch vụ</h5>
                  <Table hover responsive>
                    <thead className="table-light">
                      <tr>
                        <th>Mã yêu cầu</th>
                        <th>Dịch vụ</th>
                        <th>Mô tả</th>
                        <th>Ngày yêu cầu</th>
                        <th>Trạng thái</th>
                        <th>Chi phí</th>
                        <th>Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceRequests.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="text-center text-muted py-4"
                          >
                            Chưa có yêu cầu dịch vụ nào
                          </td>
                        </tr>
                      ) : (
                        serviceRequests.map((request) => (
                          <tr key={request.id}>
                            <td>
                              <strong className="text-primary">
                                {request.id}
                              </strong>
                            </td>
                            <td>
                              <div>
                                <strong>{request.serviceName}</strong>
                                <div className="small text-muted">
                                  {request.serviceType}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div
                                className="text-truncate"
                                style={{ maxWidth: "200px" }}
                              >
                                {request.description}
                              </div>
                            </td>
                            <td>{formatDate(request.requestDate)}</td>
                            <td>{getServiceStatusBadge(request.status)}</td>
                            <td>
                              {request.cost ? (
                                <strong className="text-success">
                                  {formatPrice(request.cost)}
                                </strong>
                              ) : (
                                <span className="text-muted">
                                  Chưa xác định
                                </span>
                              )}
                            </td>
                            <td>
                              {request.note ? (
                                <span className="small text-muted">
                                  {request.note}
                                </span>
                              ) : (
                                <span className="text-muted">-</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Tab.Pane>
          )}
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default MyRequestsPage;
