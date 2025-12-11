import React, { useState } from "react";
import {
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
  FaBan,
  FaCheckCircle,
  FaEdit,
  FaEye,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import type { User } from "../../types/User";

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Mock users data
  const mockUsers: User[] = [
    {
      id: "1",
      name: "Nguyễn Văn A",
      email: "landlord@demo.com",
      phone: "+84 901 234 567",
      role: "landlord",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date(),
      isEmailVerified: true,
      allowedPostsPerMonth: 10,
    },
    {
      id: "2",
      name: "Trần Thị B",
      email: "tenant@demo.com",
      phone: "+84 902 345 678",
      role: "tenant",
      createdAt: new Date("2024-03-20"),
      updatedAt: new Date(),
      linkedRoomId: "room1",
      isEmailVerified: true,
    },
    {
      id: "3",
      name: "Lê Văn C",
      email: "seeker@demo.com",
      phone: "+84 903 456 789",
      role: "seeker",
      createdAt: new Date("2024-06-10"),
      updatedAt: new Date(),
      isEmailVerified: false,
    },
  ];

  React.useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "seeker" as "seeker" | "tenant" | "landlord" | "admin" | "guest",
    allowedPostsPerMonth: 5,
  });

  const filteredUsers =
    activeTab === "all"
      ? users
      : users.filter((user) => user.role === activeTab);

  const handleShowUserModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setUserForm({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        allowedPostsPerMonth: user.allowedPostsPerMonth || 5,
      });
    } else {
      setEditingUser(null);
      setUserForm({
        name: "",
        email: "",
        phone: "",
        role: "seeker",
        allowedPostsPerMonth: 5,
      });
    }
    setShowUserModal(true);
  };

  const handleCloseModal = () => {
    setShowUserModal(false);
    setEditingUser(null);
  };

  const handleFormChange = (field: string, value: any) => {
    setUserForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveUser = () => {
    console.log("Saving user:", userForm);
    handleCloseModal();
    alert(
      editingUser
        ? "Cập nhật người dùng thành công!"
        : "Tạo người dùng thành công!"
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      console.log("Deleting user:", userId);
      alert("Xóa người dùng thành công!");
    }
  };

  const handleToggleStatus = (userId: string) => {
    console.log("Toggle user status:", userId);
    alert("Đã thay đổi trạng thái người dùng!");
  };

  const getRoleBadge = (role: string) => {
    const config: Record<string, { bg: string; text: string }> = {
      admin: { bg: "danger", text: "Admin" },
      landlord: { bg: "primary", text: "Chủ trọ" },
      tenant: { bg: "success", text: "Người thuê" },
      seeker: { bg: "info", text: "Tìm trọ" },
      guest: { bg: "secondary", text: "Khách" },
    };
    const { bg, text } = config[role] || config.guest;
    return <Badge bg={bg}>{text}</Badge>;
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Quản lý người dùng</h2>
        <Button variant="primary" onClick={() => handleShowUserModal()}>
          <FaPlus className="me-2" />
          Tạo người dùng mới
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Header>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || "all")}
            className="border-0"
          >
            <Tab eventKey="all" title="Tất cả" />
            <Tab eventKey="landlord" title="Chủ trọ" />
            <Tab eventKey="tenant" title="Người thuê" />
            <Tab eventKey="seeker" title="Tìm trọ" />
            <Tab eventKey="admin" title="Admin" />
          </Tabs>
        </Card.Header>
        <Card.Body>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Vai trò</th>
                <th>Bài đăng/tháng</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="fw-semibold">{user.name}</td>
                  <td>
                    <div>{user.email}</div>
                    {user.isEmailVerified && (
                      <small className="text-success">
                        <FaCheckCircle className="me-1" />
                        Đã xác thực
                      </small>
                    )}
                  </td>
                  <td>{user.phone || "—"}</td>
                  <td>{getRoleBadge(user.role)}</td>
                  <td>
                    {user.role === "landlord" ? (
                      <span className="fw-bold">
                        {user.allowedPostsPerMonth || "—"}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td>
                    <Badge bg="success">Hoạt động</Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => console.log("View user:", user.id)}
                        title="Xem chi tiết"
                      >
                        <FaEye />
                      </Button>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => handleShowUserModal(user)}
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleToggleStatus(user.id)}
                        title="Khóa/Mở khóa"
                      >
                        <FaBan />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
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
        </Card.Body>
      </Card>

      {/* User Modal */}
      <Modal show={showUserModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingUser ? "Chỉnh sửa người dùng" : "Tạo người dùng mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ tên *</Form.Label>
                  <Form.Control
                    type="text"
                    value={userForm.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    placeholder="Nhập họ tên"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    value={userForm.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    placeholder="email@example.com"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="tel"
                    value={userForm.phone}
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                    placeholder="0901234567"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Vai trò *</Form.Label>
                  <Form.Select
                    value={userForm.role}
                    onChange={(e) => handleFormChange("role", e.target.value)}
                  >
                    <option value="seeker">Tìm trọ</option>
                    <option value="tenant">Người thuê</option>
                    <option value="landlord">Chủ trọ</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {userForm.role === "landlord" && (
              <Form.Group className="mb-3">
                <Form.Label>Số bài đăng được phép/tháng</Form.Label>
                <Form.Control
                  type="number"
                  value={userForm.allowedPostsPerMonth}
                  onChange={(e) =>
                    handleFormChange(
                      "allowedPostsPerMonth",
                      Number(e.target.value)
                    )
                  }
                  min="0"
                  max="100"
                />
                <Form.Text className="text-muted">
                  Số lượng bài đăng phòng được phép mỗi tháng
                </Form.Text>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            {editingUser ? "Cập nhật" : "Tạo mới"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserManagementPage;
