import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import {
  FaCar,
  FaMapMarkerAlt,
  FaRuler,
  FaSnowflake,
  FaUsers,
  FaWifi,
} from "react-icons/fa";
import type { Room } from "../../types/Room";

interface RoomCardProps {
  room: Room;
  onViewDetails?: (roomId: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onViewDetails }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getRoomTypeLabel = (type: string) => {
    const typeLabels = {
      single: "Phòng đơn",
      shared: "Phòng chia sẻ",
      apartment: "Căn hộ",
      studio: "Studio",
    };
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(room.id);
    } else {
      // Navigate to room details page
      window.location.href = `/room/${room.id}`;
    }
  };

  return (
    <Card className="h-100 shadow-sm hover-card">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={room.images[0] || "/placeholder-room.jpg"}
          alt={room.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Badge
          bg={room.isAvailable ? "success" : "secondary"}
          className="position-absolute top-0 end-0 m-2"
        >
          {room.isAvailable ? "Có sẵn" : "Đã thuê"}
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold mb-2">{room.title}</Card.Title>

        <div className="mb-2">
          <FaMapMarkerAlt className="text-muted me-1" />
          <small className="text-muted">
            {room.district}, {room.city}
          </small>
        </div>

        <div className="mb-2">
          <Badge bg="outline-primary" className="me-2">
            {getRoomTypeLabel(room.roomType)}
          </Badge>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-6">
            <small className="text-muted d-flex align-items-center">
              <FaRuler className="me-1" />
              {room.area}m²
            </small>
          </div>
          <div className="col-6">
            <small className="text-muted d-flex align-items-center">
              <FaUsers className="me-1" />
              Tối đa {room.maxOccupants} người
            </small>
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex flex-wrap gap-1">
            {room.internetIncluded && (
              <Badge
                bg="light"
                text="dark"
                className="d-flex align-items-center"
              >
                <FaWifi className="me-1" /> WiFi
              </Badge>
            )}
            {room.parkingIncluded && (
              <Badge
                bg="light"
                text="dark"
                className="d-flex align-items-center"
              >
                <FaCar className="me-1" /> Gửi xe
              </Badge>
            )}
            {room.airConditioned && (
              <Badge
                bg="light"
                text="dark"
                className="d-flex align-items-center"
              >
                <FaSnowflake className="me-1" /> Điều hòa
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="h5 text-primary mb-0 fw-bold">
              {formatPrice(room.price)}/tháng
            </span>
          </div>

          <Button
            variant="primary"
            size="sm"
            className="w-100"
            onClick={handleViewDetails}
            disabled={!room.isAvailable}
          >
            Xem chi tiết
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RoomCard;
