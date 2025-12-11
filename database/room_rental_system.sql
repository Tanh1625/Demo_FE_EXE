-- =============================================
-- Room Rental Management System Database
-- Hệ thống quản lý cho thuê phòng trọ
-- Created: December 2025
-- =============================================

-- Drop tables if exists (for clean installation)
DROP TABLE IF EXISTS service_reviews;
DROP TABLE IF EXISTS service_requests;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS bill_details;
DROP TABLE IF EXISTS bills;
DROP TABLE IF EXISTS rental_payments;
DROP TABLE IF EXISTS utility_readings;
DROP TABLE IF EXISTS rental_contracts;
DROP TABLE IF EXISTS room_amenities;
DROP TABLE IF EXISTS amenities;
DROP TABLE IF EXISTS room_images;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS users;

-- =============================================
-- Table: users
-- Quản lý thông tin người dùng (chủ trọ, người thuê)
-- =============================================
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('landlord', 'seeker', 'guest') NOT NULL DEFAULT 'guest',
    avatar VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table: rooms
-- Quản lý thông tin phòng trọ
-- =============================================
CREATE TABLE rooms (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    landlord_id VARCHAR(36) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    address VARCHAR(300) NOT NULL,
    district VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    area DECIMAL(6, 2) NOT NULL COMMENT 'Diện tích (m²)',
    room_type ENUM('single', 'shared', 'apartment', 'studio') NOT NULL,
    max_occupants INT DEFAULT 1,
    electricity_price DECIMAL(10, 2) COMMENT 'Giá điện (VND/kWh)',
    water_price DECIMAL(10, 2) COMMENT 'Giá nước (VND/m³)',
    internet_included BOOLEAN DEFAULT FALSE,
    parking_included BOOLEAN DEFAULT FALSE,
    air_conditioned BOOLEAN DEFAULT FALSE,
    furnished BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (landlord_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_landlord (landlord_id),
    INDEX idx_available (is_available),
    INDEX idx_city (city),
    INDEX idx_district (district),
    INDEX idx_price (price),
    INDEX idx_room_type (room_type),
    FULLTEXT idx_title_desc (title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table: room_images
-- Quản lý hình ảnh phòng trọ
-- =============================================
CREATE TABLE room_images (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    room_id VARCHAR(36) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    INDEX idx_room (room_id),
    INDEX idx_primary (is_primary)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table: amenities
-- Danh mục tiện nghi
-- =============================================
CREATE TABLE amenities (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table: room_amenities
-- Liên kết phòng và tiện nghi
-- =============================================
CREATE TABLE room_amenities (
    room_id VARCHAR(36) NOT NULL,
    amenity_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (room_id, amenity_id),
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table: rental_contracts
-- Hợp đồng thuê phòng
-- =============================================
CREATE TABLE rental_contracts (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    room_id VARCHAR(36) NOT NULL,
    tenant_id VARCHAR(36) NOT NULL,
    landlord_id VARCHAR(36) NOT NULL,
    monthly_rent DECIMAL(12, 2) NOT NULL,
    deposit_amount DECIMAL(12, 2) NOT NULL COMMENT 'Tiền cọc',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    contract_status ENUM('active', 'expired', 'terminated', 'pending') NOT NULL DEFAULT 'pending',
    electricity_rate DECIMAL(10, 2) NOT NULL COMMENT 'Giá điện (VND/kWh)',
    water_rate DECIMAL(10, 2) NOT NULL COMMENT 'Giá nước (VND/m³)',
    service_fees DECIMAL(12, 2) DEFAULT 0 COMMENT 'Phí dịch vụ khác',
    contract_notes TEXT,
    termination_reason TEXT,
    terminated_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (landlord_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_room (room_id),
    INDEX idx_tenant (tenant_id),
    INDEX idx_landlord (landlord_id),
    INDEX idx_status (contract_status),
    INDEX idx_dates (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table: utility_readings
-- Chỉ số điện nước hàng tháng
-- =============================================
CREATE TABLE utility_readings (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    contract_id VARCHAR(36) NOT NULL,
    month INT NOT NULL COMMENT 'Tháng (1-12)',
    year INT NOT NULL COMMENT 'Năm',
    electricity_previous DECIMAL(10, 2) NOT NULL COMMENT 'Chỉ số điện đầu kỳ',
    electricity_current DECIMAL(10, 2) NOT NULL COMMENT 'Chỉ số điện cuối kỳ',
    electricity_usage DECIMAL(10, 2) AS (electricity_current - electricity_previous) STORED,
    water_previous DECIMAL(10, 2) NOT NULL COMMENT 'Chỉ số nước đầu kỳ',
    water_current DECIMAL(10, 2) NOT NULL COMMENT 'Chỉ số nước cuối kỳ',
    water_usage DECIMAL(10, 2) AS (water_current - water_previous) STORED,
    reading_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES rental_contracts(id) ON DELETE CASCADE,
    INDEX idx_contract (contract_id),
    INDEX idx_period (year, month),
    UNIQUE KEY unique_contract_period (contract_id, year, month)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table: bills
-- Hóa đơn thanh toán hàng tháng
-- =============================================
CREATE TABLE bills (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    contract_id VARCHAR(36) NOT NULL,
    room_id VARCHAR(36) NOT NULL,
    tenant_id VARCHAR(36) NOT NULL,
    landlord_id VARCHAR(36) NOT NULL,
    month INT NOT NULL COMMENT 'Tháng (1-12)',
    year INT NOT NULL COMMENT 'Năm',
    utility_reading_id VARCHAR(36),
    
    -- Chi tiết các khoản phí
    room_rent DECIMAL(12, 2) NOT NULL COMMENT 'Tiền phòng',
    electricity_usage DECIMAL(10, 2) DEFAULT 0 COMMENT 'Số điện tiêu thụ (kWh)',
    electricity_cost DECIMAL(12, 2) DEFAULT 0 COMMENT 'Tiền điện',
    water_usage DECIMAL(10, 2) DEFAULT 0 COMMENT 'Số nước tiêu thụ (m³)',
    water_cost DECIMAL(12, 2) DEFAULT 0 COMMENT 'Tiền nước',
    service_fees DECIMAL(12, 2) DEFAULT 0 COMMENT 'Phí dịch vụ',
    other_fees DECIMAL(12, 2) DEFAULT 0 COMMENT 'Phí khác',
    total_amount DECIMAL(12, 2) NOT NULL COMMENT 'Tổng tiền',
    
    -- Thông tin thanh toán
    due_date DATE NOT NULL COMMENT 'Hạn thanh toán',
    paid_date DATE COMMENT 'Ngày thanh toán',
    status ENUM('pending', 'paid', 'overdue', 'cancelled') NOT NULL DEFAULT 'pending',
    payment_method VARCHAR(50) COMMENT 'Phương thức thanh toán',
    transaction_id VARCHAR(100) COMMENT 'Mã giao dịch',
    
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (contract_id) REFERENCES rental_contracts(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (landlord_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (utility_reading_id) REFERENCES utility_readings(id) ON DELETE SET NULL,
    
    INDEX idx_contract (contract_id),
    INDEX idx_tenant (tenant_id),
    INDEX idx_landlord (landlord_id),
    INDEX idx_status (status),
    INDEX idx_period (year, month),
    INDEX idx_due_date (due_date),
    UNIQUE KEY unique_contract_period (contract_id, year, month)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table: rental_payments
-- Lịch sử thanh toán
-- =============================================
CREATE TABLE rental_payments (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    bill_id VARCHAR(36) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50) NOT NULL COMMENT 'Tiền mặt, chuyển khoản, ví điện tử',
    transaction_id VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE,
    INDEX idx_bill (bill_id),
    INDEX idx_payment_date (payment_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table: services
-- Dịch vụ bảo trì, vệ sinh, v.v.
-- =============================================
CREATE TABLE services (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category ENUM('cleaning', 'maintenance', 'security', 'utilities', 'other') NOT NULL,
    provider VARCHAR(200) NOT NULL COMMENT 'Nhà cung cấp dịch vụ',
    contact_phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(100),
    
    -- Giá dịch vụ
    price_min DECIMAL(12, 2) NOT NULL,
    price_max DECIMAL(12, 2) NOT NULL,
    price_unit ENUM('per_hour', 'per_room', 'per_service', 'monthly') NOT NULL,
    
    -- Khu vực phục vụ
    coverage_cities TEXT COMMENT 'JSON array của các thành phố',
    coverage_districts TEXT COMMENT 'JSON array của các quận/huyện',
    
    -- Giờ làm việc
    available_hours_start TIME,
    available_hours_end TIME,
    
    rating DECIMAL(3, 2) DEFAULT 0 COMMENT 'Đánh giá (0-5)',
    review_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_rating (rating),
    INDEX idx_active (is_active),
    FULLTEXT idx_name_desc (name, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table: service_requests
-- Yêu cầu dịch vụ từ người thuê
-- =============================================
CREATE TABLE service_requests (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    service_id VARCHAR(36) NOT NULL,
    requester_id VARCHAR(36) NOT NULL,
    contract_id VARCHAR(36),
    room_address VARCHAR(300) NOT NULL,
    requested_date DATE NOT NULL,
    preferred_time VARCHAR(50),
    status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    estimated_price DECIMAL(12, 2),
    actual_price DECIMAL(12, 2),
    notes TEXT,
    completion_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (contract_id) REFERENCES rental_contracts(id) ON DELETE SET NULL,
    
    INDEX idx_service (service_id),
    INDEX idx_requester (requester_id),
    INDEX idx_status (status),
    INDEX idx_requested_date (requested_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table: service_reviews
-- Đánh giá dịch vụ
-- =============================================
CREATE TABLE service_reviews (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    service_id VARCHAR(36) NOT NULL,
    service_request_id VARCHAR(36),
    reviewer_id VARCHAR(36) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (service_request_id) REFERENCES service_requests(id) ON DELETE SET NULL,
    FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_service (service_id),
    INDEX idx_reviewer (reviewer_id),
    INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- SAMPLE DATA - Dữ liệu mẫu
-- =============================================

-- Insert sample users
INSERT INTO users (id, name, email, password_hash, phone, role, avatar) VALUES
('1', 'Nguyễn Văn Thành', 'landlord@example.com', '$2b$10$example_hash_landlord', '0123456789', 'landlord', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'),
('2', 'Trần Thị Hương', 'seeker@example.com', '$2b$10$example_hash_seeker', '0987654321', 'seeker', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'),
('3', 'Lê Minh Quân', 'quan.le@gmail.com', '$2b$10$example_hash_quan', '0909123456', 'landlord', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
('4', 'Phạm Thu Hà', 'ha.pham@gmail.com', '$2b$10$example_hash_ha', '0912345678', 'seeker', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150');

-- Insert sample amenities
INSERT INTO amenities (id, name, icon, description) VALUES
('1', 'WiFi', 'wifi', 'Mạng Internet không dây'),
('2', 'Điều hòa', 'snowflake', 'Máy lạnh điều hòa nhiệt độ'),
('3', 'Tủ lạnh', 'box', 'Tủ lạnh bảo quản thực phẩm'),
('4', 'Máy giặt', 'washing-machine', 'Máy giặt chung hoặc riêng'),
('5', 'Bãi xe', 'car', 'Chỗ để xe miễn phí'),
('6', 'An ninh 24/7', 'shield', 'Bảo vệ và camera giám sát'),
('7', 'Thang máy', 'elevator', 'Thang máy chở khách'),
('8', 'Nóng lạnh', 'shower', 'Máy nước nóng');

-- Insert sample rooms
INSERT INTO rooms (id, landlord_id, title, description, address, district, city, price, area, room_type, max_occupants, electricity_price, water_price, internet_included, parking_included, air_conditioned, furnished, is_available) VALUES
('1', '1', 'Phòng trọ cao cấp gần ĐH Bách Khoa', 'Phòng trọ đầy đủ tiện nghi, gần trường đại học, an ninh tốt', '123 Đường Lý Thường Kiệt', 'Quận 10', 'TP.HCM', 4500000, 25, 'single', 2, 3500, 20000, TRUE, TRUE, TRUE, TRUE, TRUE),
('2', '1', 'Phòng trọ giá rẻ Gò Vấp', 'Phòng trọ sạch sẽ, giá cả phải chăng, gần chợ', '456 Đường Phan Văn Trị', 'Gò Vấp', 'TP.HCM', 3200000, 20, 'single', 1, 3500, 20000, TRUE, TRUE, FALSE, FALSE, TRUE),
('3', '3', 'Căn hộ studio Quận 1', 'Căn hộ mini đầy đủ tiện nghi, view đẹp', '789 Nguyễn Huệ', 'Quận 1', 'TP.HCM', 8000000, 35, 'studio', 2, 4000, 25000, TRUE, TRUE, TRUE, TRUE, FALSE);

-- Insert room images
INSERT INTO room_images (room_id, image_url, is_primary, display_order) VALUES
('1', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', TRUE, 1),
('1', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', FALSE, 2),
('2', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800', TRUE, 1),
('3', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', TRUE, 1);

-- Insert room amenities
INSERT INTO room_amenities (room_id, amenity_id) VALUES
('1', '1'), ('1', '2'), ('1', '3'), ('1', '4'), ('1', '5'), ('1', '6'),
('2', '1'), ('2', '5'), ('2', '6'),
('3', '1'), ('3', '2'), ('3', '3'), ('3', '4'), ('3', '7'), ('3', '8');

-- Insert sample rental contract
INSERT INTO rental_contracts (id, room_id, tenant_id, landlord_id, monthly_rent, deposit_amount, start_date, end_date, contract_status, electricity_rate, water_rate, service_fees) VALUES
('1', '3', '2', '3', 8000000, 16000000, '2024-10-01', '2025-09-30', 'active', 4000, 25000, 200000);

-- Insert sample utility readings
INSERT INTO utility_readings (id, contract_id, month, year, electricity_previous, electricity_current, water_previous, water_current, reading_date) VALUES
('1', '1', 10, 2024, 1000, 1150, 50, 55, '2024-10-31'),
('2', '1', 11, 2024, 1150, 1280, 55, 60, '2024-11-30');

-- Insert sample bills
INSERT INTO bills (id, contract_id, room_id, tenant_id, landlord_id, month, year, utility_reading_id, room_rent, electricity_usage, electricity_cost, water_usage, water_cost, service_fees, other_fees, total_amount, due_date, status) VALUES
('1', '1', '3', '2', '3', 10, 2024, '1', 8000000, 150, 600000, 5, 125000, 200000, 0, 8925000, '2024-11-05', 'paid'),
('2', '1', '3', '2', '3', 11, 2024, '2', 8000000, 130, 520000, 5, 125000, 200000, 0, 8845000, '2024-12-05', 'pending');

-- Insert sample services
INSERT INTO services (id, name, description, category, provider, contact_phone, contact_email, price_min, price_max, price_unit, rating, review_count, is_active) VALUES
('1', 'Dịch vụ vệ sinh phòng trọ', 'Vệ sinh tổng quát, lau dọn phòng', 'cleaning', 'Công ty Vệ Sinh Sạch', '0901234567', 'contact@vesinhsach.vn', 200000, 500000, 'per_room', 4.5, 120, TRUE),
('2', 'Sửa chữa điện nước', 'Sửa chữa hệ thống điện, nước, máy lạnh', 'maintenance', 'Thợ Điện Tín', '0912345678', 'thodientin@gmail.com', 150000, 1000000, 'per_service', 4.8, 85, TRUE);

-- Insert sample service requests
INSERT INTO service_requests (id, service_id, requester_id, contract_id, room_address, requested_date, preferred_time, status, estimated_price) VALUES
('1', '1', '2', '1', '789 Nguyễn Huệ, Quận 1, TP.HCM', '2024-12-15', '09:00-11:00', 'pending', 300000);

-- =============================================
-- VIEWS - Các view hữu ích
-- =============================================

-- View: Thống kê phòng trọ của chủ trọ
CREATE OR REPLACE VIEW v_landlord_room_stats AS
SELECT 
    u.id AS landlord_id,
    u.name AS landlord_name,
    COUNT(r.id) AS total_rooms,
    SUM(CASE WHEN r.is_available = TRUE THEN 1 ELSE 0 END) AS available_rooms,
    SUM(CASE WHEN r.is_available = FALSE THEN 1 ELSE 0 END) AS occupied_rooms,
    SUM(r.price) AS total_potential_revenue
FROM users u
LEFT JOIN rooms r ON u.id = r.landlord_id AND r.is_active = TRUE
WHERE u.role = 'landlord'
GROUP BY u.id, u.name;

-- View: Hóa đơn chi tiết với thông tin đầy đủ
CREATE OR REPLACE VIEW v_bill_details AS
SELECT 
    b.id AS bill_id,
    b.month,
    b.year,
    b.status,
    b.total_amount,
    b.due_date,
    b.paid_date,
    r.title AS room_title,
    r.address AS room_address,
    t.name AS tenant_name,
    t.email AS tenant_email,
    t.phone AS tenant_phone,
    l.name AS landlord_name,
    l.email AS landlord_email,
    l.phone AS landlord_phone,
    rc.contract_status,
    b.created_at,
    b.updated_at
FROM bills b
JOIN rooms r ON b.room_id = r.id
JOIN users t ON b.tenant_id = t.id
JOIN users l ON b.landlord_id = l.id
JOIN rental_contracts rc ON b.contract_id = rc.id;

-- View: Hợp đồng đang hoạt động
CREATE OR REPLACE VIEW v_active_contracts AS
SELECT 
    rc.id AS contract_id,
    rc.start_date,
    rc.end_date,
    rc.monthly_rent,
    rc.contract_status,
    r.id AS room_id,
    r.title AS room_title,
    r.address AS room_address,
    t.id AS tenant_id,
    t.name AS tenant_name,
    t.email AS tenant_email,
    t.phone AS tenant_phone,
    l.id AS landlord_id,
    l.name AS landlord_name,
    l.email AS landlord_email,
    DATEDIFF(rc.end_date, CURDATE()) AS days_until_expiry
FROM rental_contracts rc
JOIN rooms r ON rc.room_id = r.id
JOIN users t ON rc.tenant_id = t.id
JOIN users l ON rc.landlord_id = l.id
WHERE rc.contract_status = 'active';

-- =============================================
-- STORED PROCEDURES - Các thủ tục lưu trữ
-- =============================================

-- Procedure: Tạo hóa đơn tự động cho tháng
DELIMITER //
CREATE PROCEDURE sp_generate_monthly_bills(IN p_month INT, IN p_year INT)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_contract_id VARCHAR(36);
    DECLARE v_room_id VARCHAR(36);
    DECLARE v_tenant_id VARCHAR(36);
    DECLARE v_landlord_id VARCHAR(36);
    DECLARE v_monthly_rent DECIMAL(12,2);
    DECLARE v_electricity_rate DECIMAL(10,2);
    DECLARE v_water_rate DECIMAL(10,2);
    DECLARE v_service_fees DECIMAL(12,2);
    
    DECLARE cur_contracts CURSOR FOR 
        SELECT id, room_id, tenant_id, landlord_id, monthly_rent, 
               electricity_rate, water_rate, service_fees
        FROM rental_contracts
        WHERE contract_status = 'active'
        AND NOT EXISTS (
            SELECT 1 FROM bills 
            WHERE bills.contract_id = rental_contracts.id 
            AND bills.month = p_month 
            AND bills.year = p_year
        );
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur_contracts;
    
    read_loop: LOOP
        FETCH cur_contracts INTO v_contract_id, v_room_id, v_tenant_id, 
                                  v_landlord_id, v_monthly_rent, v_electricity_rate, 
                                  v_water_rate, v_service_fees;
        
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Insert bill with basic rent only (utilities to be updated later)
        INSERT INTO bills (
            contract_id, room_id, tenant_id, landlord_id,
            month, year, room_rent, service_fees, total_amount,
            due_date, status
        ) VALUES (
            v_contract_id, v_room_id, v_tenant_id, v_landlord_id,
            p_month, p_year, v_monthly_rent, v_service_fees,
            v_monthly_rent + v_service_fees,
            DATE_ADD(LAST_DAY(CONCAT(p_year, '-', p_month, '-01')), INTERVAL 5 DAY),
            'pending'
        );
    END LOOP;
    
    CLOSE cur_contracts;
END //
DELIMITER ;

-- Procedure: Cập nhật điện nước cho hóa đơn
DELIMITER //
CREATE PROCEDURE sp_update_bill_utilities(
    IN p_bill_id VARCHAR(36),
    IN p_electricity_usage DECIMAL(10,2),
    IN p_water_usage DECIMAL(10,2)
)
BEGIN
    DECLARE v_electricity_rate DECIMAL(10,2);
    DECLARE v_water_rate DECIMAL(10,2);
    DECLARE v_room_rent DECIMAL(12,2);
    DECLARE v_service_fees DECIMAL(12,2);
    DECLARE v_other_fees DECIMAL(12,2);
    DECLARE v_electricity_cost DECIMAL(12,2);
    DECLARE v_water_cost DECIMAL(12,2);
    DECLARE v_total DECIMAL(12,2);
    
    -- Get contract rates and current bill values
    SELECT rc.electricity_rate, rc.water_rate, b.room_rent, b.service_fees, b.other_fees
    INTO v_electricity_rate, v_water_rate, v_room_rent, v_service_fees, v_other_fees
    FROM bills b
    JOIN rental_contracts rc ON b.contract_id = rc.id
    WHERE b.id = p_bill_id;
    
    -- Calculate costs
    SET v_electricity_cost = p_electricity_usage * v_electricity_rate;
    SET v_water_cost = p_water_usage * v_water_rate;
    SET v_total = v_room_rent + v_electricity_cost + v_water_cost + v_service_fees + COALESCE(v_other_fees, 0);
    
    -- Update bill
    UPDATE bills
    SET electricity_usage = p_electricity_usage,
        electricity_cost = v_electricity_cost,
        water_usage = p_water_usage,
        water_cost = v_water_cost,
        total_amount = v_total
    WHERE id = p_bill_id;
END //
DELIMITER ;

-- Procedure: Đánh dấu hóa đơn đã thanh toán
DELIMITER //
CREATE PROCEDURE sp_mark_bill_paid(
    IN p_bill_id VARCHAR(36),
    IN p_payment_method VARCHAR(50),
    IN p_transaction_id VARCHAR(100)
)
BEGIN
    UPDATE bills
    SET status = 'paid',
        paid_date = CURDATE(),
        payment_method = p_payment_method,
        transaction_id = p_transaction_id
    WHERE id = p_bill_id;
    
    -- Insert payment record
    INSERT INTO rental_payments (bill_id, amount, payment_date, payment_method, transaction_id)
    SELECT id, total_amount, CURDATE(), p_payment_method, p_transaction_id
    FROM bills
    WHERE id = p_bill_id;
END //
DELIMITER ;

-- =============================================
-- TRIGGERS - Các trigger tự động
-- =============================================

-- Trigger: Cập nhật rating service khi có review mới
DELIMITER //
CREATE TRIGGER trg_update_service_rating_after_insert
AFTER INSERT ON service_reviews
FOR EACH ROW
BEGIN
    UPDATE services
    SET rating = (
            SELECT AVG(rating)
            FROM service_reviews
            WHERE service_id = NEW.service_id
        ),
        review_count = (
            SELECT COUNT(*)
            FROM service_reviews
            WHERE service_id = NEW.service_id
        )
    WHERE id = NEW.service_id;
END //
DELIMITER ;

-- Trigger: Tự động đánh dấu hóa đơn quá hạn
DELIMITER //
CREATE TRIGGER trg_check_bill_overdue_before_update
BEFORE UPDATE ON bills
FOR EACH ROW
BEGIN
    IF NEW.status = 'pending' AND NEW.due_date < CURDATE() THEN
        SET NEW.status = 'overdue';
    END IF;
END //
DELIMITER ;

-- Trigger: Cập nhật trạng thái phòng khi có hợp đồng mới
DELIMITER //
CREATE TRIGGER trg_update_room_availability_after_contract
AFTER INSERT ON rental_contracts
FOR EACH ROW
BEGIN
    IF NEW.contract_status = 'active' THEN
        UPDATE rooms
        SET is_available = FALSE
        WHERE id = NEW.room_id;
    END IF;
END //
DELIMITER ;

-- Trigger: Cập nhật trạng thái phòng khi hợp đồng kết thúc
DELIMITER //
CREATE TRIGGER trg_update_room_availability_after_contract_end
AFTER UPDATE ON rental_contracts
FOR EACH ROW
BEGIN
    IF OLD.contract_status = 'active' AND NEW.contract_status IN ('expired', 'terminated') THEN
        UPDATE rooms
        SET is_available = TRUE
        WHERE id = NEW.room_id;
    END IF;
END //
DELIMITER ;

-- =============================================
-- INDEXES - Các index bổ sung cho hiệu năng
-- =============================================

-- Composite indexes for common queries
CREATE INDEX idx_bills_tenant_status ON bills(tenant_id, status);
CREATE INDEX idx_bills_landlord_status ON bills(landlord_id, status);
CREATE INDEX idx_contracts_dates ON rental_contracts(start_date, end_date, contract_status);
CREATE INDEX idx_rooms_search ON rooms(city, district, price, is_available);

-- =============================================
-- END OF DATABASE SCRIPT
-- =============================================

-- Notes:
-- 1. Đảm bảo MySQL version >= 5.7 để hỗ trợ JSON và generated columns
-- 2. Thay đổi password_hash bằng mật khẩu đã được hash trong production
-- 3. Cấu hình charset utf8mb4 để hỗ trợ tiếng Việt và emoji
-- 4. Định kỳ chạy sp_generate_monthly_bills() để tạo hóa đơn hàng tháng
-- 5. Backup database định kỳ
