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
import { FaEdit, FaFileInvoiceDollar, FaPlus, FaPrint, FaTrash } from "react-icons/fa";
import {
  formatPrice,
  mockBills,
  mockRooms,
  type LandlordBill,
} from "../../data/mockData";
import type { RoomBillInput } from "../../types/Billing";

export const BillingPage: React.FC = () => {
  const [bills, setBills] = useState<LandlordBill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBatchBillModal, setShowBatchBillModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [batchBillForm, setBatchBillForm] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    electricityRate: 3500,
    waterRate: 25000,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .split("T")[0],
    notes: "",
  });

  // Mock rooms with tenants
  const occupiedRooms = mockRooms.filter((room) => !room.isAvailable).map((room) => ({
    roomId: room.id,
    roomName: room.title,
    tenantId: `tenant_${room.id}`,
    tenantName: `Người thuê ${room.title}`,
    electricityPrevious: 0,
    electricityCurrent: 0,
    electricityUsage: 0,
    waterPrevious: 0,
    waterCurrent: 0,
    waterUsage: 0,
  }));

  const [roomBills, setRoomBills] = useState<RoomBillInput[]>(occupiedRooms);

  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setBills(mockBills);
      setLoading(false);
    };

    fetchBills();
  }, []);

  const handleShowBatchBillModal = () => {
    setRoomBills(occupiedRooms);
    setShowBatchBillModal(true);
  };

  const handleCloseModal = () => {
    setShowBatchBillModal(false);
  };

  const handleBatchFormChange = (field: string, value: any) => {
    setBatchBillForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRoomBillChange = (
    roomId: string,
    field: keyof RoomBillInput,
    value: number
  ) => {
    setRoomBills((prev) =>
      prev.map((room) => {
        if (room.roomId === roomId) {
          const updated = { ...room, [field]: value };
          
          // Auto calculate usage
          if (field === "electricityCurrent" || field === "electricityPrevious") {
            updated.electricityUsage = Math.max(
              0,
              updated.electricityCurrent - updated.electricityPrevious
            );
          }
          if (field === "waterCurrent" || field === "waterPrevious") {
            updated.waterUsage = Math.max(
              0,
              updated.waterCurrent - updated.waterPrevious
            );
          }
          
          return updated;
        }
        return room;
      })
    );
  };

  const calculateRoomTotal = (room: RoomBillInput) => {
    const originalRoom = mockRooms.find((r) => r.id === room.roomId);
    if (!originalRoom) return 0;

    const electricityCost = room.electricityUsage * batchBillForm.electricityRate;
    const waterCost = room.waterUsage * batchBillForm.waterRate;
    const roomRent = originalRoom.price;

    return electricityCost + waterCost + roomRent;
  };

  const handleCreateBatchBills = () => {
    const totalBills = roomBills.filter(
      (room) => room.electricityUsage > 0 || room.waterUsage > 0
    ).length;

    if (totalBills === 0) {
      setAlertMessage("Vui lòng nhập chỉ số điện nước cho ít nhất một phòng");
      setShowAlert(true);
      return;
    }

    console.log("Creating batch bills:", {
      ...batchBillForm,
      rooms: roomBills,
    });

    setAlertMessage(`Tạo thành công ${totalBills} hóa đơn!`);
    setShowAlert(true);
    handleCloseModal();

    setTimeout(() => setShowAlert(false), 3000);
  };

  const handlePrintBill = (billId: string) => {
    console.log("Printing bill:", billId);
  };

  const handleEditBill = (billId: string) => {
    console.log("Editing bill:", billId);
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
        <Button variant="primary" onClick={handleShowBatchBillModal}>
          <FaPlus className="me-2" />
          Tạo hóa đơn hàng loạt
        </Button>
      </div>

      {/* Bills Summary Cards */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <FaFileInvoiceDollar className="text-primary mb-2" size={32} />
              <h4 className="fw-bold text-primary">{bills.length}</h4>
              <p className="text-muted mb-0">Tổng hóa đơn</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <FaFileInvoiceDollar className="text-warning mb-2" size={32} />
              <h4 className="fw-bold text-warning">
                {bills.filter((b) => b.status === "pending").length}
              </h4>
              <p className="text-muted mb-0">Chưa thanh toán</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <FaFileInvoiceDollar className="text-danger mb-2" size={32} />
              <h4 className="fw-bold text-danger">
                {bills.filter((b) => b.status === "overdue").length}
              </h4>
              <p className="text-muted mb-0">Quá hạn</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bills List */}
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
                  <th>Mã HĐ</th>
                  <th>Phòng</th>
                  <th>Tháng</th>
                  <th>Điện</th>
                  <th>Nước</th>
                  <th>Tổng tiền</th>
                  <th>Hạn thanh toán</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id}>
                    <td className="fw-semibold">#{bill.id}</td>
                    <td>{getRoomName(bill.roomId)}</td>
                    <td>
                      {bill.month}/{bill.year}
                    </td>
                    <td>
                      {bill.electricityUsage} kWh
                      <br />
                      <small className="text-muted">
                        {formatPrice(bill.electricityCost)}
                      </small>
                    </td>
                    <td>
                      {bill.waterUsage} m³
                      <br />
                      <small className="text-muted">
                        {formatPrice(bill.waterCost)}
                      </small>
                    </td>
                    <td className="fw-bold text-primary">
                      {formatPrice(bill.totalAmount)}
                    </td>
                    <td>{new Date(bill.dueDate).toLocaleDateString("vi-VN")}</td>
                    <td>{getStatusBadge(bill.status)}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-info"
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

      {/* Batch Bill Creation Modal */}
      <Modal show={showBatchBillModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Tạo hóa đơn hàng loạt</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <Form>
            <Row className="mb-4">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Tháng</Form.Label>
                  <Form.Select
                    value={batchBillForm.month}
                    onChange={(e) =>
                      handleBatchFormChange("month", Number(e.target.value))
                    }
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>
                        Tháng {m}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Năm</Form.Label>
                  <Form.Select
                    value={batchBillForm.year}
                    onChange={(e) =>
                      handleBatchFormChange("year", Number(e.target.value))
                    }
                  >
                    {[2024, 2025, 2026].map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Giá điện (VNĐ/kWh)</Form.Label>
                  <Form.Control
                    type="number"
                    value={batchBillForm.electricityRate}
                    onChange={(e) =>
                      handleBatchFormChange("electricityRate", Number(e.target.value))
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Giá nước (VNĐ/m³)</Form.Label>
                  <Form.Control
                    type="number"
                    value={batchBillForm.waterRate}
                    onChange={(e) =>
                      handleBatchFormChange("waterRate", Number(e.target.value))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Hạn thanh toán</Form.Label>
                  <Form.Control
                    type="date"
                    value={batchBillForm.dueDate}
                    onChange={(e) => handleBatchFormChange("dueDate", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ghi chú</Form.Label>
                  <Form.Control
                    type="text"
                    value={batchBillForm.notes}
                    onChange={(e) => handleBatchFormChange("notes", e.target.value)}
                    placeholder="Ghi chú chung cho tất cả hóa đơn"
                  />
                </Form.Group>
              </Col>
            </Row>

            <h6 className="fw-bold mb-3">Nhập chỉ số điện nước từng phòng</h6>
            <Table hover bordered responsive>
              <thead className="table-light">
                <tr>
                  <th style={{ width: "150px" }}>Phòng</th>
                  <th style={{ width: "120px" }}>Người thuê</th>
                  <th style={{ width: "80px" }}>Điện cũ</th>
                  <th style={{ width: "80px" }}>Điện mới</th>
                  <th style={{ width: "80px" }}>Sử dụng</th>
                  <th style={{ width: "80px" }}>Nước cũ</th>
                  <th style={{ width: "80px" }}>Nước mới</th>
                  <th style={{ width: "80px" }}>Sử dụng</th>
                  <th style={{ width: "120px" }}>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {roomBills.map((room) => (
                  <tr key={room.roomId}>
                    <td className="fw-semibold">{room.roomName}</td>
                    <td>
                      <small>{room.tenantName}</small>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        size="sm"
                        value={room.electricityPrevious}
                        onChange={(e) =>
                          handleRoomBillChange(
                            room.roomId,
                            "electricityPrevious",
                            Number(e.target.value)
                          )
                        }
                        min="0"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        size="sm"
                        value={room.electricityCurrent}
                        onChange={(e) =>
                          handleRoomBillChange(
                            room.roomId,
                            "electricityCurrent",
                            Number(e.target.value)
                          )
                        }
                        min="0"
                      />
                    </td>
                    <td className="fw-bold text-primary">{room.electricityUsage}</td>
                    <td>
                      <Form.Control
                        type="number"
                        size="sm"
                        value={room.waterPrevious}
                        onChange={(e) =>
                          handleRoomBillChange(
                            room.roomId,
                            "waterPrevious",
                            Number(e.target.value)
                          )
                        }
                        min="0"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        size="sm"
                        value={room.waterCurrent}
                        onChange={(e) =>
                          handleRoomBillChange(
                            room.roomId,
                            "waterCurrent",
                            Number(e.target.value)
                          )
                        }
                        min="0"
                      />
                    </td>
                    <td className="fw-bold text-primary">{room.waterUsage}</td>
                    <td className="fw-bold text-success">
                      {formatPrice(calculateRoomTotal(room))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleCreateBatchBills}>
            <FaPlus className="me-2" />
            Tạo hóa đơn
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BillingPage;
