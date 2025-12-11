import React from "react";
import { Badge, Card, Col, Container, Row, Table } from "react-bootstrap";
import {
  FaBuilding,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaHome,
  FaTimesCircle,
  FaUserShield,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface DashboardStats {
  totalUsers: number;
  totalLandlords: number;
  totalTenants: number;
  totalRooms: number;
  pendingPosts: number;
  approvedPosts: number;
  rejectedPosts: number;
  totalRevenue: number;
}

interface RecentActivity {
  id: string;
  type:
    | "user_registered"
    | "post_submitted"
    | "post_approved"
    | "post_rejected";
  description: string;
  timestamp: Date;
  user: string;
}

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock statistics
  const stats: DashboardStats = {
    totalUsers: 248,
    totalLandlords: 45,
    totalTenants: 132,
    totalRooms: 567,
    pendingPosts: 12,
    approvedPosts: 445,
    rejectedPosts: 23,
    totalRevenue: 125400000,
  };

  // Mock recent activities
  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "user_registered",
      description: "Người dùng mới đăng ký",
      timestamp: new Date("2024-12-10T10:30:00"),
      user: "nguyenvana@gmail.com",
    },
    {
      id: "2",
      type: "post_submitted",
      description: "Bài đăng mới chờ duyệt",
      timestamp: new Date("2024-12-10T09:15:00"),
      user: "landlord123@gmail.com",
    },
    {
      id: "3",
      type: "post_approved",
      description: "Bài đăng đã được duyệt",
      timestamp: new Date("2024-12-10T08:45:00"),
      user: "chutroanh@gmail.com",
    },
    {
      id: "4",
      type: "post_rejected",
      description: "Bài đăng bị từ chối",
      timestamp: new Date("2024-12-10T08:20:00"),
      user: "landlord456@gmail.com",
    },
    {
      id: "5",
      type: "user_registered",
      description: "Chủ trọ mới đăng ký",
      timestamp: new Date("2024-12-10T07:30:00"),
      user: "newlandlord@gmail.com",
    },
  ];

  const getActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "user_registered":
        return <FaUsers className="text-primary" />;
      case "post_submitted":
        return <FaClock className="text-warning" />;
      case "post_approved":
        return <FaCheckCircle className="text-success" />;
      case "post_rejected":
        return <FaTimesCircle className="text-danger" />;
      default:
        return <FaHome className="text-secondary" />;
    }
  };

  const getActivityBadge = (type: RecentActivity["type"]) => {
    switch (type) {
      case "user_registered":
        return <Badge bg="primary">Đăng ký</Badge>;
      case "post_submitted":
        return <Badge bg="warning">Chờ duyệt</Badge>;
      case "post_approved":
        return <Badge bg="success">Đã duyệt</Badge>;
      case "post_rejected":
        return <Badge bg="danger">Từ chối</Badge>;
      default:
        return <Badge bg="secondary">Khác</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours < 1) {
      return `${minutes} phút trước`;
    } else if (hours < 24) {
      return `${hours} giờ trước`;
    } else {
      return date.toLocaleDateString("vi-VN");
    }
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            <FaUserShield className="me-2" />
            Trang Quản Trị
          </h2>
          <p className="text-muted mb-0">
            Tổng quan hệ thống quản lý phòng trọ
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row className="g-4 mb-4">
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1">Tổng người dùng</p>
                  <h3 className="mb-0">{stats.totalUsers}</h3>
                  <small className="text-success">
                    <FaUsers className="me-1" />
                    Đang hoạt động
                  </small>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <FaUsers size={24} className="text-primary" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1">Chủ trọ</p>
                  <h3 className="mb-0">{stats.totalLandlords}</h3>
                  <small className="text-info">
                    <FaBuilding className="me-1" />
                    {stats.totalRooms} phòng
                  </small>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <FaBuilding size={24} className="text-info" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/posts")}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1">Bài chờ duyệt</p>
                  <h3 className="mb-0">{stats.pendingPosts}</h3>
                  <small className="text-warning">
                    <FaClock className="me-1" />
                    Cần xử lý
                  </small>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <FaClock size={24} className="text-warning" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1">Doanh thu nền tảng</p>
                  <h3 className="mb-0 small">
                    {formatCurrency(stats.totalRevenue)}
                  </h3>
                  <small className="text-success">
                    <FaDollarSign className="me-1" />
                    Tháng này
                  </small>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <FaDollarSign size={24} className="text-success" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Posts Statistics */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 pt-3">
              <h5 className="mb-0">
                <FaHome className="me-2" />
                Thống kê bài đăng
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Chờ duyệt</span>
                  <Badge bg="warning" pill>
                    {stats.pendingPosts}
                  </Badge>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-warning"
                    style={{
                      width: `${
                        (stats.pendingPosts /
                          (stats.pendingPosts +
                            stats.approvedPosts +
                            stats.rejectedPosts)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Đã duyệt</span>
                  <Badge bg="success" pill>
                    {stats.approvedPosts}
                  </Badge>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-success"
                    style={{
                      width: `${
                        (stats.approvedPosts /
                          (stats.pendingPosts +
                            stats.approvedPosts +
                            stats.rejectedPosts)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Từ chối</span>
                  <Badge bg="danger" pill>
                    {stats.rejectedPosts}
                  </Badge>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-danger"
                    style={{
                      width: `${
                        (stats.rejectedPosts /
                          (stats.pendingPosts +
                            stats.approvedPosts +
                            stats.rejectedPosts)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 pt-3">
              <h5 className="mb-0">Hoạt động gần đây</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 ps-3">Loại</th>
                    <th className="border-0">Mô tả</th>
                    <th className="border-0">Người dùng</th>
                    <th className="border-0">Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td className="ps-3">
                        <div className="d-flex align-items-center">
                          {getActivityIcon(activity.type)}
                          <span className="ms-2">
                            {getActivityBadge(activity.type)}
                          </span>
                        </div>
                      </td>
                      <td>{activity.description}</td>
                      <td>
                        <small className="text-muted">{activity.user}</small>
                      </td>
                      <td>
                        <small className="text-muted">
                          {formatTimestamp(activity.timestamp)}
                        </small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="g-4 mt-2">
        <Col md={4}>
          <Card
            className="border-0 shadow-sm text-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/users")}
          >
            <Card.Body className="py-4">
              <FaUsers size={40} className="text-primary mb-3" />
              <h5>Quản lý người dùng</h5>
              <p className="text-muted mb-0">
                Xem và quản lý tất cả người dùng trong hệ thống
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="border-0 shadow-sm text-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/posts")}
          >
            <Card.Body className="py-4">
              <FaHome size={40} className="text-warning mb-3" />
              <h5>Duyệt bài đăng</h5>
              <p className="text-muted mb-0">
                Xem xét và duyệt các bài đăng phòng trọ mới
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm text-center">
            <Card.Body className="py-4">
              <FaDollarSign size={40} className="text-success mb-3" />
              <h5>Báo cáo doanh thu</h5>
              <p className="text-muted mb-0">
                Xem báo cáo doanh thu và thống kê tài chính
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboardPage;
