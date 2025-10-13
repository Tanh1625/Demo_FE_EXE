import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { FaEdit, FaFileInvoiceDollar, FaPlus, FaPrint } from "react-icons/fa";
import {
  formatPrice,
  mockBills,
  mockRooms,
  type LandlordBill,
} from "../../data/mockData";

interface BillInput {
  roomId: string;
  tenantId: string;
  electricityUsage: number;
  waterUsage: number;
  serviceFees: number;
  otherFees: number;
  notes: string;
}

export const BillingPage: React.FC = () => {
  const [bills, setBills] = useState<LandlordBill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateBillModal, setShowCreateBillModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Form state for creating new bill
  const [billForm, setBillForm] = useState<BillInput>({
    roomId: "",
    tenantId: "",
    electricityUsage: 0,
    waterUsage: 0,
    serviceFees: 0,
    otherFees: 0,
    notes: "",
  });

  useEffect(() => {
    // Simulate API call
    const fetchBills = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setBills(mockBills);
      setLoading(false);
    };

    fetchBills();
  }, []);

  const handleShowCreateBillModal = () => {
    setBillForm({
      roomId: "",
      tenantId: "",
      electricityUsage: 0,
      waterUsage: 0,
      serviceFees: 0,
      otherFees: 0,
      notes: "",
    });
    setShowCreateBillModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateBillModal(false);
  };

  const handleFormChange = (field: keyof BillInput, value: any) => {
    setBillForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateBillAmount = () => {
    const selectedRoom = mockRooms.find((room) => room.id === billForm.roomId);
    if (!selectedRoom) return 0;

    const electricityCost = billForm.electricityUsage * 3500; // 3500 VND per kWh
    const waterCost = billForm.waterUsage * 20000; // 20000 VND per m³
    const roomRent = selectedRoom.price;
    const serviceFees = billForm.serviceFees || 0;
    const otherFees = billForm.otherFees || 0;

    return electricityCost + waterCost + roomRent + serviceFees + otherFees;
  };

  const handleCreateBill = () => {
    if (!billForm.roomId) {
      setAlertMessage("Vui lòng chọn phòng");
      setShowAlert(true);
      return;
    }

    // Implement bill creation logic here
    console.log("Creating bill:", billForm);

    // Show success message
    setAlertMessage("Tạo hóa đơn thành công!");
    setShowAlert(true);

    // Close modal
    handleCloseModal();

    // Hide alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handlePrintBill = (billId: string) => {
    console.log("Printing bill:", billId);
    // Implement print functionality
  };

  const handleEditBill = (billId: string) => {
    console.log("Editing bill:", billId);
    // Implement edit functionality
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <span className="badge bg-success">Đã thanh toán</span>;
      case "overdue":
        return <span className="badge bg-danger">Quá hạn</span>;
      case "pending":
      default:
        return <span className="badge bg-warning">Chưa thanh toán</span>;
    }
  };

  const getRoomName = (roomId: string) => {
    const room = mockRooms.find((r) => r.id === roomId);
    return room ? room.title : "N/A";
  };

  return (
    <>
      {showAlert && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setShowAlert(false)}
          className="mb-4"
        >
          {alertMessage}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Quản lý thu chi</h2>
        <Button variant="primary" onClick={handleShowCreateBillModal}>
          <FaPlus className="me-2" />
          Tạo hóa đơn mới
        </Button>
      </div>

      <Row className="g-4">
        {/* Bill Creation Form */}
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">
                <FaFileInvoiceDollar className="me-2" />
                Ghi số điện nước
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Chọn phòng</Form.Label>
                  <Form.Select
                    value={billForm.roomId}
                    onChange={(e) => handleFormChange("roomId", e.target.value)}
                  >
                    <option value="">-- Chọn phòng --</option>
                    {mockRooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.title} - {room.area}m²
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Điện (kWh)</Form.Label>
                      <Form.Control
                        type="number"
                        value={billForm.electricityUsage}
                        onChange={(e) =>
                          handleFormChange(
                            "electricityUsage",
                            Number(e.target.value)
                          )
                        }
                        placeholder="0"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Nước (m³)</Form.Label>
                      <Form.Control
                        type="number"
                        value={billForm.waterUsage}
                        onChange={(e) =>
                          handleFormChange("waterUsage", Number(e.target.value))
                        }
                        placeholder="0"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Phí dịch vụ (VNĐ)</Form.Label>
                  <Form.Control
                    type="number"
                    value={billForm.serviceFees}
                    onChange={(e) =>
                      handleFormChange("serviceFees", Number(e.target.value))
                    }
                    placeholder="0"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phí khác (VNĐ)</Form.Label>
                  <Form.Control
                    type="number"
                    value={billForm.otherFees}
                    onChange={(e) =>
                      handleFormChange("otherFees", Number(e.target.value))
                    }
                    placeholder="0"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Ghi chú</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={billForm.notes}
                    onChange={(e) => handleFormChange("notes", e.target.value)}
                    placeholder="Ghi chú thêm..."
                  />
                </Form.Group>

                {billForm.roomId && (
                  <div className="bg-light p-3 rounded mb-3">
                    <h6>Tổng cộng</h6>
                    <div className="fw-bold text-primary fs-5">
                      {formatPrice(calculateBillAmount())}
                    </div>
                  </div>
                )}

                <Button
                  variant="success"
                  className="w-100"
                  onClick={handleCreateBill}
                  disabled={!billForm.roomId}
                >
                  Tạo hóa đơn
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Bills List */}
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Danh sách hóa đơn</h5>
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
                      <th>Khách thuê</th>
                      <th>Tháng/Năm</th>
                      <th>Tổng tiền</th>
                      <th>Hạn thanh toán</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map((bill) => (
                      <tr key={bill.id}>
                        <td className="fw-semibold">
                          {getRoomName(bill.roomId)}
                        </td>
                        <td>{bill.tenantName}</td>
                        <td>{bill.month}</td>
                        <td className="fw-bold text-primary">
                          {formatPrice(bill.totalAmount)}
                        </td>
                        <td>
                          {new Date(bill.dueDate).toLocaleDateString("vi-VN")}
                        </td>
                        <td>{getStatusBadge(bill.status)}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handlePrintBill(bill.id)}
                              title="In hóa đơn"
                            >
                              <FaPrint />
                            </Button>
                            <Button
                              variant="outline-warning"
                              size="sm"
                              onClick={() => handleEditBill(bill.id)}
                              title="Chỉnh sửa"
                            >
                              <FaEdit />
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
        </Col>
      </Row>

      {/* Create Bill Modal (Alternative detailed form) */}
      <Modal show={showCreateBillModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Tạo hóa đơn chi tiết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Chọn phòng *</Form.Label>
              <Form.Select
                value={billForm.roomId}
                onChange={(e) => handleFormChange("roomId", e.target.value)}
              >
                <option value="">-- Chọn phòng --</option>
                {mockRooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.title} - {room.area}m² (Tiền thuê:{" "}
                    {formatPrice(room.price)})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện sử dụng (kWh) *</Form.Label>
                  <Form.Control
                    type="number"
                    value={billForm.electricityUsage}
                    onChange={(e) =>
                      handleFormChange(
                        "electricityUsage",
                        Number(e.target.value)
                      )
                    }
                    placeholder="0"
                  />
                  <Form.Text className="text-muted">
                    Giá: 3,500 VNĐ/kWh
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Số nước sử dụng (m³) *</Form.Label>
                  <Form.Control
                    type="number"
                    value={billForm.waterUsage}
                    onChange={(e) =>
                      handleFormChange("waterUsage", Number(e.target.value))
                    }
                    placeholder="0"
                  />
                  <Form.Text className="text-muted">
                    Giá: 20,000 VNĐ/m³
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phí dịch vụ (VNĐ)</Form.Label>
                  <Form.Control
                    type="number"
                    value={billForm.serviceFees}
                    onChange={(e) =>
                      handleFormChange("serviceFees", Number(e.target.value))
                    }
                    placeholder="0"
                  />
                  <Form.Text className="text-muted">
                    Phí vệ sinh, bảo trì chung...
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phí khác (VNĐ)</Form.Label>
                  <Form.Control
                    type="number"
                    value={billForm.otherFees}
                    onChange={(e) =>
                      handleFormChange("otherFees", Number(e.target.value))
                    }
                    placeholder="0"
                  />
                  <Form.Text className="text-muted">
                    Phí phạt, phụ phí khác...
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={billForm.notes}
                onChange={(e) => handleFormChange("notes", e.target.value)}
                placeholder="Ghi chú thêm về hóa đơn..."
              />
            </Form.Group>

            {billForm.roomId && (
              <div className="bg-light p-3 rounded">
                <h6 className="mb-3">Chi tiết hóa đơn</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tiền phòng:</span>
                  <span>
                    {formatPrice(
                      mockRooms.find((r) => r.id === billForm.roomId)?.price ||
                        0
                    )}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tiền điện ({billForm.electricityUsage} kWh):</span>
                  <span>{formatPrice(billForm.electricityUsage * 3500)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tiền nước ({billForm.waterUsage} m³):</span>
                  <span>{formatPrice(billForm.waterUsage * 20000)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Phí dịch vụ:</span>
                  <span>{formatPrice(billForm.serviceFees || 0)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Phí khác:</span>
                  <span>{formatPrice(billForm.otherFees || 0)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold text-primary fs-5">
                  <span>Tổng cộng:</span>
                  <span>{formatPrice(calculateBillAmount())}</span>
                </div>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateBill}
            disabled={!billForm.roomId}
          >
            Tạo hóa đơn
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BillingPage;
