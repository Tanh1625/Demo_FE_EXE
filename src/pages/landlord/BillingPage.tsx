import React, { useEffect, useState } from "react";
import {
  Accordion,
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import {
  FaBolt,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaFileInvoiceDollar,
  FaPrint,
  FaSave,
  FaTint,
} from "react-icons/fa";
import {
  formatPrice,
  mockBills,
  mockRooms,
  type LandlordBill,
} from "../../data/mockData";

interface RoomBillingData {
  roomId: string;
  roomName: string;
  tenantName: string;
  rentPrice: number;
  electricityPrevious: number;
  electricityCurrent: number;
  waterPrevious: number;
  waterCurrent: number;
  otherFees: number;
  notes: string;
  isExpanded: boolean;
  isSaved: boolean; // Đã lưu cho tháng này chưa
  lastSaved?: Date;
}

export const BillingPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [electricityRate, setElectricityRate] = useState(3500);
  const [waterRate, setWaterRate] = useState(25000);
  const [bills, setBills] = useState<LandlordBill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<"success" | "danger">("success");

  // Mock danh sách phòng đang được thuê
  const [roomBillings, setRoomBillings] = useState<RoomBillingData[]>([
    {
      roomId: "R001",
      roomName: "Phòng 101 - Tầng 1",
      tenantName: "Nguyễn Văn An",
      rentPrice: 3500000,
      electricityPrevious: 0,
      electricityCurrent: 0,
      waterPrevious: 0,
      waterCurrent: 0,
      otherFees: 0,
      notes: "",
      isExpanded: false,
      isSaved: false,
    },
    {
      roomId: "R002",
      roomName: "Phòng 102 - Tầng 1",
      tenantName: "Trần Thị Bình",
      rentPrice: 3200000,
      electricityPrevious: 0,
      electricityCurrent: 0,
      waterPrevious: 0,
      waterCurrent: 0,
      otherFees: 0,
      notes: "",
      isExpanded: false,
      isSaved: false,
    },
    {
      roomId: "R003",
      roomName: "Phòng 201 - Tầng 2",
      tenantName: "Lê Văn Cường",
      rentPrice: 3800000,
      electricityPrevious: 0,
      electricityCurrent: 0,
      waterPrevious: 0,
      waterCurrent: 0,
      otherFees: 0,
      notes: "",
      isExpanded: false,
      isSaved: false,
    },
    {
      roomId: "R004",
      roomName: "Phòng 202 - Tầng 2",
      tenantName: "Phạm Thị Dung",
      rentPrice: 3600000,
      electricityPrevious: 0,
      electricityCurrent: 0,
      waterPrevious: 0,
      waterCurrent: 0,
      otherFees: 0,
      notes: "",
      isExpanded: false,
      isSaved: false,
    },
    {
      roomId: "R005",
      roomName: "Phòng 301 - Tầng 3",
      tenantName: "Hoàng Văn Em",
      rentPrice: 4000000,
      electricityPrevious: 0,
      electricityCurrent: 0,
      waterPrevious: 0,
      waterCurrent: 0,
      otherFees: 0,
      notes: "",
      isExpanded: false,
      isSaved: false,
    },
    {
      roomId: "R006",
      roomName: "Phòng 302 - Tầng 3",
      tenantName: "Vũ Thị Phương",
      rentPrice: 3900000,
      electricityPrevious: 0,
      electricityCurrent: 0,
      waterPrevious: 0,
      waterCurrent: 0,
      otherFees: 0,
      notes: "",
      isExpanded: false,
      isSaved: false,
    },
  ]);

  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setBills(mockBills);
      setLoading(false);
    };
    fetchBills();
  }, []);

  const toggleRoomExpand = (roomId: string) => {
    setRoomBillings((prev) =>
      prev.map((room) =>
        room.roomId === roomId ? { ...room, isExpanded: !room.isExpanded } : room
      )
    );
  };

  const handleRoomDataChange = (
    roomId: string,
    field: keyof RoomBillingData,
    value: any
  ) => {
    setRoomBillings((prev) =>
      prev.map((room) => (room.roomId === roomId ? { ...room, [field]: value } : room))
    );
  };

  const calculateElectricityUsage = (room: RoomBillingData) => {
    return Math.max(0, room.electricityCurrent - room.electricityPrevious);
  };

  const calculateWaterUsage = (room: RoomBillingData) => {
    return Math.max(0, room.waterCurrent - room.waterPrevious);
  };

  const calculateRoomTotal = (room: RoomBillingData) => {
    const electricityUsage = calculateElectricityUsage(room);
    const waterUsage = calculateWaterUsage(room);
    return (
      room.rentPrice +
      electricityUsage * electricityRate +
      waterUsage * waterRate +
      room.otherFees
    );
  };

  const handleSaveRoom = (roomId: string) => {
    const room = roomBillings.find((r) => r.roomId === roomId);
    if (!room) return;

    // Validate
    if (room.electricityCurrent < room.electricityPrevious) {
      showAlertMessage("Số điện hiện tại phải lớn hơn số điện trước!", "danger");
      return;
    }
    if (room.waterCurrent < room.waterPrevious) {
      showAlertMessage("Số nước hiện tại phải lớn hơn số nước trước!", "danger");
      return;
    }

    setRoomBillings((prev) =>
      prev.map((r) =>
        r.roomId === roomId
          ? { ...r, isSaved: true, lastSaved: new Date() }
          : r
      )
    );
    showAlertMessage(`Đã lưu thông tin phòng ${room.roomName}`, "success");
  };

  const handleSaveAll = () => {
    const unsavedRooms = roomBillings.filter((r) => !r.isSaved);
    if (unsavedRooms.length === 0) {
      showAlertMessage("Tất cả phòng đã được lưu!", "success");
      return;
    }

    // Validate all rooms
    for (const room of unsavedRooms) {
      if (room.electricityCurrent < room.electricityPrevious) {
        showAlertMessage(
          `Phòng ${room.roomName}: Số điện hiện tại phải lớn hơn số điện trước!`,
          "danger"
        );
        return;
      }
      if (room.waterCurrent < room.waterPrevious) {
        showAlertMessage(
          `Phòng ${room.roomName}: Số nước hiện tại phải lớn hơn số nước trước!`,
          "danger"
        );
        return;
      }
    }

    setRoomBillings((prev) =>
      prev.map((r) => ({ ...r, isSaved: true, lastSaved: new Date() }))
    );
    showAlertMessage(
      `Đã lưu thông tin ${unsavedRooms.length} phòng!`,
      "success"
    );
  };

  const showAlertMessage = (
    message: string,
    variant: "success" | "danger"
  ) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const savedCount = roomBillings.filter((r) => r.isSaved).length;
  const totalRevenue = roomBillings.reduce(
    (sum, room) => (room.isSaved ? sum + calculateRoomTotal(room) : sum),
    0
  );

  return (
    <>
      {/* Header */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-2">
              <FaFileInvoiceDollar className="me-2 text-primary" />
              Quản lý thu chi
            </h2>
            <p className="text-muted mb-0">
              Nhập thông tin điện nước cho từng phòng tháng {currentMonth}/
              {currentYear}
            </p>
          </div>
          <Button variant="success" size="lg" onClick={handleSaveAll}>
            <FaSave className="me-2" />
            Lưu tất cả ({roomBillings.filter((r) => !r.isSaved).length})
          </Button>
        </div>

        {/* Summary Cards */}
        <Row className="g-3 mb-4">
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="text-muted small">Tổng phòng</div>
                <h3 className="mb-0">{roomBillings.length}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="text-muted small">Đã nhập</div>
                <h3 className="mb-0 text-success">{savedCount}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="text-muted small">Chưa nhập</div>
                <h3 className="mb-0 text-warning">
                  {roomBillings.length - savedCount}
                </h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm bg-primary text-white">
              <Card.Body>
                <div className="small opacity-75">Tổng doanh thu</div>
                <h4 className="mb-0">{formatPrice(totalRevenue)}</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Settings */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <Row className="g-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Tháng/Năm</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Select
                      value={currentMonth}
                      onChange={(e) => setCurrentMonth(Number(e.target.value))}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>
                          Tháng {m}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Select
                      value={currentYear}
                      onChange={(e) => setCurrentYear(Number(e.target.value))}
                    >
                      {[2024, 2025, 2026].map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>
                    <FaBolt className="me-1 text-warning" />
                    Giá điện (đ/kWh)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={electricityRate}
                    onChange={(e) => setElectricityRate(Number(e.target.value))}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>
                    <FaTint className="me-1 text-info" />
                    Giá nước (đ/m³)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={waterRate}
                    onChange={(e) => setWaterRate(Number(e.target.value))}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      {/* Alert */}
      {showAlert && (
        <Alert
          variant={alertVariant}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}

      {/* Room List */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white">
          <h5 className="mb-0">Danh sách phòng đang thuê</h5>
        </Card.Header>
        <Card.Body className="p-0">
          {roomBillings.map((room) => {
            const electricityUsage = calculateElectricityUsage(room);
            const waterUsage = calculateWaterUsage(room);
            const total = calculateRoomTotal(room);

            return (
              <div key={room.roomId} className="border-bottom">
                {/* Room Header - Clickable */}
                <div
                  className="p-3 cursor-pointer hover-bg-light d-flex justify-content-between align-items-center"
                  onClick={() => toggleRoomExpand(room.roomId)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-center gap-3">
                    {room.isExpanded ? (
                      <FaChevronUp className="text-muted" />
                    ) : (
                      <FaChevronDown className="text-muted" />
                    )}
                    <div>
                      <h6 className="mb-1">{room.roomName}</h6>
                      <div className="small text-muted">
                        Khách thuê: {room.tenantName}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    {room.isSaved ? (
                      <Badge bg="success">
                        <FaCheckCircle className="me-1" />
                        Đã lưu
                      </Badge>
                    ) : (
                      <Badge bg="warning">Chưa nhập</Badge>
                    )}
                    <div className="text-end">
                      <div className="small text-muted">Tổng cộng</div>
                      <h5 className="mb-0 text-primary">
                        {formatPrice(total)}
                      </h5>
                    </div>
                  </div>
                </div>

                {/* Room Details - Collapsible */}
                <Collapse in={room.isExpanded}>
                  <div className="p-4 bg-light">
                    <Row className="g-3 mb-3">
                      <Col md={6}>
                        <Card>
                          <Card.Body>
                            <h6 className="mb-3">
                              <FaBolt className="text-warning me-2" />
                              Điện
                            </h6>
                            <Row className="g-3">
                              <Col xs={6}>
                                <Form.Group>
                                  <Form.Label className="small">
                                    Số cũ (kWh)
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={room.electricityPrevious}
                                    onChange={(e) =>
                                      handleRoomDataChange(
                                        room.roomId,
                                        "electricityPrevious",
                                        Number(e.target.value)
                                      )
                                    }
                                    disabled={room.isSaved}
                                  />
                                </Form.Group>
                              </Col>
                              <Col xs={6}>
                                <Form.Group>
                                  <Form.Label className="small">
                                    Số mới (kWh)
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={room.electricityCurrent}
                                    onChange={(e) =>
                                      handleRoomDataChange(
                                        room.roomId,
                                        "electricityCurrent",
                                        Number(e.target.value)
                                      )
                                    }
                                    disabled={room.isSaved}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <div className="mt-2 p-2 bg-white rounded">
                              <div className="d-flex justify-content-between small">
                                <span>Tiêu thụ:</span>
                                <strong>{electricityUsage} kWh</strong>
                              </div>
                              <div className="d-flex justify-content-between small">
                                <span>Thành tiền:</span>
                                <strong className="text-warning">
                                  {formatPrice(electricityUsage * electricityRate)}
                                </strong>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6}>
                        <Card>
                          <Card.Body>
                            <h6 className="mb-3">
                              <FaTint className="text-info me-2" />
                              Nước
                            </h6>
                            <Row className="g-3">
                              <Col xs={6}>
                                <Form.Group>
                                  <Form.Label className="small">
                                    Số cũ (m³)
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={room.waterPrevious}
                                    onChange={(e) =>
                                      handleRoomDataChange(
                                        room.roomId,
                                        "waterPrevious",
                                        Number(e.target.value)
                                      )
                                    }
                                    disabled={room.isSaved}
                                  />
                                </Form.Group>
                              </Col>
                              <Col xs={6}>
                                <Form.Group>
                                  <Form.Label className="small">
                                    Số mới (m³)
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    value={room.waterCurrent}
                                    onChange={(e) =>
                                      handleRoomDataChange(
                                        room.roomId,
                                        "waterCurrent",
                                        Number(e.target.value)
                                      )
                                    }
                                    disabled={room.isSaved}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <div className="mt-2 p-2 bg-white rounded">
                              <div className="d-flex justify-content-between small">
                                <span>Tiêu thụ:</span>
                                <strong>{waterUsage} m³</strong>
                              </div>
                              <div className="d-flex justify-content-between small">
                                <span>Thành tiền:</span>
                                <strong className="text-info">
                                  {formatPrice(waterUsage * waterRate)}
                                </strong>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Row className="g-3 mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Phí khác (nếu có)</Form.Label>
                          <Form.Control
                            type="number"
                            value={room.otherFees}
                            onChange={(e) =>
                              handleRoomDataChange(
                                room.roomId,
                                "otherFees",
                                Number(e.target.value)
                              )
                            }
                            disabled={room.isSaved}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Ghi chú</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={1}
                            value={room.notes}
                            onChange={(e) =>
                              handleRoomDataChange(
                                room.roomId,
                                "notes",
                                e.target.value
                              )
                            }
                            disabled={room.isSaved}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Summary */}
                    <Card className="bg-white">
                      <Card.Body>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Tiền phòng:</span>
                          <strong>{formatPrice(room.rentPrice)}</strong>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Tiền điện:</span>
                          <strong>
                            {formatPrice(electricityUsage * electricityRate)}
                          </strong>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Tiền nước:</span>
                          <strong>
                            {formatPrice(waterUsage * waterRate)}
                          </strong>
                        </div>
                        {room.otherFees > 0 && (
                          <div className="d-flex justify-content-between mb-2">
                            <span>Phí khác:</span>
                            <strong>{formatPrice(room.otherFees)}</strong>
                          </div>
                        )}
                        <hr />
                        <div className="d-flex justify-content-between">
                          <strong>Tổng cộng:</strong>
                          <h5 className="mb-0 text-primary">
                            {formatPrice(total)}
                          </h5>
                        </div>
                      </Card.Body>
                    </Card>

                    {/* Actions */}
                    <div className="d-flex gap-2 mt-3">
                      {!room.isSaved ? (
                        <Button
                          variant="primary"
                          onClick={() => handleSaveRoom(room.roomId)}
                        >
                          <FaSave className="me-2" />
                          Lưu phòng này
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="warning"
                            onClick={() =>
                              handleRoomDataChange(room.roomId, "isSaved", false)
                            }
                          >
                            Chỉnh sửa
                          </Button>
                          <Button
                            variant="outline-primary"
                            onClick={() => handleSaveRoom(room.roomId)}
                          >
                            <FaSave className="me-2" />
                            Lưu lại
                          </Button>
                        </>
                      )}
                      <Button variant="outline-primary">
                        <FaPrint className="me-2" />
                        In hóa đơn
                      </Button>
                    </div>

                    {room.lastSaved && (
                      <div className="small text-muted mt-2">
                        Lưu lần cuối:{" "}
                        {room.lastSaved.toLocaleString("vi-VN")}
                      </div>
                    )}
                  </div>
                </Collapse>
              </div>
            );
          })}
        </Card.Body>
      </Card>

      {/* History Section */}
      <Card className="border-0 shadow-sm mt-4">
        <Card.Header className="bg-white">
          <h5 className="mb-0">Lịch sử hóa đơn</h5>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : bills.length === 0 ? (
            <div className="text-center text-muted py-5">
              Chưa có hóa đơn nào
            </div>
          ) : (
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Mã HĐ</th>
                  <th>Phòng</th>
                  <th>Khách thuê</th>
                  <th>Tháng</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {bills.slice(0, 10).map((bill) => (
                  <tr key={bill.id}>
                    <td>
                      <strong className="text-primary">#{bill.id}</strong>
                    </td>
                    <td>{bill.roomId}</td>
                    <td>{bill.tenantName}</td>
                    <td>
                      {bill.billingMonth}/{bill.billingYear}
                    </td>
                    <td>
                      <strong className="text-success">
                        {formatPrice(bill.totalAmount)}
                      </strong>
                    </td>
                    <td>
                      <Badge
                        bg={
                          bill.status === "paid"
                            ? "success"
                            : bill.status === "overdue"
                            ? "danger"
                            : "warning"
                        }
                      >
                        {bill.status === "paid"
                          ? "Đã thanh toán"
                          : bill.status === "overdue"
                          ? "Quá hạn"
                          : "Chưa thanh toán"}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm">
                        <FaPrint />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default BillingPage;
