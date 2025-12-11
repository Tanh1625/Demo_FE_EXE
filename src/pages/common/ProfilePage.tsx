import React, { useState } from "react";
import { Badge, Button, Card, Col, Form, Row } from "react-bootstrap";
import { FaCalendar, FaEdit, FaEnvelope, FaPhone } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import type { UserProfile } from "../../types/User";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    ...user!,
    idCard: "001234567890",
    address: "123 Nguyễn Huệ, Quận 1",
    dateOfBirth: new Date("1990-01-01"),
    emergencyContact: {
      name: "Nguyễn Văn B",
      phone: "0987654321",
      relationship: "Anh trai",
    },
  });

  const [editForm, setEditForm] = useState({ ...profile });

  const handleEdit = () => {
    setEditForm({ ...profile });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    alert("Cập nhật thông tin thành công!");
  };

  const handleFormChange = (field: string, value: any) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmergencyContactChange = (field: string, value: any) => {
    setEditForm((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact!,
        [field]: value,
      },
    }));
  };

  return (
    <div className="container py-4">
      <Row>
        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body className="text-center">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "120px", height: "120px", fontSize: "48px" }}
              >
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <h4 className="fw-bold mb-1">{profile.name}</h4>
              <Badge bg="primary" className="mb-3">
                {profile.role === "landlord"
                  ? "Chủ trọ"
                  : profile.role === "tenant"
                  ? "Người thuê"
                  : profile.role === "admin"
                  ? "Admin"
                  : "Tìm trọ"}
              </Badge>
              <div className="text-muted">
                <div className="mb-2">
                  <FaEnvelope className="me-2" />
                  {profile.email}
                </div>
                <div className="mb-2">
                  <FaPhone className="me-2" />
                  {profile.phone}
                </div>
                <div>
                  <FaCalendar className="me-2" />
                  Tham gia:{" "}
                  {new Date(profile.createdAt).toLocaleDateString("vi-VN")}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Thông tin cá nhân</h5>
              {!isEditing && (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleEdit}
                >
                  <FaEdit className="me-2" />
                  Chỉnh sửa
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              {isEditing ? (
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            handleFormChange("name", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                          type="tel"
                          value={editForm.phone || ""}
                          onChange={(e) =>
                            handleFormChange("phone", e.target.value)
                          }
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
                          value={editForm.idCard || ""}
                          onChange={(e) =>
                            handleFormChange("idCard", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control
                          type="date"
                          value={
                            editForm.dateOfBirth
                              ? new Date(editForm.dateOfBirth)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleFormChange(
                              "dateOfBirth",
                              new Date(e.target.value)
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      type="text"
                      value={editForm.address || ""}
                      onChange={(e) =>
                        handleFormChange("address", e.target.value)
                      }
                    />
                  </Form.Group>

                  <h6 className="fw-bold mt-4 mb-3">Liên hệ khẩn cấp</h6>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control
                          type="text"
                          value={editForm.emergencyContact?.name || ""}
                          onChange={(e) =>
                            handleEmergencyContactChange("name", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                          type="tel"
                          value={editForm.emergencyContact?.phone || ""}
                          onChange={(e) =>
                            handleEmergencyContactChange(
                              "phone",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Mối quan hệ</Form.Label>
                        <Form.Control
                          type="text"
                          value={editForm.emergencyContact?.relationship || ""}
                          onChange={(e) =>
                            handleEmergencyContactChange(
                              "relationship",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex gap-2 justify-content-end">
                    <Button variant="secondary" onClick={handleCancel}>
                      Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                      Lưu thay đổi
                    </Button>
                  </div>
                </Form>
              ) : (
                <div>
                  <Row className="mb-3">
                    <Col md={6}>
                      <strong>Họ tên:</strong>
                      <div className="text-muted">{profile.name}</div>
                    </Col>
                    <Col md={6}>
                      <strong>Email:</strong>
                      <div className="text-muted">{profile.email}</div>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <strong>Số điện thoại:</strong>
                      <div className="text-muted">{profile.phone || "—"}</div>
                    </Col>
                    <Col md={6}>
                      <strong>CMND/CCCD:</strong>
                      <div className="text-muted">{profile.idCard || "—"}</div>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <strong>Ngày sinh:</strong>
                      <div className="text-muted">
                        {profile.dateOfBirth
                          ? new Date(profile.dateOfBirth).toLocaleDateString(
                              "vi-VN"
                            )
                          : "—"}
                      </div>
                    </Col>
                    <Col md={6}>
                      <strong>Địa chỉ:</strong>
                      <div className="text-muted">{profile.address || "—"}</div>
                    </Col>
                  </Row>

                  {profile.emergencyContact && (
                    <>
                      <h6 className="fw-bold mt-4 mb-3">Liên hệ khẩn cấp</h6>
                      <Row className="mb-3">
                        <Col md={4}>
                          <strong>Họ tên:</strong>
                          <div className="text-muted">
                            {profile.emergencyContact.name}
                          </div>
                        </Col>
                        <Col md={4}>
                          <strong>Số điện thoại:</strong>
                          <div className="text-muted">
                            {profile.emergencyContact.phone}
                          </div>
                        </Col>
                        <Col md={4}>
                          <strong>Mối quan hệ:</strong>
                          <div className="text-muted">
                            {profile.emergencyContact.relationship}
                          </div>
                        </Col>
                      </Row>
                    </>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
