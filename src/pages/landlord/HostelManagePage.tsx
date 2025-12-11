import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import type { Hostel } from "../../types/Hostel";

const HostelManagePage: React.FC = () => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHostel, setEditingHostel] = useState<Hostel | null>(null);

  const [hostelForm, setHostelForm] = useState({
    name: "",
    description: "",
    address: "",
    district: "",
    city: "",
    amenities: [] as string[],
    hasParking: false,
    hasSecurity: false,
    hasElevator: false,
    rules: [] as string[],
    contactPhone: "",
    contactEmail: "",
  });

  const [newAmenity, setNewAmenity] = useState("");
  const [newRule, setNewRule] = useState("");

  // Mock data
  const mockHostels: Hostel[] = [
    {
      id: "hostel1",
      name: "Dãy trọ A - Nguyễn Huệ",
      description: "Dãy trọ cao cấp với đầy đủ tiện nghi",
      address: "123 Nguyễn Huệ",
      district: "Quận 1",
      city: "TP. Hồ Chí Minh",
      landlordId: "1",
      totalRooms: 20,
      availableRooms: 5,
      amenities: ["WiFi", "Bảo vệ 24/7", "Camera an ninh", "Thang máy"],
      images: [],
      hasParking: true,
      hasSecurity: true,
      hasElevator: true,
      rules: [
        "Không nuôi thú cưng",
        "Không hút thuốc trong phòng",
        "Giữ vệ sinh chung",
      ],
      contactPhone: "0901234567",
      contactEmail: "hostel.a@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "hostel2",
      name: "Dãy trọ B - Lê Lợi",
      description: "Dãy trọ giá rẻ, phù hợp sinh viên",
      address: "456 Lê Lợi",
      district: "Quận 3",
      city: "TP. Hồ Chí Minh",
      landlordId: "1",
      totalRooms: 15,
      availableRooms: 3,
      amenities: ["WiFi", "Bảo vệ", "Máy giặt chung"],
      images: [],
      hasParking: true,
      hasSecurity: true,
      hasElevator: false,
      rules: ["Không gây ồn sau 22h", "Đóng tiền đúng hạn"],
      contactPhone: "0907654321",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  useEffect(() => {
    const fetchHostels = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setHostels(mockHostels);
      setLoading(false);
    };

    fetchHostels();
  }, []);

  const handleShowAddModal = () => {
    setEditingHostel(null);
    setHostelForm({
      name: "",
      description: "",
      address: "",
      district: "",
      city: "",
      amenities: [],
      hasParking: false,
      hasSecurity: false,
      hasElevator: false,
      rules: [],
      contactPhone: "",
      contactEmail: "",
    });
    setShowAddModal(true);
  };

  const handleEditHostel = (hostel: Hostel) => {
    setEditingHostel(hostel);
    setHostelForm({
      name: hostel.name,
      description: hostel.description,
      address: hostel.address,
      district: hostel.district,
      city: hostel.city,
      amenities: [...hostel.amenities],
      hasParking: hostel.hasParking,
      hasSecurity: hostel.hasSecurity,
      hasElevator: hostel.hasElevator,
      rules: [...hostel.rules],
      contactPhone: hostel.contactPhone,
      contactEmail: hostel.contactEmail || "",
    });
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingHostel(null);
    setNewAmenity("");
    setNewRule("");
  };

  const handleFormChange = (field: string, value: any) => {
    setHostelForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setHostelForm((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }));
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setHostelForm((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setHostelForm((prev) => ({
        ...prev,
        rules: [...prev.rules, newRule.trim()],
      }));
      setNewRule("");
    }
  };

  const handleRemoveRule = (index: number) => {
    setHostelForm((prev) => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index),
    }));
  };

  const handleSaveHostel = () => {
    console.log("Saving hostel:", hostelForm);
    handleCloseModal();
    alert(
      editingHostel
        ? "Cập nhật dãy trọ thành công!"
        : "Thêm dãy trọ thành công!"
    );
  };

  const handleDeleteHostel = (hostelId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dãy trọ này?")) {
      console.log("Deleting hostel:", hostelId);
      alert("Xóa dãy trọ thành công!");
    }
  };

  const handleViewHostel = (hostelId: string) => {
    console.log("Viewing hostel:", hostelId);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Quản lý dãy trọ</h2>
        <Button variant="primary" onClick={handleShowAddModal}>
          <FaPlus className="me-2" />
          Thêm dãy trọ mới
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Header>
          <h5 className="mb-0">Danh sách dãy trọ</h5>
        </Card.Header>
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
                  <th>Tên dãy trọ</th>
                  <th>Địa chỉ</th>
                  <th>Tổng phòng</th>
                  <th>Phòng trống</th>
                  <th>Tiện nghi</th>
                  <th>Liên hệ</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {hostels.map((hostel) => (
                  <tr key={hostel.id}>
                    <td>
                      <div className="fw-semibold">{hostel.name}</div>
                      <small className="text-muted">{hostel.description}</small>
                    </td>
                    <td>
                      <div>{hostel.address}</div>
                      <small className="text-muted">
                        {hostel.district}, {hostel.city}
                      </small>
                    </td>
                    <td className="text-center">{hostel.totalRooms}</td>
                    <td className="text-center">
                      <Badge
                        bg={hostel.availableRooms > 0 ? "success" : "secondary"}
                      >
                        {hostel.availableRooms}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-1 flex-wrap">
                        {hostel.hasParking && (
                          <Badge bg="info" className="small">
                            Bãi xe
                          </Badge>
                        )}
                        {hostel.hasSecurity && (
                          <Badge bg="success" className="small">
                            Bảo vệ
                          </Badge>
                        )}
                        {hostel.hasElevator && (
                          <Badge bg="primary" className="small">
                            Thang máy
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td>
                      <div>{hostel.contactPhone}</div>
                      {hostel.contactEmail && (
                        <small className="text-muted">
                          {hostel.contactEmail}
                        </small>
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => handleViewHostel(hostel.id)}
                          title="Xem chi tiết"
                        >
                          <FaEye />
                        </Button>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          onClick={() => handleEditHostel(hostel)}
                          title="Chỉnh sửa"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteHostel(hostel.id)}
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

      {/* Add/Edit Hostel Modal */}
      <Modal show={showAddModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingHostel ? "Chỉnh sửa dãy trọ" : "Thêm dãy trọ mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên dãy trọ *</Form.Label>
              <Form.Control
                type="text"
                value={hostelForm.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                placeholder="Ví dụ: Dãy trọ A - Nguyễn Huệ"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={hostelForm.description}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
                placeholder="Mô tả về dãy trọ"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ *</Form.Label>
              <Form.Control
                type="text"
                value={hostelForm.address}
                onChange={(e) => handleFormChange("address", e.target.value)}
                placeholder="Địa chỉ chi tiết"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Quận/Huyện *</Form.Label>
                  <Form.Control
                    type="text"
                    value={hostelForm.district}
                    onChange={(e) =>
                      handleFormChange("district", e.target.value)
                    }
                    placeholder="Quận/Huyện"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Thành phố *</Form.Label>
                  <Form.Select
                    value={hostelForm.city}
                    onChange={(e) => handleFormChange("city", e.target.value)}
                  >
                    <option value="">Chọn thành phố</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại liên hệ *</Form.Label>
                  <Form.Control
                    type="tel"
                    value={hostelForm.contactPhone}
                    onChange={(e) =>
                      handleFormChange("contactPhone", e.target.value)
                    }
                    placeholder="0901234567"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email liên hệ</Form.Label>
                  <Form.Control
                    type="email"
                    value={hostelForm.contactEmail}
                    onChange={(e) =>
                      handleFormChange("contactEmail", e.target.value)
                    }
                    placeholder="email@example.com"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="mb-3">
              <Form.Label className="fw-semibold">Tiện ích chung</Form.Label>
              <div className="mt-2">
                <Row>
                  <Col md={4}>
                    <Form.Check
                      type="checkbox"
                      label="Bãi đỗ xe"
                      checked={hostelForm.hasParking}
                      onChange={(e) =>
                        handleFormChange("hasParking", e.target.checked)
                      }
                      className="mb-2"
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Check
                      type="checkbox"
                      label="Bảo vệ 24/7"
                      checked={hostelForm.hasSecurity}
                      onChange={(e) =>
                        handleFormChange("hasSecurity", e.target.checked)
                      }
                      className="mb-2"
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Check
                      type="checkbox"
                      label="Thang máy"
                      checked={hostelForm.hasElevator}
                      onChange={(e) =>
                        handleFormChange("hasElevator", e.target.checked)
                      }
                      className="mb-2"
                    />
                  </Col>
                </Row>
              </div>
            </div>

            <div className="mb-3">
              <Form.Label className="fw-semibold">Tiện nghi khác</Form.Label>
              <div className="d-flex gap-2 mb-2">
                <Form.Control
                  type="text"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="Nhập tiện nghi"
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddAmenity())
                  }
                />
                <Button variant="outline-primary" onClick={handleAddAmenity}>
                  Thêm
                </Button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {hostelForm.amenities.map((amenity, index) => (
                  <Badge
                    key={index}
                    bg="primary"
                    className="d-flex align-items-center gap-1"
                  >
                    {amenity}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemoveAmenity(index)}
                    >
                      ×
                    </span>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <Form.Label className="fw-semibold">Nội quy</Form.Label>
              <div className="d-flex gap-2 mb-2">
                <Form.Control
                  type="text"
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  placeholder="Nhập nội quy"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddRule())
                  }
                />
                <Button variant="outline-primary" onClick={handleAddRule}>
                  Thêm
                </Button>
              </div>
              <div className="d-flex flex-column gap-2">
                {hostelForm.rules.map((rule, index) => (
                  <div key={index} className="d-flex align-items-center gap-2">
                    <span className="flex-grow-1">• {rule}</span>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveRule(index)}
                    >
                      Xóa
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveHostel}>
            {editingHostel ? "Cập nhật" : "Thêm dãy trọ"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HostelManagePage;
