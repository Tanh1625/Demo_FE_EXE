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
  FaEdit,
  FaEnvelope,
  FaEye,
  FaPhone,
  FaPlus,
  FaTrash,
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

const TenantsPage: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
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

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTenants(mockTenants);
      setContracts(mockContracts);
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
        <Button variant="primary" onClick={handleAddTenant}>
          <FaPlus className="me-2" />
          Thêm khách thuê
        </Button>
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
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeleteTenant(tenant.id)}
                              title="Xóa"
                            >
                              <FaTrash />
                            </Button>
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
    </>
  );
};

export default TenantsPage;
