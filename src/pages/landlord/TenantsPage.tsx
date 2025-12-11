import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import {
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaEnvelope,
  FaEye,
  FaHome,
  FaPaperPlane,
  FaPhone,
  FaPlus,
  FaTimesCircle,
  FaTrash,
  FaUser,
  FaUsers,
} from "react-icons/fa";

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomId: string;
  roomName: string;
  moveInDate: Date;
  contractEndDate: Date;
  deposit: number;
  monthlyRent: number;
  status: "active" | "pending" | "terminated";
  avatar?: string;
  idCard: string;
  linkedRoomId?: string; // ID phòng đã liên kết
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  notes?: string;
}

interface Contract {
  id: string;
  tenantId: string;
  tenantName: string;
  roomId: string;
  roomName: string;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  deposit: number;
  status: "active" | "expired" | "terminated";
  renewalCount: number;
}

interface RentalRequest {
  id: string;
  roomId: string;
  roomTitle: string;
  roomPrice: number;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
  moveInDate?: string;
  requestDate: Date;
}

const TenantsPage: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showLinkRoomModal, setShowLinkRoomModal] = useState(false);
  const [showRequestDetailModal, setShowRequestDetailModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<RentalRequest | null>(
    null
  );
  const [selectedRoomForLink, setSelectedRoomForLink] = useState("");
  const [activeTab, setActiveTab] = useState("tenants");

  const [tenantForm, setTenantForm] = useState({
    name: "",
    email: "",
    phone: "",
    roomId: "",
    moveInDate: "",
    contractEndDate: "",
    deposit: 0,
    monthlyRent: 0,
    idCard: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    notes: "",
  });

  // Mock rooms data
  const availableRooms = [
    { id: "room1", name: "Phòng A101", baseRent: 3500000 },
    { id: "room2", name: "Phòng A102", baseRent: 3200000 },
    { id: "room3", name: "Phòng B205", baseRent: 4200000 },
    { id: "room4", name: "Phòng C301", baseRent: 2800000 },
  ];

  // Mock tenants data
  const mockTenants: Tenant[] = [
    {
      id: "1",
      name: "Nguyễn Văn An",
      email: "nguyenvanan@gmail.com",
      phone: "0123456789",
      roomId: "room1",
      roomName: "Phòng A101",
      moveInDate: new Date("2024-01-15"),
      contractEndDate: new Date("2024-07-15"),
      deposit: 7000000,
      monthlyRent: 3500000,
      status: "active",
      idCard: "123456789012",
      linkedRoomId: "room1", // Đã liên kết
      emergencyContact: {
        name: "Nguyễn Thị Lan",
        phone: "0987654321",
        relationship: "Mẹ",
      },
      notes: "Khách thuê tốt, thanh toán đúng hạn",
    },
    {
      id: "2",
      name: "Trần Thị Bích",
      email: "tranthibich@gmail.com",
      phone: "0987123456",
      roomId: "room2",
      roomName: "Phòng A102",
      moveInDate: new Date("2024-02-01"),
      contractEndDate: new Date("2024-08-01"),
      deposit: 6400000,
      monthlyRent: 3200000,
      status: "active",
      idCard: "987654321098",
      linkedRoomId: "room2", // Đã liên kết
      emergencyContact: {
        name: "Trần Văn Nam",
        phone: "0901234567",
        relationship: "Anh trai",
      },
    },
    {
      id: "3",
      name: "Lê Minh Khôi",
      email: "leminhkhoi@gmail.com",
      phone: "0912345678",
      roomId: "room3",
      roomName: "Phòng B205",
      moveInDate: new Date("2023-12-01"),
      contractEndDate: new Date("2024-06-01"),
      deposit: 8400000,
      monthlyRent: 4200000,
      status: "terminated",
      idCard: "456789123456",
      emergencyContact: {
        name: "Lê Thị Mai",
        phone: "0934567890",
        relationship: "Chị gái",
      },
      notes: "Đã trả phòng sớm do chuyển công tác",
    },
  ];

  // Mock contracts data
  const mockContracts: Contract[] = [
    {
      id: "1",
      tenantId: "1",
      tenantName: "Nguyễn Văn An",
      roomId: "room1",
      roomName: "Phòng A101",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-07-15"),
      monthlyRent: 3500000,
      deposit: 7000000,
      status: "active",
      renewalCount: 0,
    },
    {
      id: "2",
      tenantId: "2",
      tenantName: "Trần Thị Bích",
      roomId: "room2",
      roomName: "Phòng A102",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-08-01"),
      monthlyRent: 3200000,
      deposit: 6400000,
      status: "active",
      renewalCount: 1,
    },
    {
      id: "3",
      tenantId: "3",
      tenantName: "Lê Minh Khôi",
      roomId: "room3",
      roomName: "Phòng B205",
      startDate: new Date("2023-12-01"),
      endDate: new Date("2024-06-01"),
      monthlyRent: 4200000,
      deposit: 8400000,
      status: "terminated",
      renewalCount: 0,
    },
  ];

  // Mock rental requests
  const mockRentalRequests: RentalRequest[] = [
    {
      id: "REQ001",
      roomId: "room4",
      roomTitle: "Phòng C301",
      roomPrice: 2800000,
      requesterId: "USER001",
      requesterName: "Phạm Thị Hương",
      requesterEmail: "huong@example.com",
      requesterPhone: "0934567890",
      status: "pending",
      message: "Em là sinh viên, muốn thuê phòng dài hạn từ tháng 1/2025.",
      moveInDate: "2025-01-01",
      requestDate: new Date("2024-12-08"),
    },
    {
      id: "REQ002",
      roomId: "room1",
      roomTitle: "Phòng A101",
      roomPrice: 3500000,
      requesterId: "USER002",
      requesterName: "Nguyễn Đức Anh",
      requesterEmail: "ducanh@example.com",
      requesterPhone: "0912345678",
      status: "pending",
      message: "Anh làm việc gần đây, cần thuê ngay.",
      moveInDate: "2024-12-15",
      requestDate: new Date("2024-12-09"),
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTenants(mockTenants);
      setContracts(mockContracts);
      setRentalRequests(mockRentalRequests);
      setLoading(false);
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge bg="success">Đang thuê</Badge>;
      case "pending":
        return <Badge bg="warning">Chờ xử lý</Badge>;
      case "terminated":
        return <Badge bg="secondary">Đã kết thúc</Badge>;
      case "expired":
        return <Badge bg="danger">Hết hạn</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const handleViewTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setShowDetailModal(true);
  };

  const handleAddTenant = () => {
    setTenantForm({
      name: "",
      email: "",
      phone: "",
      roomId: "",
      moveInDate: "",
      contractEndDate: "",
      deposit: 0,
      monthlyRent: 0,
      idCard: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelationship: "",
      notes: "",
    });
    setShowAddModal(true);
  };

  const handleFormChange = (field: string, value: any) => {
    setTenantForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-fill monthly rent based on selected room
    if (field === "roomId") {
      const room = availableRooms.find((r) => r.id === value);
      if (room) {
        setTenantForm((prev) => ({
          ...prev,
          monthlyRent: room.baseRent,
          deposit: room.baseRent * 2, // 2 months deposit
        }));
      }
    }
  };

  const handleSaveTenant = () => {
    console.log("Saving tenant:", tenantForm);
    // Implement save logic here
    setShowAddModal(false);
  };

  const handleDeleteTenant = (tenantId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách thuê này?")) {
      console.log("Deleting tenant:", tenantId);
      // Implement delete logic here
    }
  };

  const handleLinkRoom = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setSelectedRoomForLink(tenant.roomId || "");
    setShowLinkRoomModal(true);
  };

  const handleSaveLinkRoom = () => {
    if (!selectedTenant || !selectedRoomForLink) {
      alert("Vui lòng chọn phòng!");
      return;
    }
    console.log(
      "Linking room:",
      selectedRoomForLink,
      "to tenant:",
      selectedTenant.id
    );
    // Implement link room logic here
    // This should also update the tenant's linkedRoomId in the backend
    alert("Đã liên kết phòng thành công!");
    setShowLinkRoomModal(false);
  };

  const handleCancelContract = (tenantId: string) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn hủy hợp đồng này? Thao tác này không thể hoàn tác!"
      )
    ) {
      console.log("Canceling contract for tenant:", tenantId);
      // Implement cancel contract logic here
      // Update tenant status to "terminated"
      alert("Đã hủy hợp đồng!");
    }
  };

  const handleViewRequest = (request: RentalRequest) => {
    setSelectedRequest(request);
    setShowRequestDetailModal(true);
  };

  const handleApproveRequest = (requestId: string) => {
    console.log("Approving request:", requestId);
    alert("Đã chấp nhận yêu cầu! Vui lòng liên kết phòng cho khách thuê.");
    setShowRequestDetailModal(false);
    // TODO: Update request status to approved, Create tenant record
  };

  const handleRejectRequest = (requestId: string) => {
    const reason = prompt("Lý do từ chối:");
    if (reason) {
      console.log("Rejecting request:", requestId, "Reason:", reason);
      alert("Đã từ chối yêu cầu!");
      setShowRequestDetailModal(false);
      // TODO: Update request status to rejected with reason
    }
  };

  const getExpiringContracts = () => {
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

    return contracts.filter(
      (contract) =>
        contract.status === "active" && contract.endDate <= oneMonthFromNow
    );
  };

  const expiringContracts = getExpiringContracts();

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Quản lý khách thuê</h2>
      </div>

      {/* Alert for expiring contracts */}
      {expiringContracts.length > 0 && (
        <Alert variant="warning" className="mb-4">
          <Alert.Heading className="fs-6">
            ⚠️ Thông báo hợp đồng sắp hết hạn
          </Alert.Heading>
          <p className="mb-2">
            Có <strong>{expiringContracts.length}</strong> hợp đồng sẽ hết hạn
            trong tháng tới:
          </p>
          <ul className="mb-0">
            {expiringContracts.map((contract) => (
              <li key={contract.id}>
                <strong>{contract.tenantName}</strong> - {contract.roomName}
                (Hết hạn: {contract.endDate.toLocaleDateString("vi-VN")})
              </li>
            ))}
          </ul>
        </Alert>
      )}

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "tenants")}
        className="mb-4"
      >
        <Tab
          eventKey="tenants"
          title={
            <span>
              <FaUsers className="me-2" />
              Khách thuê ({tenants.filter((t) => t.status === "active").length})
            </span>
          }
        >
          <Card className="shadow-sm">
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Khách thuê</th>
                      <th>Phòng</th>
                      <th>Tiền thuê</th>
                      <th>Ngày vào</th>
                      <th>Hết hạn</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.map((tenant) => (
                      <tr key={tenant.id}>
                        <td>
                          <div>
                            <div className="fw-semibold">{tenant.name}</div>
                            <small className="text-muted">
                              <FaPhone className="me-1" />
                              {tenant.phone}
                            </small>
                          </div>
                        </td>
                        <td className="fw-semibold">{tenant.roomName}</td>
                        <td className="fw-bold text-primary">
                          {formatCurrency(tenant.monthlyRent)}
                        </td>
                        <td>{tenant.moveInDate.toLocaleDateString("vi-VN")}</td>
                        <td>
                          <span
                            className={
                              tenant.contractEndDate < new Date()
                                ? "text-danger"
                                : ""
                            }
                          >
                            {tenant.contractEndDate.toLocaleDateString("vi-VN")}
                          </span>
                        </td>
                        <td>{getStatusBadge(tenant.status)}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => handleViewTenant(tenant)}
                              title="Xem chi tiết"
                            >
                              <FaEye />
                            </Button>
                            <Button
                              variant="outline-warning"
                              size="sm"
                              title="Chỉnh sửa"
                            >
                              <FaEdit />
                            </Button>
                            {/* Chỉ hiện nút "Liên kết phòng" nếu chưa có linkedRoomId */}
                            {!tenant.linkedRoomId && (
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleLinkRoom(tenant)}
                                title="Liên kết phòng"
                              >
                                <FaHome />
                              </Button>
                            )}
                            {tenant.status === "active" && (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleCancelContract(tenant.id)}
                                title="Hủy hợp đồng"
                              >
                                <FaTrash />
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
        </Tab>

        <Tab
          eventKey="contracts"
          title={
            <span>
              Hợp đồng ({contracts.filter((c) => c.status === "active").length})
            </span>
          }
        >
          <Card className="shadow-sm">
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Khách thuê</th>
                    <th>Phòng</th>
                    <th>Thời hạn</th>
                    <th>Tiền thuê</th>
                    <th>Tiền cọc</th>
                    <th>Gia hạn</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((contract) => (
                    <tr key={contract.id}>
                      <td className="fw-semibold">{contract.tenantName}</td>
                      <td>{contract.roomName}</td>
                      <td>
                        <div className="small">
                          <div>
                            Từ: {contract.startDate.toLocaleDateString("vi-VN")}
                          </div>
                          <div>
                            Đến: {contract.endDate.toLocaleDateString("vi-VN")}
                          </div>
                        </div>
                      </td>
                      <td className="fw-bold text-primary">
                        {formatCurrency(contract.monthlyRent)}
                      </td>
                      <td>{formatCurrency(contract.deposit)}</td>
                      <td className="text-center">
                        <Badge bg="info">{contract.renewalCount}</Badge>
                      </td>
                      <td>{getStatusBadge(contract.status)}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            title="Gia hạn"
                          >
                            Gia hạn
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            title="In hợp đồng"
                          >
                            In
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        <Tab
          eventKey="requests"
          title={
            <span>
              Yêu cầu thuê phòng (
              {rentalRequests.filter((r) => r.status === "pending").length})
            </span>
          }
        >
          <Card className="shadow-sm">
            <Card.Body>
              {rentalRequests.length === 0 ? (
                <div className="text-center py-5">
                  <FaPaperPlane size={48} className="text-muted mb-3" />
                  <p className="text-muted">Chưa có yêu cầu thuê phòng nào.</p>
                </div>
              ) : (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Trạng thái</th>
                      <th>Người yêu cầu</th>
                      <th>Phòng</th>
                      <th>Giá</th>
                      <th>Ngày chuyển vào</th>
                      <th>Ngày gửi</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentalRequests.map((request) => (
                      <tr key={request.id}>
                        <td>
                          {request.status === "pending" && (
                            <Badge bg="warning">
                              <FaClock className="me-1" />
                              Chờ duyệt
                            </Badge>
                          )}
                          {request.status === "approved" && (
                            <Badge bg="success">
                              <FaCheckCircle className="me-1" />
                              Đã chấp nhận
                            </Badge>
                          )}
                          {request.status === "rejected" && (
                            <Badge bg="danger">
                              <FaTimesCircle className="me-1" />
                              Từ chối
                            </Badge>
                          )}
                        </td>
                        <td>
                          <div>
                            <div className="fw-semibold">
                              {request.requesterName}
                            </div>
                            <small className="text-muted">
                              <FaPhone className="me-1" />
                              {request.requesterPhone}
                            </small>
                          </div>
                        </td>
                        <td className="fw-semibold">{request.roomTitle}</td>
                        <td className="fw-bold text-primary">
                          {formatCurrency(request.roomPrice)}
                        </td>
                        <td>
                          {request.moveInDate
                            ? new Date(request.moveInDate).toLocaleDateString(
                                "vi-VN"
                              )
                            : "-"}
                        </td>
                        <td>
                          {request.requestDate.toLocaleDateString("vi-VN")}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => handleViewRequest(request)}
                              title="Xem chi tiết"
                            >
                              <FaEye />
                            </Button>
                            {request.status === "pending" && (
                              <>
                                <Button
                                  variant="success"
                                  size="sm"
                                  onClick={() =>
                                    handleApproveRequest(request.id)
                                  }
                                  title="Chấp nhận"
                                >
                                  <FaCheckCircle />
                                </Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() =>
                                    handleRejectRequest(request.id)
                                  }
                                  title="Từ chối"
                                >
                                  <FaTimesCircle />
                                </Button>
                              </>
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
        </Tab>
      </Tabs>

      {/* Add Tenant Modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm khách thuê mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ tên *</Form.Label>
                  <Form.Control
                    type="text"
                    value={tenantForm.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại *</Form.Label>
                  <Form.Control
                    type="tel"
                    value={tenantForm.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={tenantForm.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>CCCD/CMND *</Form.Label>
                  <Form.Control
                    type="text"
                    value={tenantForm.idCard}
                    onChange={(e) => handleFormChange("idCard", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Phòng thuê *</Form.Label>
              <Form.Select
                value={tenantForm.roomId}
                onChange={(e) => handleFormChange("roomId", e.target.value)}
                required
              >
                <option value="">Chọn phòng</option>
                {availableRooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} - {formatCurrency(room.baseRent)}/tháng
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ngày vào ở *</Form.Label>
                  <Form.Control
                    type="date"
                    value={tenantForm.moveInDate}
                    onChange={(e) =>
                      handleFormChange("moveInDate", e.target.value)
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ngày hết hạn *</Form.Label>
                  <Form.Control
                    type="date"
                    value={tenantForm.contractEndDate}
                    onChange={(e) =>
                      handleFormChange("contractEndDate", e.target.value)
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tiền thuê hàng tháng (VNĐ) *</Form.Label>
                  <Form.Control
                    type="number"
                    value={tenantForm.monthlyRent}
                    onChange={(e) =>
                      handleFormChange("monthlyRent", Number(e.target.value))
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tiền cọc (VNĐ) *</Form.Label>
                  <Form.Control
                    type="number"
                    value={tenantForm.deposit}
                    onChange={(e) =>
                      handleFormChange("deposit", Number(e.target.value))
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <h6 className="mb-3">Thông tin liên hệ khẩn cấp</h6>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ tên</Form.Label>
                  <Form.Control
                    type="text"
                    value={tenantForm.emergencyContactName}
                    onChange={(e) =>
                      handleFormChange("emergencyContactName", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="tel"
                    value={tenantForm.emergencyContactPhone}
                    onChange={(e) =>
                      handleFormChange("emergencyContactPhone", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Mối quan hệ</Form.Label>
                  <Form.Control
                    type="text"
                    value={tenantForm.emergencyContactRelationship}
                    onChange={(e) =>
                      handleFormChange(
                        "emergencyContactRelationship",
                        e.target.value
                      )
                    }
                    placeholder="VD: Bố, Mẹ, Anh, Chị..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={tenantForm.notes}
                onChange={(e) => handleFormChange("notes", e.target.value)}
                placeholder="Ghi chú thêm về khách thuê..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveTenant}>
            Lưu thông tin
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Tenant Detail Modal */}
      <Modal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chi tiết khách thuê</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTenant && (
            <Row>
              <Col md={8}>
                <h5>{selectedTenant.name}</h5>
                <Table borderless className="mb-0">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Phòng:</strong>
                      </td>
                      <td>{selectedTenant.roomName}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Điện thoại:</strong>
                      </td>
                      <td>
                        <FaPhone className="me-2" />
                        <a href={`tel:${selectedTenant.phone}`}>
                          {selectedTenant.phone}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email:</strong>
                      </td>
                      <td>
                        <FaEnvelope className="me-2" />
                        <a href={`mailto:${selectedTenant.email}`}>
                          {selectedTenant.email}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>CCCD/CMND:</strong>
                      </td>
                      <td>{selectedTenant.idCard}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Ngày vào ở:</strong>
                      </td>
                      <td>
                        {selectedTenant.moveInDate.toLocaleDateString("vi-VN")}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Hết hạn hợp đồng:</strong>
                      </td>
                      <td>
                        {selectedTenant.contractEndDate.toLocaleDateString(
                          "vi-VN"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tiền thuê:</strong>
                      </td>
                      <td className="fw-bold text-primary">
                        {formatCurrency(selectedTenant.monthlyRent)}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tiền cọc:</strong>
                      </td>
                      <td>{formatCurrency(selectedTenant.deposit)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Trạng thái:</strong>
                      </td>
                      <td>{getStatusBadge(selectedTenant.status)}</td>
                    </tr>
                  </tbody>
                </Table>

                {selectedTenant.notes && (
                  <div className="mt-3">
                    <strong>Ghi chú:</strong>
                    <p className="text-muted mt-2">{selectedTenant.notes}</p>
                  </div>
                )}
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Header>
                    <h6 className="mb-0">Liên hệ khẩn cấp</h6>
                  </Card.Header>
                  <Card.Body>
                    <div>
                      <strong>{selectedTenant.emergencyContact.name}</strong>
                    </div>
                    <div className="text-muted">
                      {selectedTenant.emergencyContact.relationship}
                    </div>
                    <div className="mt-2">
                      <FaPhone className="me-2" />
                      <a href={`tel:${selectedTenant.emergencyContact.phone}`}>
                        {selectedTenant.emergencyContact.phone}
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Link Room Modal */}
      <Modal
        show={showLinkRoomModal}
        onHide={() => setShowLinkRoomModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Liên kết phòng cho khách thuê</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTenant && (
            <>
              <Alert variant="info">
                <strong>Khách thuê:</strong> {selectedTenant.name}
              </Alert>
              <Form.Group className="mb-3">
                <Form.Label>
                  Chọn phòng <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={selectedRoomForLink}
                  onChange={(e) => setSelectedRoomForLink(e.target.value)}
                  required
                >
                  <option value="">-- Chọn phòng --</option>
                  {availableRooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} - {formatCurrency(room.baseRent)}/tháng
                    </option>
                  ))}
                </Form.Select>
                <Form.Text className="text-muted">
                  Chỉ hiển thị các phòng đang trống
                </Form.Text>
              </Form.Group>
              <Alert variant="warning" className="small">
                <strong>Lưu ý:</strong> Sau khi liên kết phòng, khách thuê sẽ có
                thể truy cập trang "Thông tin trọ" và xem thông tin hợp đồng,
                thanh toán.
              </Alert>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowLinkRoomModal(false)}
          >
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveLinkRoom}>
            Lưu liên kết
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Request Detail Modal */}
      <Modal
        show={showRequestDetailModal}
        onHide={() => setShowRequestDetailModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết yêu cầu thuê phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <div className="mb-3">
                <strong>Phòng:</strong>
                <div className="mt-1">
                  <h5>{selectedRequest.roomTitle}</h5>
                  <p className="text-primary fw-bold mb-0">
                    {formatCurrency(selectedRequest.roomPrice)}/tháng
                  </p>
                </div>
              </div>

              <hr />

              <div className="mb-3">
                <strong>Người yêu cầu:</strong>
                <div className="mt-1">
                  <p className="mb-1">
                    <FaUser className="me-2" />
                    {selectedRequest.requesterName}
                  </p>
                  <p className="mb-1">
                    <FaPhone className="me-2" />
                    {selectedRequest.requesterPhone}
                  </p>
                  <p className="mb-0">
                    <FaEnvelope className="me-2" />
                    {selectedRequest.requesterEmail}
                  </p>
                </div>
              </div>

              <hr />

              <div className="mb-3">
                <strong>Ngày dự kiến chuyển vào:</strong>
                <p className="mb-0 mt-1">
                  {selectedRequest.moveInDate
                    ? new Date(selectedRequest.moveInDate).toLocaleDateString(
                        "vi-VN"
                      )
                    : "Chưa xác định"}
                </p>
              </div>

              {selectedRequest.message && (
                <>
                  <hr />
                  <div className="mb-3">
                    <strong>Lời nhắn:</strong>
                    <p className="text-muted mt-1 mb-0">
                      {selectedRequest.message}
                    </p>
                  </div>
                </>
              )}

              <hr />

              <div>
                <strong>Trạng thái:</strong>
                <div className="mt-1">
                  {selectedRequest.status === "pending" && (
                    <Badge bg="warning" className="fs-6">
                      <FaClock className="me-1" />
                      Chờ duyệt
                    </Badge>
                  )}
                  {selectedRequest.status === "approved" && (
                    <Badge bg="success" className="fs-6">
                      <FaCheckCircle className="me-1" />
                      Đã chấp nhận
                    </Badge>
                  )}
                  {selectedRequest.status === "rejected" && (
                    <Badge bg="danger" className="fs-6">
                      <FaTimesCircle className="me-1" />
                      Từ chối
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedRequest?.status === "pending" ? (
            <>
              <Button
                variant="danger"
                onClick={() =>
                  selectedRequest && handleRejectRequest(selectedRequest.id)
                }
              >
                <FaTimesCircle className="me-2" />
                Từ chối
              </Button>
              <Button
                variant="success"
                onClick={() =>
                  selectedRequest && handleApproveRequest(selectedRequest.id)
                }
              >
                <FaCheckCircle className="me-2" />
                Chấp nhận
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              onClick={() => setShowRequestDetailModal(false)}
            >
              Đóng
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TenantsPage;
