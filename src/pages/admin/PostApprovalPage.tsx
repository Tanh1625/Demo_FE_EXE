import React, { useState } from "react";
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
import { FaCheckCircle, FaEye } from "react-icons/fa";
import type { Room } from "../../types/Room";

const PostApprovalPage: React.FC = () => {
  const [posts, setPosts] = useState<Room[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Room | null>(null);
  const [reviewForm, setReviewForm] = useState({
    status: "approved" as "approved" | "rejected",
    rejectionReason: "",
    notes: "",
  });

  // Mock posts data
  const mockPosts: Room[] = [
    {
      id: "1",
      title: "Phòng trọ cao cấp gần ĐH",
      description: "Phòng mới, đầy đủ tiện nghi",
      address: "123 Nguyễn Huệ",
      district: "Quận 1",
      city: "TP. Hồ Chí Minh",
      price: 3500000,
      area: 25,
      roomType: "single",
      amenities: ["WiFi", "Điều hòa"],
      images: [],
      isAvailable: true,
      landlordId: "landlord1",
      hostelName: "Dãy trọ A",
      maxOccupants: 2,
      internetIncluded: true,
      parkingIncluded: true,
      airConditioned: true,
      furnished: true,
      approvalStatus: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  React.useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const handleShowReviewModal = (post: Room) => {
    setSelectedPost(post);
    setReviewForm({
      status: "approved",
      rejectionReason: "",
      notes: "",
    });
    setShowReviewModal(true);
  };

  const handleCloseModal = () => {
    setShowReviewModal(false);
    setSelectedPost(null);
  };

  const handleFormChange = (field: string, value: any) => {
    setReviewForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitReview = () => {
    console.log("Review:", { postId: selectedPost?.id, ...reviewForm });
    handleCloseModal();
    alert(
      reviewForm.status === "approved"
        ? "Đã duyệt bài đăng!"
        : "Đã từ chối bài đăng!"
    );
  };

  const getApprovalBadge = (status: string) => {
    const config: Record<string, { bg: string; text: string }> = {
      pending: { bg: "warning", text: "Chờ duyệt" },
      approved: { bg: "success", text: "Đã duyệt" },
      rejected: { bg: "danger", text: "Từ chối" },
    };
    const { bg, text } = config[status] || config.pending;
    return <Badge bg={bg}>{text}</Badge>;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Quản lý bài đăng</h2>
      </div>

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <h4 className="fw-bold text-warning">
                {posts.filter((p) => p.approvalStatus === "pending").length}
              </h4>
              <p className="text-muted mb-0">Chờ duyệt</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <h4 className="fw-bold text-success">
                {posts.filter((p) => p.approvalStatus === "approved").length}
              </h4>
              <p className="text-muted mb-0">Đã duyệt</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <h4 className="fw-bold text-danger">
                {posts.filter((p) => p.approvalStatus === "rejected").length}
              </h4>
              <p className="text-muted mb-0">Từ chối</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Header>
          <h5 className="mb-0">Danh sách bài đăng</h5>
        </Card.Header>
        <Card.Body>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Chủ trọ</th>
                <th>Địa chỉ</th>
                <th>Giá</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div className="fw-semibold">{post.title}</div>
                    <small className="text-muted">{post.hostelName}</small>
                  </td>
                  <td>Chủ trọ #{post.landlordId}</td>
                  <td>
                    <div>{post.address}</div>
                    <small className="text-muted">
                      {post.district}, {post.city}
                    </small>
                  </td>
                  <td className="fw-bold text-primary">
                    {formatPrice(post.price)}
                  </td>
                  <td>
                    {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td>{getApprovalBadge(post.approvalStatus)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => console.log("View:", post.id)}
                        title="Xem chi tiết"
                      >
                        <FaEye />
                      </Button>
                      {post.approvalStatus === "pending" && (
                        <>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => handleShowReviewModal(post)}
                            title="Duyệt"
                          >
                            <FaCheckCircle />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Review Modal */}
      <Modal show={showReviewModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Duyệt bài đăng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost && (
            <>
              <Card className="mb-3">
                <Card.Body>
                  <h5 className="fw-bold">{selectedPost.title}</h5>
                  <p className="text-muted mb-2">{selectedPost.description}</p>
                  <Row>
                    <Col md={6}>
                      <strong>Địa chỉ:</strong> {selectedPost.address}
                    </Col>
                    <Col md={6}>
                      <strong>Giá:</strong> {formatPrice(selectedPost.price)}
                    </Col>
                    <Col md={6}>
                      <strong>Diện tích:</strong> {selectedPost.area}m²
                    </Col>
                    <Col md={6}>
                      <strong>Dãy trọ:</strong> {selectedPost.hostelName}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Quyết định *</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Duyệt bài đăng"
                      name="status"
                      value="approved"
                      checked={reviewForm.status === "approved"}
                      onChange={(e) =>
                        handleFormChange("status", e.target.value)
                      }
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      label="Từ chối bài đăng"
                      name="status"
                      value="rejected"
                      checked={reviewForm.status === "rejected"}
                      onChange={(e) =>
                        handleFormChange("status", e.target.value)
                      }
                    />
                  </div>
                </Form.Group>

                {reviewForm.status === "rejected" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Lý do từ chối *</Form.Label>
                    <Form.Select
                      value={reviewForm.rejectionReason}
                      onChange={(e) =>
                        handleFormChange("rejectionReason", e.target.value)
                      }
                    >
                      <option value="">Chọn lý do</option>
                      <option value="invalid_info">
                        Thông tin không chính xác
                      </option>
                      <option value="inappropriate_content">
                        Nội dung không phù hợp
                      </option>
                      <option value="duplicate">Trùng lặp bài đăng</option>
                      <option value="missing_info">Thiếu thông tin</option>
                      <option value="other">Khác</option>
                    </Form.Select>
                  </Form.Group>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Ghi chú</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={reviewForm.notes}
                    onChange={(e) => handleFormChange("notes", e.target.value)}
                    placeholder="Ghi chú thêm (tùy chọn)"
                  />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button
            variant={reviewForm.status === "approved" ? "success" : "danger"}
            onClick={handleSubmitReview}
          >
            {reviewForm.status === "approved" ? "Duyệt bài" : "Từ chối"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostApprovalPage;
