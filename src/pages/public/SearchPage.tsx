import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import RoomCard from "../../components/common/RoomCard";
import { mockRooms } from "../../data/mockData";
import type { Room, RoomFilter } from "../../types/Room";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>(mockRooms);

  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<RoomFilter>({});
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  useEffect(() => {
    // Simulate API call
    const fetchRooms = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRooms(mockRooms);
      setLoading(false);
    };

    fetchRooms();
  }, []);

  const handleFilterChange = (field: keyof RoomFilter, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log("Searching with filters:", filters, "keyword:", keyword);
  };

  const handleViewRoomDetails = (roomId: string) => {
    console.log("View room details:", roomId);
    // Navigate to room details page
  };

  const filteredRooms = rooms.filter((room) => {
    if (keyword && !room.title.toLowerCase().includes(keyword.toLowerCase())) {
      return false;
    }
    if (filters.city && room.city !== filters.city) {
      return false;
    }
    if (filters.minPrice && room.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && room.price > filters.maxPrice) {
      return false;
    }
    if (filters.roomType && room.roomType !== filters.roomType) {
      return false;
    }
    return true;
  });

  return (
    <Container className="py-4">
      <Row>
        {/* Filters Sidebar */}
        <Col lg={3} className="mb-4">
          <Card className="sticky-top">
            <Card.Header>
              <h5 className="mb-0">
                <FaFilter className="me-2" />
                Bộ lọc tìm kiếm
              </h5>
            </Card.Header>
            <Card.Body>
              {/* Search Keyword */}
              <Form.Group className="mb-3">
                <Form.Label>Từ khóa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập từ khóa..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </Form.Group>

              <Accordion defaultActiveKey="0">
                {/* Location Filter */}
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Vị trí</Accordion.Header>
                  <Accordion.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Thành phố</Form.Label>
                      <Form.Select
                        value={filters.city || ""}
                        onChange={(e) =>
                          handleFilterChange("city", e.target.value)
                        }
                      >
                        <option value="">Tất cả</option>
                        <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Quận/Huyện</Form.Label>
                      <Form.Select
                        value={filters.district || ""}
                        onChange={(e) =>
                          handleFilterChange("district", e.target.value)
                        }
                      >
                        <option value="">Tất cả</option>
                        <option value="Quận 1">Quận 1</option>
                        <option value="Quận 3">Quận 3</option>
                        <option value="Quận 7">Quận 7</option>
                      </Form.Select>
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Price Filter */}
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Mức giá</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Từ (VNĐ)</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="0"
                            value={filters.minPrice || ""}
                            onChange={(e) =>
                              handleFilterChange(
                                "minPrice",
                                Number(e.target.value)
                              )
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Đến (VNĐ)</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="10000000"
                            value={filters.maxPrice || ""}
                            onChange={(e) =>
                              handleFilterChange(
                                "maxPrice",
                                Number(e.target.value)
                              )
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Room Type Filter */}
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Loại phòng</Accordion.Header>
                  <Accordion.Body>
                    <Form.Select
                      value={filters.roomType || ""}
                      onChange={(e) =>
                        handleFilterChange("roomType", e.target.value)
                      }
                    >
                      <option value="">Tất cả</option>
                      <option value="single">Phòng đơn</option>
                      <option value="shared">Phòng chia sẻ</option>
                      <option value="apartment">Căn hộ</option>
                      <option value="studio">Studio</option>
                    </Form.Select>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Amenities Filter */}
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Tiện nghi</Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type="checkbox"
                      label="Điều hòa"
                      checked={filters.airConditioned || false}
                      onChange={(e) =>
                        handleFilterChange("airConditioned", e.target.checked)
                      }
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      label="Nội thất"
                      checked={filters.furnished || false}
                      onChange={(e) =>
                        handleFilterChange("furnished", e.target.checked)
                      }
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      label="Chỗ gửi xe"
                      checked={filters.parkingIncluded || false}
                      onChange={(e) =>
                        handleFilterChange("parkingIncluded", e.target.checked)
                      }
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Button
                variant="primary"
                className="w-100 mt-3"
                onClick={handleSearch}
              >
                <FaSearch className="me-2" />
                Tìm kiếm
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Results */}
        <Col lg={9}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Kết quả tìm kiếm</h4>
            <span className="text-muted">
              {loading
                ? "Đang tìm..."
                : `${filteredRooms.length} phòng được tìm thấy`}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <Row className="g-4">
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <Col md={6} xl={4} key={room.id}>
                    <RoomCard
                      room={room}
                      onViewDetails={handleViewRoomDetails}
                    />
                  </Col>
                ))
              ) : (
                <Col>
                  <Card className="text-center py-5">
                    <Card.Body>
                      <h5>Không tìm thấy phòng trọ nào</h5>
                      <p className="text-muted">
                        Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;
