import React, { useEffect, useState } from "react";
import { Alert, Card, Col, Row, Table } from "react-bootstrap";
import {
  FaArrowDown,
  FaArrowUp,
  FaDollarSign,
  FaFileContract,
  FaHome,
  FaUsers,
} from "react-icons/fa";
import { mockDashboardStats } from "../../data/mockData";

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState(mockDashboardStats);
  const [loading, setLoading] = useState(false);

  const recentActivities = [
    {
      id: 1,
      type: "payment",
      description: "Phòng A101 - Thanh toán tiền phòng tháng 10",
      amount: 3500000,
      time: "2 giờ trước",
    },
    {
      id: 2,
      type: "checkout",
      description: "Phòng B205 - Khách thuê đã trả phòng",
      time: "5 giờ trước",
    },
    {
      id: 3,
      type: "checkin",
      description: "Phòng C302 - Khách thuê mới đã chuyển vào",
      amount: 4200000,
      time: "1 ngày trước",
    },
    {
      id: 4,
      type: "maintenance",
      description: "Phòng A103 - Yêu cầu sửa chữa điều hòa",
      time: "2 ngày trước",
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStats(mockDashboardStats);
      setLoading(false);
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <FaDollarSign className="text-success" />;
      case "checkout":
        return <FaArrowDown className="text-warning" />;
      case "checkin":
        return <FaArrowUp className="text-primary" />;
      case "maintenance":
        return <FaHome className="text-info" />;
      default:
        return <FaHome />;
    }
  };

  if (loading || !stats) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Tổng quan</h2>
        <small className="text-muted">
          Cập nhật lúc: {new Date().toLocaleString("vi-VN")}
        </small>
      </div>

      {/* Stats Cards */}
      <Row className="g-4 mb-5">
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <FaHome className="text-primary mb-3" size={32} />
              <h4 className="fw-bold text-primary">{stats.totalRooms}</h4>
              <p className="text-muted mb-0">Tổng phòng</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <FaUsers className="text-success mb-3" size={32} />
              <h4 className="fw-bold text-success">{stats.availableRooms}</h4>
              <p className="text-muted mb-0">Phòng trống</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <FaDollarSign className="text-info mb-3" size={32} />
              <h4 className="fw-bold text-info">
                {formatCurrency(stats.monthlyRevenue)}
              </h4>
              <p className="text-muted mb-0">Doanh thu tháng</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <FaFileContract className="text-warning mb-3" size={32} />
              <h4 className="fw-bold text-warning">{stats.pendingPayments}</h4>
              <p className="text-muted mb-0">Hóa đơn chưa thanh toán</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Alerts */}
      {stats.overduePayments > 0 && (
        <Alert variant="warning" className="mb-4">
          <Alert.Heading className="fs-6">
            <FaFileContract className="me-2" />
            Thông báo thanh toán quá hạn
          </Alert.Heading>
          <p className="mb-0">
            Có {stats.overduePayments} khoản thanh toán quá hạn cần xử lý. Vui
            lòng liên hệ với khách thuê để thu tiền.
          </p>
        </Alert>
      )}

      <Row>
        {/* Recent Activities */}
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Hoạt động gần đây</h5>
            </Card.Header>
            <Card.Body>
              <Table hover className="mb-0">
                <tbody>
                  {recentActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td className="text-center" style={{ width: "40px" }}>
                        {getActivityIcon(activity.type)}
                      </td>
                      <td>
                        <div className="fw-semibold">
                          {activity.description}
                        </div>
                        {activity.amount && (
                          <small className="text-success">
                            +{formatCurrency(activity.amount)}
                          </small>
                        )}
                      </td>
                      <td
                        className="text-end text-muted"
                        style={{ width: "120px" }}
                      >
                        <small>{activity.time}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Stats */}
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Thống kê nhanh</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Tỷ lệ lấp đầy</span>
                <span className="fw-bold text-primary">
                  {((stats.occupiedRooms / stats.totalRooms) * 100).toFixed(1)}%
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Phòng đã thuê</span>
                <span className="fw-bold">{stats.occupiedRooms}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Hóa đơn chờ thanh toán</span>
                <span className="fw-bold text-warning">
                  {stats.pendingPayments}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span>Doanh thu trung bình/phòng</span>
                <span className="fw-bold text-success">
                  {formatCurrency(stats.monthlyRevenue / stats.occupiedRooms)}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
