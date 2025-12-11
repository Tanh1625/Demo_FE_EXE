import React, { useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { FaEye, FaHeart, FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { FavoriteRoom } from "../../types/LogTracking";
import type { Room } from "../../types/Room";

const FavoriteRoomsPage: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoriteRoom[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  // Mock data
  const mockFavorites: FavoriteRoom[] = [
    {
      id: "fav1",
      userId: "user1",
      roomId: "1",
      addedDate: new Date("2024-11-01"),
      notes: "Phòng đẹp, gần trường",
    },
  ];

  const mockRooms: Room[] = [
    {
      id: "1",
      title: "Phòng trọ cao cấp gần ĐH",
      description: "Phòng mới, đầy đủ tiện nghi, gần trường đại học",
      address: "123 Nguyễn Huệ",
      district: "Quận 1",
      city: "TP. Hồ Chí Minh",
      price: 3500000,
      area: 25,
      roomType: "single",
      amenities: ["WiFi", "Điều hòa", "Nóng lạnh"],
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      ],
      isAvailable: true,
      landlordId: "landlord1",
      hostelName: "Dãy trọ A",
      maxOccupants: 2,
      internetIncluded: true,
      parkingIncluded: true,
      airConditioned: true,
      furnished: true,
      approvalStatus: "approved",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  React.useEffect(() => {
    setFavorites(mockFavorites);
    setRooms(mockRooms);
  }, []);

  const getRoomById = (roomId: string) => {
    return rooms.find((r) => r.id === roomId);
  };

  const handleRemoveFavorite = (favoriteId: string) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn bỏ phòng này khỏi danh sách yêu thích?"
      )
    ) {
      setFavorites((prev) => prev.filter((f) => f.id !== favoriteId));
      alert("Đã xóa khỏi danh sách yêu thích!");
    }
  };

  const handleViewRoom = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          <FaHeart className="text-danger me-2" />
          Phòng yêu thích
        </h2>
        <Badge bg="primary" className="fs-6">
          {favorites.length} phòng
        </Badge>
      </div>

      {favorites.length === 0 ? (
        <Card className="shadow-sm text-center py-5">
          <Card.Body>
            <FaHeart className="text-muted mb-3" size={64} />
            <h5 className="text-muted">Chưa có phòng yêu thích</h5>
            <p className="text-muted">
              Hãy thêm các phòng bạn quan tâm vào danh sách yêu thích để dễ dàng
              theo dõi!
            </p>
            <Button variant="primary" onClick={() => navigate("/search")}>
              Tìm phòng trọ
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-4">
          {favorites.map((favorite) => {
            const room = getRoomById(favorite.roomId);
            if (!room) return null;

            return (
              <Col key={favorite.id} md={6} lg={4}>
                <Card className="shadow-sm h-100">
                  <div
                    className="position-relative"
                    style={{
                      height: "200px",
                      overflow: "hidden",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    {room.images && room.images.length > 0 ? (
                      <img
                        src={room.images[0]}
                        alt={room.title}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                        Không có ảnh
                      </div>
                    )}
                    <Badge
                      bg={room.isAvailable ? "success" : "secondary"}
                      className="position-absolute top-0 end-0 m-2"
                    >
                      {room.isAvailable ? "Có sẵn" : "Đã thuê"}
                    </Badge>
                  </div>

                  <Card.Body>
                    <h5 className="fw-bold mb-2">{room.title}</h5>
                    <div className="text-muted mb-2">
                      <FaMapMarkerAlt className="me-1" />
                      <small>
                        {room.district}, {room.city}
                      </small>
                    </div>
                    <p className="text-muted small mb-2">{room.description}</p>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold text-primary fs-5">
                        {formatPrice(room.price)}
                      </span>
                      <span className="text-muted">{room.area}m²</span>
                    </div>

                    <div className="d-flex flex-wrap gap-1 mb-3">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <Badge
                          key={idx}
                          bg="light"
                          text="dark"
                          className="small"
                        >
                          {amenity}
                        </Badge>
                      ))}
                    </div>

                    {favorite.notes && (
                      <div className="bg-light p-2 rounded mb-3">
                        <small className="text-muted">
                          <strong>Ghi chú:</strong> {favorite.notes}
                        </small>
                      </div>
                    )}

                    <div className="d-flex gap-2">
                      <Button
                        variant="primary"
                        className="flex-grow-1"
                        onClick={() => handleViewRoom(room.id)}
                      >
                        <FaEye className="me-2" />
                        Xem chi tiết
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleRemoveFavorite(favorite.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>

                    <div className="text-muted small mt-2">
                      Đã lưu:{" "}
                      {new Date(favorite.addedDate).toLocaleDateString("vi-VN")}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default FavoriteRoomsPage;
