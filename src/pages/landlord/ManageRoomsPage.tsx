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
import { formatPrice, getRoomTypeLabel, mockRooms } from "../../data/mockData";
import type { Room } from "../../types/Room";

const ManageRoomsPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  // Form state for add/edit room
  const [roomForm, setRoomForm] = useState({
    title: "",
    description: "",
    address: "",
    district: "",
    city: "",
    price: 0,
    area: 0,
    roomType: "single" as "single" | "shared" | "apartment" | "studio",
    maxOccupants: 1,
    electricityPrice: 0,
    waterPrice: 0,
    internetIncluded: false,
    parkingIncluded: false,
    airConditioned: false,
    furnished: false,
  });

  useEffect(() => {
    // Simulate API call
    const fetchRooms = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setRooms(mockRooms);
      setLoading(false);
    };

    fetchRooms();
  }, []);

  const handleShowAddModal = () => {
    setEditingRoom(null);
    setRoomForm({
      title: "",
      description: "",
      address: "",
      district: "",
      city: "",
      price: 0,
      area: 0,
      roomType: "single",
      maxOccupants: 1,
      electricityPrice: 0,
      waterPrice: 0,
      internetIncluded: false,
      parkingIncluded: false,
      airConditioned: false,
      furnished: false,
    });
    setShowAddModal(true);
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setRoomForm({
      title: room.title,
      description: room.description,
      address: room.address,
      district: room.district,
      city: room.city,
      price: room.price,
      area: room.area,
      roomType: room.roomType,
      maxOccupants: room.maxOccupants,
      electricityPrice: room.electricityPrice || 0,
      waterPrice: room.waterPrice || 0,
      internetIncluded: room.internetIncluded,
      parkingIncluded: room.parkingIncluded,
      airConditioned: room.airConditioned,
      furnished: room.furnished,
    });
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingRoom(null);
  };

  const handleFormChange = (field: string, value: any) => {
    setRoomForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveRoom = () => {
    // Implement save logic here
    console.log("Saving room:", roomForm);
    // For demo, just close modal
    handleCloseModal();
  };

  const handleDeleteRoom = (roomId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phòng này?")) {
      console.log("Deleting room:", roomId);
      // Implement delete logic here
    }
  };

  const handleViewRoom = (roomId: string) => {
    console.log("Viewing room:", roomId);
    // Navigate to room details page
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Quản lý phòng trọ</h2>
        <Button variant="primary" onClick={handleShowAddModal}>
          <FaPlus className="me-2" />
          Thêm phòng mới
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Header>
          <h5 className="mb-0">Danh sách phòng trọ</h5>
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
                  <th>Phòng</th>
                  <th>Địa chỉ</th>
                  <th>Loại phòng</th>
                  <th>Giá thuê</th>
                  <th>Diện tích</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id}>
                    <td>
                      <div className="fw-semibold">{room.title}</div>
                      <small className="text-muted">{room.description}</small>
                    </td>
                    <td>
                      <div>{room.address}</div>
                      <small className="text-muted">
                        {room.district}, {room.city}
                      </small>
                    </td>
                    <td>
                      <Badge bg="outline-primary">
                        {getRoomTypeLabel(room.roomType)}
                      </Badge>
                    </td>
                    <td className="fw-bold text-primary">
                      {formatPrice(room.price)}
                    </td>
                    <td>{room.area}m²</td>
                    <td>
                      <Badge bg={room.isAvailable ? "success" : "secondary"}>
                        {room.isAvailable ? "Có sẵn" : "Đã thuê"}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => handleViewRoom(room.id)}
                          title="Xem chi tiết"
                        >
                          <FaEye />
                        </Button>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          onClick={() => handleEditRoom(room)}
                          title="Chỉnh sửa"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteRoom(room.id)}
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

      {/* Add/Edit Room Modal */}
      <Modal show={showAddModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingRoom ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên phòng *</Form.Label>
                  <Form.Control
                    type="text"
                    value={roomForm.title}
                    onChange={(e) => handleFormChange("title", e.target.value)}
                    placeholder="Nhập tên phòng"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Loại phòng *</Form.Label>
                  <Form.Select
                    value={roomForm.roomType}
                    onChange={(e) =>
                      handleFormChange("roomType", e.target.value)
                    }
                  >
                    <option value="single">Phòng đơn</option>
                    <option value="shared">Phòng chia sẻ</option>
                    <option value="apartment">Căn hộ</option>
                    <option value="studio">Studio</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={roomForm.description}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
                placeholder="Mô tả phòng"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ *</Form.Label>
              <Form.Control
                type="text"
                value={roomForm.address}
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
                    value={roomForm.district}
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
                    value={roomForm.city}
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
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Giá thuê (VNĐ) *</Form.Label>
                  <Form.Control
                    type="number"
                    value={roomForm.price}
                    onChange={(e) =>
                      handleFormChange("price", Number(e.target.value))
                    }
                    placeholder="0"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Diện tích (m²) *</Form.Label>
                  <Form.Control
                    type="number"
                    value={roomForm.area}
                    onChange={(e) =>
                      handleFormChange("area", Number(e.target.value))
                    }
                    placeholder="0"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Số người tối đa *</Form.Label>
                  <Form.Control
                    type="number"
                    value={roomForm.maxOccupants}
                    onChange={(e) =>
                      handleFormChange("maxOccupants", Number(e.target.value))
                    }
                    placeholder="1"
                    min="1"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Giá điện (VNĐ/kWh)</Form.Label>
                  <Form.Control
                    type="number"
                    value={roomForm.electricityPrice}
                    onChange={(e) =>
                      handleFormChange(
                        "electricityPrice",
                        Number(e.target.value)
                      )
                    }
                    placeholder="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Giá nước (VNĐ/m³)</Form.Label>
                  <Form.Control
                    type="number"
                    value={roomForm.waterPrice}
                    onChange={(e) =>
                      handleFormChange("waterPrice", Number(e.target.value))
                    }
                    placeholder="0"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="mb-3">
              <Form.Label className="fw-semibold">Tiện nghi</Form.Label>
              <div className="mt-2">
                <Row>
                  <Col md={6}>
                    <Form.Check
                      type="checkbox"
                      label="Internet/WiFi"
                      checked={roomForm.internetIncluded}
                      onChange={(e) =>
                        handleFormChange("internetIncluded", e.target.checked)
                      }
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      label="Chỗ gửi xe"
                      checked={roomForm.parkingIncluded}
                      onChange={(e) =>
                        handleFormChange("parkingIncluded", e.target.checked)
                      }
                      className="mb-2"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Check
                      type="checkbox"
                      label="Điều hòa"
                      checked={roomForm.airConditioned}
                      onChange={(e) =>
                        handleFormChange("airConditioned", e.target.checked)
                      }
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      label="Nội thất"
                      checked={roomForm.furnished}
                      onChange={(e) =>
                        handleFormChange("furnished", e.target.checked)
                      }
                      className="mb-2"
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveRoom}>
            {editingRoom ? "Cập nhật" : "Thêm phòng"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageRoomsPage;
