import React, { useState } from "react";
import { Badge, Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import {
  FaCheck,
  FaClock,
  FaEye,
  FaPhone,
  FaTimes,
  FaTools,
} from "react-icons/fa";
import { formatPrice } from "../../data/mockData";

interface ServiceBooking {
  id: string;
  tenantName: string;
  tenantPhone: string;
  serviceName: string;
  serviceIcon: string;
  address: string;
  requestedTime: string;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  price: number;
  unit: string;
  notes: string;
  createdAt: Date;
}

const ServiceManagePage: React.FC = () => {
  const [filter, setFilter] = useState("all");

  // Mock service bookings data
  const mockBookings: ServiceBooking[] = [
    {
      id: "booking-1",
      tenantName: "Nguyễn Văn A",
      tenantPhone: "0901234567",
      serviceName: "Dọn dẹp phòng trọ",
      serviceIcon: "🧹",
      address: "Phòng A101 - 123 Nguyễn Huệ, Q1",
      requestedTime: "2024-10-12T09:00",
      status: "pending",
      price: 150000,
      unit: "lần",
      notes: "Cần dọn dẹp tổng thể, phòng khá bẩn",
      createdAt: new Date("2024-10-11T14:30"),
    },
    {
      id: "booking-2",
      tenantName: "Trần Thị B",
      tenantPhone: "0987654321",
      serviceName: "Sửa chữa điện nước",
      serviceIcon: "🔧",
      address: "Phòng B205 - 456 Lê Lợi, Q3",
      requestedTime: "2024-10-12T14:00",
      status: "confirmed",
      price: 200000,
      unit: "lần",
      notes: "Vòi nước bị rò rỉ, cần thay mới",
      createdAt: new Date("2024-10-11T10:15"),
    },
    {
      id: "booking-3",
      tenantName: "Lê Văn C",
      tenantPhone: "0912345678",
      serviceName: "Chuyển trọ trọn gói",
      serviceIcon: "📦",
      address: "Từ phòng C301 đến D405",
      requestedTime: "2024-10-13T08:00",
      status: "in-progress",
      price: 500000,
      unit: "lần",
      notes: "Có nhiều đồ đạc, cần xe tải nhỏ",
      createdAt: new Date("2024-10-10T16:45"),
    },
    {
      id: "booking-4",
      tenantName: "Phạm Thị D",
      tenantPhone: "0923456789",
      serviceName: "Lắp đặt Internet",
      serviceIcon: "📶",
      address: "Phòng E102 - 789 Hậu Giang, Q6",
      requestedTime: "2024-10-11T16:00",
      status: "completed",
      price: 300000,
      unit: "lần",
      notes: "Lắp WiFi tốc độ cao, đã hoàn thành",
      createdAt: new Date("2024-10-09T11:20"),
    },
  ];

  const filteredBookings =
    filter === "all"
      ? mockBookings
      : mockBookings.filter((booking) => booking.status === filter);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { bg: "warning", text: "Chờ xác nhận", icon: FaClock },
      confirmed: { bg: "info", text: "Đã xác nhận", icon: FaCheck },
      "in-progress": { bg: "primary", text: "Đang thực hiện", icon: FaTools },
      completed: { bg: "success", text: "Hoàn thành", icon: FaCheck },
      cancelled: { bg: "danger", text: "Đã hủy", icon: FaTimes },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge bg={config.bg} className="d-flex align-items-center gap-1">
        <Icon size={12} />
        {config.text}
      </Badge>
    );
  };

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    console.log(`Changing booking ${bookingId} to status ${newStatus}`);
    // Handle status change logic
  };

  const stats = {
    pending: mockBookings.filter((b) => b.status === "pending").length,
    confirmed: mockBookings.filter((b) => b.status === "confirmed").length,
    inProgress: mockBookings.filter((b) => b.status === "in-progress").length,
    completed: mockBookings.filter((b) => b.status === "completed").length,
    totalRevenue: mockBookings
      .filter((b) => b.status === "completed")
      .reduce((sum, b) => sum + b.price, 0),
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Quản lý dịch vụ</h2>
      </div>

      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm bg-warning bg-opacity-10">
            <Card.Body className="text-center">
              <FaClock className="text-warning mb-2" size={24} />
              <h4 className="fw-bold text-warning">{stats.pending}</h4>
              <small className="text-muted">Chờ xác nhận</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm bg-info bg-opacity-10">
            <Card.Body className="text-center">
              <FaCheck className="text-info mb-2" size={24} />
              <h4 className="fw-bold text-info">{stats.confirmed}</h4>
              <small className="text-muted">Đã xác nhận</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm bg-primary bg-opacity-10">
            <Card.Body className="text-center">
              <FaTools className="text-primary mb-2" size={24} />
              <h4 className="fw-bold text-primary">{stats.inProgress}</h4>
              <small className="text-muted">Đang thực hiện</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm bg-success bg-opacity-10">
            <Card.Body className="text-center">
              <div className="h4 fw-bold text-success">
                {formatPrice(stats.totalRevenue)}
              </div>
              <small className="text-muted">Doanh thu tháng</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filter */}
      <Row className="mb-3">
        <Col>
          <Form.Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="all">Tất cả đặt chỗ</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="in-progress">Đang thực hiện</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Bookings Table */}
      <Card className="shadow-sm">
        <Card.Header>
          <h5 className="mb-0">Danh sách đặt dịch vụ</h5>
        </Card.Header>
        <Card.Body>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Dịch vụ</th>
                <th>Khách hàng</th>
                <th>Địa chỉ</th>
                <th>Thời gian</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="me-2" style={{ fontSize: "20px" }}>
                        {booking.serviceIcon}
                      </span>
                      <div>
                        <div className="fw-semibold">{booking.serviceName}</div>
                        <small className="text-muted">
                          Đặt lúc:{" "}
                          {booking.createdAt.toLocaleDateString("vi-VN")}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="fw-semibold">{booking.tenantName}</div>
                      <small className="text-muted">
                        <FaPhone className="me-1" size={12} />
                        {booking.tenantPhone}
                      </small>
                    </div>
                  </td>
                  <td>
                    <small>{booking.address}</small>
                  </td>
                  <td>
                    <small>
                      {new Date(booking.requestedTime).toLocaleString("vi-VN")}
                    </small>
                  </td>
                  <td className="fw-bold text-primary">
                    {formatPrice(booking.price)}
                  </td>
                  <td>{getStatusBadge(booking.status)}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        title="Xem chi tiết"
                      >
                        <FaEye />
                      </Button>
                      {booking.status === "pending" && (
                        <>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() =>
                              handleStatusChange(booking.id, "confirmed")
                            }
                            title="Xác nhận"
                          >
                            <FaCheck />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() =>
                              handleStatusChange(booking.id, "cancelled")
                            }
                            title="Hủy"
                          >
                            <FaTimes />
                          </Button>
                        </>
                      )}
                      {booking.status === "confirmed" && (
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(booking.id, "in-progress")
                          }
                          title="Bắt đầu thực hiện"
                        >
                          <FaTools />
                        </Button>
                      )}
                      {booking.status === "in-progress" && (
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(booking.id, "completed")
                          }
                          title="Hoàn thành"
                        >
                          <FaCheck />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default ServiceManagePage;
