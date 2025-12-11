import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { FaDollarSign, FaFileContract, FaHome, FaUsers } from "react-icons/fa";
import { mockDashboardStats } from "../../data/mockData";

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState(mockDashboardStats);
  const [loading, setLoading] = useState(false);
  const [revenueFilter, setRevenueFilter] = useState<
    "week" | "month" | "quarter" | "year"
  >("month");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Mock revenue data for chart
  const revenueData = {
    week: [
      { label: "T2", value: 500000 },
      { label: "T3", value: 700000 },
      { label: "T4", value: 600000 },
      { label: "T5", value: 800000 },
      { label: "T6", value: 900000 },
      { label: "T7", value: 1000000 },
      { label: "CN", value: 450000 },
    ],
    month: [
      { label: "T1", value: 12000000 },
      { label: "T2", value: 15000000 },
      { label: "T3", value: 14000000 },
      { label: "T4", value: 16000000 },
      { label: "T5", value: 18000000 },
      { label: "T6", value: 17000000 },
      { label: "T7", value: 19000000 },
      { label: "T8", value: 20000000 },
      { label: "T9", value: 18500000 },
      { label: "T10", value: 21000000 },
      { label: "T11", value: 19500000 },
      { label: "T12", value: 22000000 },
    ],
    quarter: [
      { label: "Q1", value: 41000000 },
      { label: "Q2", value: 51000000 },
      { label: "Q3", value: 58500000 },
      { label: "Q4", value: 62500000 },
    ],
    year: [
      { label: "2021", value: 180000000 },
      { label: "2022", value: 210000000 },
      { label: "2023", value: 240000000 },
      { label: "2024", value: 213000000 },
    ],
  };

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

  const getCurrentRevenueData = () => {
    return revenueData[revenueFilter];
  };

  const maxRevenue = Math.max(...getCurrentRevenueData().map((d) => d.value));

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
        {/* Revenue Chart */}
        <Col lg={12}>
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Thống kê doanh thu</h5>
                <div className="d-flex gap-2 align-items-center">
                  {revenueFilter === "month" && (
                    <div className="d-flex gap-2">
                      <Form.Select
                        size="sm"
                        style={{ width: "auto" }}
                        value={selectedMonth}
                        onChange={(e) =>
                          setSelectedMonth(Number(e.target.value))
                        }
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (m) => (
                            <option key={m} value={m}>
                              Tháng {m}
                            </option>
                          )
                        )}
                      </Form.Select>
                      <Form.Select
                        size="sm"
                        style={{ width: "auto" }}
                        value={selectedYear}
                        onChange={(e) =>
                          setSelectedYear(Number(e.target.value))
                        }
                      >
                        {[2021, 2022, 2023, 2024, 2025].map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  )}
                  <ButtonGroup size="sm">
                    <Button
                      variant={
                        revenueFilter === "week" ? "primary" : "outline-primary"
                      }
                      onClick={() => setRevenueFilter("week")}
                    >
                      Tuần
                    </Button>
                    <Button
                      variant={
                        revenueFilter === "month"
                          ? "primary"
                          : "outline-primary"
                      }
                      onClick={() => setRevenueFilter("month")}
                    >
                      Tháng
                    </Button>
                    <Button
                      variant={
                        revenueFilter === "quarter"
                          ? "primary"
                          : "outline-primary"
                      }
                      onClick={() => setRevenueFilter("quarter")}
                    >
                      Quý
                    </Button>
                    <Button
                      variant={
                        revenueFilter === "year" ? "primary" : "outline-primary"
                      }
                      onClick={() => setRevenueFilter("year")}
                    >
                      Năm
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              {/* Simple Bar Chart */}
              <div
                className="d-flex align-items-end gap-2"
                style={{ height: "300px" }}
              >
                {getCurrentRevenueData().map((item, index) => (
                  <div
                    key={index}
                    className="flex-fill d-flex flex-column align-items-center"
                  >
                    <small className="text-muted mb-2">
                      {formatCurrency(item.value)}
                    </small>
                    <div
                      className="w-100 bg-primary rounded-top"
                      style={{
                        height: `${(item.value / maxRevenue) * 100}%`,
                        minHeight: "20px",
                      }}
                      title={formatCurrency(item.value)}
                    />
                    <small className="mt-2 fw-bold">{item.label}</small>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Stats */}
        <Col lg={12}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Thống kê nhanh</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span>Tỷ lệ lấp đầy</span>
                    <span className="fw-bold text-primary">
                      {((stats.occupiedRooms / stats.totalRooms) * 100).toFixed(
                        1
                      )}
                      %
                    </span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span>Phòng đã thuê</span>
                    <span className="fw-bold">{stats.occupiedRooms}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span>Hóa đơn chờ thanh toán</span>
                    <span className="fw-bold text-warning">
                      {stats.pendingPayments}
                    </span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Doanh thu TB/phòng</span>
                    <span className="fw-bold text-success">
                      {formatCurrency(
                        stats.monthlyRevenue / stats.occupiedRooms
                      )}
                    </span>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
