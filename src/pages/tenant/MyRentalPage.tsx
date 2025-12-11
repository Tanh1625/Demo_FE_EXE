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
  Row,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import {
  FaBolt,
  FaCheckCircle,
  FaClipboardList,
  FaClock,
  FaExclamationCircle,
  FaFileContract,
  FaHome,
  FaPhone,
  FaTint,
  FaTools,
  FaUser,
  FaWallet,
} from "react-icons/fa";
import type {
  MaintenanceRequest,
  RentalContract,
  RentalPayment,
  RentalUtilityReading,
} from "../../types";

const MyRentalPage: React.FC = () => {
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showCancelContractModal, setShowCancelContractModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [newRequest, setNewRequest] = useState({
    title: "",
    category: "other" as MaintenanceRequest["category"],
    description: "",
  });

  // Mock data - trong thực tế sẽ fetch từ API
  const rentalContract: RentalContract = {
    id: "RC001",
    roomId: "R001",
    roomTitle: "Phòng trọ cao cấp gần trường ĐH",
    roomAddress: "123 Đường Láng, Đống Đa, Hà Nội",
    roomImages: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    landlordName: "Nguyễn Văn A",
    landlordPhone: "0901234567",
    landlordEmail: "landlord@demo.com",
    monthlyRent: 3500000,
    deposit: 7000000,
    startDate: "2024-01-01",
    endDate: "2025-01-01",
    contractStatus: "active",
    electricityRate: 3500,
    waterRate: 25000,
    additionalServices: [
      { name: "Internet", price: 100000 },
      { name: "Vệ sinh chung", price: 50000 },
    ],
  };

  const utilityReadings: RentalUtilityReading[] = [
    {
      id: "UR001",
      month: "2024-11",
      electricityPrevious: 100,
      electricityCurrent: 150,
      electricityUsage: 50,
      waterPrevious: 20,
      waterCurrent: 25,
      waterUsage: 5,
      totalAmount: 300000,
      isPaid: false,
    },
    {
      id: "UR002",
      month: "2024-10",
      electricityPrevious: 50,
      electricityCurrent: 100,
      electricityUsage: 50,
      waterPrevious: 15,
      waterCurrent: 20,
      waterUsage: 5,
      totalAmount: 300000,
      isPaid: true,
      paidDate: "2024-10-05",
    },
  ];

  const payments: RentalPayment[] = [
    {
      id: "PAY001",
      month: "2024-11",
      rentAmount: 3500000,
      electricityAmount: 175000,
      waterAmount: 125000,
      serviceAmount: 150000,
      totalAmount: 3950000,
      isPaid: false,
      dueDate: "2024-11-05",
    },
    {
      id: "PAY002",
      month: "2024-10",
      rentAmount: 3500000,
      electricityAmount: 175000,
      waterAmount: 125000,
      serviceAmount: 150000,
      totalAmount: 3950000,
      isPaid: true,
      paidDate: "2024-10-03",
      dueDate: "2024-10-05",
    },
  ];

  const maintenanceRequests: MaintenanceRequest[] = [
    {
      id: "MR001",
      title: "Vòi nước bị hỏng",
      description: "Vòi nước trong phòng tắm bị rỉ nước",
      category: "plumbing",
      status: "in-progress",
      createdDate: "2024-11-01",
    },
    {
      id: "MR002",
      title: "Đèn trong phòng không sáng",
      description: "Đèn trần phòng ngủ không hoạt động",
      category: "electrical",
      status: "completed",
      createdDate: "2024-10-15",
      completedDate: "2024-10-16",
      response: "Đã thay bóng đèn mới",
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: "success",
      expired: "danger",
      terminated: "secondary",
      pending: "warning",
      "in-progress": "info",
      completed: "success",
      rejected: "danger",
    };
    return variants[status] || "secondary";
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      active: "Đang hiệu lực",
      expired: "Đã hết hạn",
      terminated: "Đã chấm dứt",
      pending: "Chờ xử lý",
      "in-progress": "Đang xử lý",
      completed: "Hoàn thành",
      rejected: "Từ chối",
    };
    return texts[status] || status;
  };

  const getCategoryText = (category: string) => {
    const texts: Record<string, string> = {
      plumbing: "Ống nước",
      electrical: "Điện",
      furniture: "Nội thất",
      other: "Khác",
    };
    return texts[category] || category;
  };

  const handleSubmitMaintenanceRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New maintenance request:", newRequest);
    // TODO: Submit to API
    setShowMaintenanceModal(false);
    setNewRequest({ title: "", category: "other", description: "" });
  };

  const handleCancelContract = () => {
    if (!cancelReason.trim()) {
      alert("Vui lòng nhập lý do hủy hợp đồng!");
      return;
    }
    console.log("Cancel contract with reason:", cancelReason);
    // TODO: Submit cancel request to API
    alert("Yêu cầu hủy hợp đồng đã được gửi đến chủ trọ!");
    setShowCancelContractModal(false);
    setCancelReason("");
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaHome className="me-2 text-primary" />
          Thông Tin Trọ Của Tôi
        </h2>
      </div>

      {/* Contract Overview Card */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={8}>
              <h4 className="mb-3">{rentalContract.roomTitle}</h4>
              <p className="text-muted mb-2">
                <FaHome className="me-2" />
                {rentalContract.roomAddress}
              </p>
              <p className="mb-2">
                <FaUser className="me-2" />
                <strong>Chủ trọ:</strong> {rentalContract.landlordName}
              </p>
              <p className="mb-2">
                <FaPhone className="me-2" />
                <strong>Số điện thoại:</strong> {rentalContract.landlordPhone}
              </p>
              <div className="mt-3">
                <Badge
                  bg={getStatusBadge(rentalContract.contractStatus)}
                  className="me-2"
                >
                  {getStatusText(rentalContract.contractStatus)}
                </Badge>
                <Badge bg="info">
                  <FaFileContract className="me-1" />
                  {formatDate(rentalContract.startDate)} -{" "}
                  {formatDate(rentalContract.endDate)}
                </Badge>
              </div>
            </Col>
            <Col md={4} className="text-end">
              <div className="mb-3">
                <h5 className="text-muted mb-1">Tiền thuê/tháng</h5>
                <h3 className="text-primary mb-0">
                  {formatPrice(rentalContract.monthlyRent)}
                </h3>
              </div>
              <div className="mb-3">
                <h5 className="text-muted mb-1">Tiền cọc</h5>
                <h5 className="mb-0">{formatPrice(rentalContract.deposit)}</h5>
              </div>
              {rentalContract.contractStatus === "active" && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => setShowCancelContractModal(true)}
                >
                  Yêu cầu hủy hợp đồng
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultActiveKey="payments" className="mb-3">
        {/* Payments Tab */}
        <Tab
          eventKey="payments"
          title={
            <>
              <FaWallet className="me-2" />
              Thanh toán
            </>
          }
        >
          <Card className="shadow-sm">
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Tháng</th>
                    <th>Tiền thuê</th>
                    <th>Điện</th>
                    <th>Nước</th>
                    <th>Dịch vụ</th>
                    <th>Tổng cộng</th>
                    <th>Hạn thanh toán</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.month}</td>
                      <td>{formatPrice(payment.rentAmount)}</td>
                      <td>{formatPrice(payment.electricityAmount)}</td>
                      <td>{formatPrice(payment.waterAmount)}</td>
                      <td>{formatPrice(payment.serviceAmount)}</td>
                      <td>
                        <strong className="text-primary">
                          {formatPrice(payment.totalAmount)}
                        </strong>
                      </td>
                      <td>{formatDate(payment.dueDate)}</td>
                      <td>
                        {payment.isPaid ? (
                          <Badge bg="success">
                            <FaCheckCircle className="me-1" />
                            Đã thanh toán
                          </Badge>
                        ) : (
                          <Badge bg="warning">
                            <FaClock className="me-1" />
                            Chưa thanh toán
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        {/* Utility Readings Tab */}
        <Tab
          eventKey="utilities"
          title={
            <>
              <FaBolt className="me-2" />
              Chỉ số điện nước
            </>
          }
        >
          <Card className="shadow-sm">
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Tháng</th>
                    <th>
                      <FaBolt className="text-warning me-1" />
                      Điện cũ
                    </th>
                    <th>
                      <FaBolt className="text-warning me-1" />
                      Điện mới
                    </th>
                    <th>
                      <FaBolt className="text-warning me-1" />
                      Sử dụng (kWh)
                    </th>
                    <th>
                      <FaTint className="text-info me-1" />
                      Nước cũ
                    </th>
                    <th>
                      <FaTint className="text-info me-1" />
                      Nước mới
                    </th>
                    <th>
                      <FaTint className="text-info me-1" />
                      Sử dụng (m³)
                    </th>
                    <th>Thành tiền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {utilityReadings.map((reading) => (
                    <tr key={reading.id}>
                      <td>{reading.month}</td>
                      <td>{reading.electricityPrevious}</td>
                      <td>{reading.electricityCurrent}</td>
                      <td>
                        <strong>{reading.electricityUsage}</strong>
                      </td>
                      <td>{reading.waterPrevious}</td>
                      <td>{reading.waterCurrent}</td>
                      <td>
                        <strong>{reading.waterUsage}</strong>
                      </td>
                      <td>
                        <strong className="text-primary">
                          {formatPrice(reading.totalAmount)}
                        </strong>
                      </td>
                      <td>
                        {reading.isPaid ? (
                          <Badge bg="success">
                            <FaCheckCircle className="me-1" />
                            Đã thanh toán
                          </Badge>
                        ) : (
                          <Badge bg="warning">
                            <FaClock className="me-1" />
                            Chưa thanh toán
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="mt-3 p-3 bg-light rounded">
                <Row>
                  <Col md={6}>
                    <small className="text-muted">Đơn giá điện:</small>
                    <p className="mb-0">
                      <strong>
                        {formatPrice(rentalContract.electricityRate)}/kWh
                      </strong>
                    </p>
                  </Col>
                  <Col md={6}>
                    <small className="text-muted">Đơn giá nước:</small>
                    <p className="mb-0">
                      <strong>
                        {formatPrice(rentalContract.waterRate)}/m³
                      </strong>
                    </p>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Tab>

        {/* Maintenance Tab */}
        <Tab
          eventKey="maintenance"
          title={
            <>
              <FaTools className="me-2" />
              Yêu cầu sửa chữa
            </>
          }
        >
          <div className="mb-3">
            <Button
              variant="primary"
              onClick={() => setShowMaintenanceModal(true)}
            >
              <FaTools className="me-2" />
              Tạo yêu cầu mới
            </Button>
          </div>

          <Row>
            {maintenanceRequests.map((request) => (
              <Col md={6} key={request.id} className="mb-3">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5>{request.title}</h5>
                      <Badge bg={getStatusBadge(request.status)}>
                        {getStatusText(request.status)}
                      </Badge>
                    </div>
                    <p className="text-muted mb-2">{request.description}</p>
                    <div className="mb-2">
                      <Badge bg="secondary" className="me-2">
                        {getCategoryText(request.category)}
                      </Badge>
                      <small className="text-muted">
                        <FaClock className="me-1" />
                        {formatDate(request.createdDate)}
                      </small>
                    </div>
                    {request.response && (
                      <div className="mt-3 p-2 bg-light rounded">
                        <small className="text-muted">
                          <FaClipboardList className="me-1" />
                          Phản hồi:
                        </small>
                        <p className="mb-0 mt-1">{request.response}</p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

        {/* Contract Details Tab */}
        <Tab
          eventKey="contract"
          title={
            <>
              <FaFileContract className="me-2" />
              Chi tiết hợp đồng
            </>
          }
        >
          <Card className="shadow-sm">
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <h5 className="mb-3">Thông tin hợp đồng</h5>
                  <div className="mb-2">
                    <small className="text-muted">Mã hợp đồng:</small>
                    <p className="mb-0">
                      <strong>{rentalContract.id}</strong>
                    </p>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Ngày bắt đầu:</small>
                    <p className="mb-0">
                      {formatDate(rentalContract.startDate)}
                    </p>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Ngày kết thúc:</small>
                    <p className="mb-0">{formatDate(rentalContract.endDate)}</p>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Trạng thái:</small>
                    <p className="mb-0">
                      <Badge bg={getStatusBadge(rentalContract.contractStatus)}>
                        {getStatusText(rentalContract.contractStatus)}
                      </Badge>
                    </p>
                  </div>
                </Col>

                <Col md={6} className="mb-3">
                  <h5 className="mb-3">Chi phí</h5>
                  <div className="mb-2">
                    <small className="text-muted">Tiền thuê/tháng:</small>
                    <p className="mb-0">
                      <strong className="text-primary">
                        {formatPrice(rentalContract.monthlyRent)}
                      </strong>
                    </p>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Tiền đặt cọc:</small>
                    <p className="mb-0">
                      {formatPrice(rentalContract.deposit)}
                    </p>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Dịch vụ bổ sung:</small>
                    {rentalContract.additionalServices.map((service, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between"
                      >
                        <span>• {service.name}:</span>
                        <span>{formatPrice(service.price)}</span>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>

              <hr />

              <h5 className="mb-3">Hình ảnh phòng</h5>
              <Row>
                {rentalContract.roomImages.map((image, index) => (
                  <Col md={4} key={index} className="mb-3">
                    <img
                      src={image}
                      alt={`Room ${index + 1}`}
                      className="img-fluid rounded shadow-sm"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Maintenance Request Modal */}
      <Modal
        show={showMaintenanceModal}
        onHide={() => setShowMaintenanceModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FaTools className="me-2" />
            Tạo yêu cầu sửa chữa
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitMaintenanceRequest}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>
                Tiêu đề <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Vd: Vòi nước bị hỏng"
                value={newRequest.title}
                onChange={(e) =>
                  setNewRequest({ ...newRequest, title: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Danh mục <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={newRequest.category}
                onChange={(e) =>
                  setNewRequest({
                    ...newRequest,
                    category: e.target.value as MaintenanceRequest["category"],
                  })
                }
                required
              >
                <option value="plumbing">Ống nước</option>
                <option value="electrical">Điện</option>
                <option value="furniture">Nội thất</option>
                <option value="other">Khác</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Mô tả chi tiết <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Mô tả chi tiết vấn đề..."
                value={newRequest.description}
                onChange={(e) =>
                  setNewRequest({ ...newRequest, description: e.target.value })
                }
                required
              />
            </Form.Group>

            <div className="alert alert-info">
              <FaExclamationCircle className="me-2" />
              Chủ trọ sẽ nhận được thông báo và liên hệ với bạn trong thời gian
              sớm nhất.
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowMaintenanceModal(false)}
            >
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              <FaTools className="me-2" />
              Gửi yêu cầu
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Cancel Contract Modal */}
      <Modal
        show={showCancelContractModal}
        onHide={() => setShowCancelContractModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            Yêu cầu hủy hợp đồng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            <FaExclamationCircle className="me-2" />
            <strong>Lưu ý:</strong> Việc hủy hợp đồng trước thời hạn có thể ảnh
            hưởng đến tiền cọc của bạn. Vui lòng liên hệ trực tiếp với chủ trọ
            để thỏa thuận.
          </Alert>

          <Form.Group className="mb-3">
            <Form.Label>
              Lý do hủy hợp đồng <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Vui lòng nêu rõ lý do hủy hợp đồng..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              required
            />
          </Form.Group>

          <div className="border-top pt-3">
            <p className="mb-2">
              <strong>Thông tin hợp đồng:</strong>
            </p>
            <p className="mb-1 text-muted">Phòng: {rentalContract.roomTitle}</p>
            <p className="mb-1 text-muted">
              Tiền thuê: {formatPrice(rentalContract.monthlyRent)}/tháng
            </p>
            <p className="mb-1 text-muted">
              Tiền cọc: {formatPrice(rentalContract.deposit)}
            </p>
            <p className="mb-1 text-muted">
              Ngày bắt đầu: {formatDate(rentalContract.startDate)}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCancelContractModal(false)}
          >
            Đóng
          </Button>
          <Button variant="danger" onClick={handleCancelContract}>
            Xác nhận hủy hợp đồng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyRentalPage;
