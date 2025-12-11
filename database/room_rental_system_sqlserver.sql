-- =============================================
-- Room Rental Management System Database
-- Hệ thống quản lý cho thuê phòng trọ
-- SQL SERVER VERSION
-- Created: December 2025
-- =============================================

-- HƯỚNG DẪN SỬ DỤNG:
-- 1. Nếu tạo database mới: Uncomment phần CREATE DATABASE bên dưới
-- 2. Nếu database đã tồn tại: Chỉ cần USE database_name
-- 3. Script sẽ tự động drop và tạo lại các objects

-- =============================================
-- CREATE NEW DATABASE (Uncomment nếu cần)
-- =============================================
/*
-- Đóng tất cả connections hiện tại
USE master;
GO

ALTER DATABASE room_rental_system SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO

DROP DATABASE IF EXISTS room_rental_system;
GO

CREATE DATABASE room_rental_system
COLLATE Vietnamese_CI_AS;
GO
*/

-- =============================================
-- USE EXISTING DATABASE
-- =============================================
-- Thay đổi tên database nếu cần
USE room_rental_system;
GO

-- Drop existing objects in correct order
PRINT 'Dropping existing objects...';

-- Drop Triggers
IF OBJECT_ID('trg_rooms_updated_at', 'TR') IS NOT NULL DROP TRIGGER trg_rooms_updated_at;
IF OBJECT_ID('trg_users_updated_at', 'TR') IS NOT NULL DROP TRIGGER trg_users_updated_at;
IF OBJECT_ID('trg_update_room_availability_after_contract_end', 'TR') IS NOT NULL DROP TRIGGER trg_update_room_availability_after_contract_end;
IF OBJECT_ID('trg_update_room_availability_after_contract', 'TR') IS NOT NULL DROP TRIGGER trg_update_room_availability_after_contract;
IF OBJECT_ID('trg_check_bill_overdue_before_update', 'TR') IS NOT NULL DROP TRIGGER trg_check_bill_overdue_before_update;
IF OBJECT_ID('trg_update_service_rating_after_insert', 'TR') IS NOT NULL DROP TRIGGER trg_update_service_rating_after_insert;

-- Drop Stored Procedures
IF OBJECT_ID('sp_mark_bill_paid', 'P') IS NOT NULL DROP PROCEDURE sp_mark_bill_paid;
IF OBJECT_ID('sp_update_bill_utilities', 'P') IS NOT NULL DROP PROCEDURE sp_update_bill_utilities;
IF OBJECT_ID('sp_generate_monthly_bills', 'P') IS NOT NULL DROP PROCEDURE sp_generate_monthly_bills;

-- Drop Views
IF OBJECT_ID('v_active_contracts', 'V') IS NOT NULL DROP VIEW v_active_contracts;
IF OBJECT_ID('v_bill_details', 'V') IS NOT NULL DROP VIEW v_bill_details;
IF OBJECT_ID('v_landlord_room_stats', 'V') IS NOT NULL DROP VIEW v_landlord_room_stats;

-- Drop Tables (in correct order to avoid FK constraints)
IF OBJECT_ID('service_reviews', 'U') IS NOT NULL DROP TABLE service_reviews;
IF OBJECT_ID('service_requests', 'U') IS NOT NULL DROP TABLE service_requests;
IF OBJECT_ID('services', 'U') IS NOT NULL DROP TABLE services;
IF OBJECT_ID('rental_payments', 'U') IS NOT NULL DROP TABLE rental_payments;
IF OBJECT_ID('bills', 'U') IS NOT NULL DROP TABLE bills;
IF OBJECT_ID('utility_readings', 'U') IS NOT NULL DROP TABLE utility_readings;
IF OBJECT_ID('rental_contracts', 'U') IS NOT NULL DROP TABLE rental_contracts;
IF OBJECT_ID('room_amenities', 'U') IS NOT NULL DROP TABLE room_amenities;
IF OBJECT_ID('amenities', 'U') IS NOT NULL DROP TABLE amenities;
IF OBJECT_ID('room_images', 'U') IS NOT NULL DROP TABLE room_images;
IF OBJECT_ID('rooms', 'U') IS NOT NULL DROP TABLE rooms;
IF OBJECT_ID('users', 'U') IS NOT NULL DROP TABLE users;

PRINT 'All existing objects dropped successfully.';
GO

-- =============================================
-- Table: users
-- Quản lý thông tin người dùng (chủ trọ, người thuê)
-- =============================================
CREATE TABLE users (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    password_hash NVARCHAR(255) NOT NULL,
    phone NVARCHAR(20),
    role NVARCHAR(20) NOT NULL DEFAULT 'guest' CHECK (role IN ('landlord', 'seeker', 'guest')),
    avatar NVARCHAR(500),
    is_active BIT DEFAULT 1,
    email_verified BIT DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);
GO

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_phone ON users(phone);
GO

-- =============================================
-- Table: rooms
-- Quản lý thông tin phòng trọ
-- =============================================
CREATE TABLE rooms (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    landlord_id UNIQUEIDENTIFIER NOT NULL,
    title NVARCHAR(200) NOT NULL,
    description NVARCHAR(MAX),
    address NVARCHAR(300) NOT NULL,
    district NVARCHAR(100) NOT NULL,
    city NVARCHAR(100) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    area DECIMAL(6, 2) NOT NULL, -- Diện tích (m²)
    room_type NVARCHAR(20) NOT NULL CHECK (room_type IN ('single', 'shared', 'apartment', 'studio')),
    max_occupants INT DEFAULT 1,
    electricity_price DECIMAL(10, 2), -- Giá điện (VND/kWh)
    water_price DECIMAL(10, 2), -- Giá nước (VND/m³)
    internet_included BIT DEFAULT 0,
    parking_included BIT DEFAULT 0,
    air_conditioned BIT DEFAULT 0,
    furnished BIT DEFAULT 0,
    is_available BIT DEFAULT 1,
    is_active BIT DEFAULT 1,
    view_count INT DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (landlord_id) REFERENCES users(id) ON DELETE CASCADE
);
GO

CREATE INDEX idx_rooms_landlord ON rooms(landlord_id);
CREATE INDEX idx_rooms_available ON rooms(is_available);
CREATE INDEX idx_rooms_city ON rooms(city);
CREATE INDEX idx_rooms_district ON rooms(district);
CREATE INDEX idx_rooms_price ON rooms(price);
CREATE INDEX idx_rooms_room_type ON rooms(room_type);
GO

-- Full-text search cho title và description
-- Cần enable full-text search trên database trước
-- CREATE FULLTEXT CATALOG ft_catalog AS DEFAULT;
-- CREATE FULLTEXT INDEX ON rooms(title, description) KEY INDEX PK__rooms;
GO

-- =============================================
-- Table: room_images
-- Quản lý hình ảnh phòng trọ
-- =============================================
CREATE TABLE room_images (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    room_id UNIQUEIDENTIFIER NOT NULL,
    image_url NVARCHAR(500) NOT NULL,
    is_primary BIT DEFAULT 0,
    display_order INT DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);
GO

CREATE INDEX idx_room_images_room ON room_images(room_id);
CREATE INDEX idx_room_images_primary ON room_images(is_primary);
GO

-- =============================================
-- Table: amenities
-- Danh mục tiện nghi
-- =============================================
CREATE TABLE amenities (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(100) NOT NULL UNIQUE,
    icon NVARCHAR(100),
    description NVARCHAR(MAX),
    created_at DATETIME2 DEFAULT GETDATE()
);
GO

-- =============================================
-- Table: room_amenities
-- Liên kết phòng và tiện nghi
-- =============================================
CREATE TABLE room_amenities (
    room_id UNIQUEIDENTIFIER NOT NULL,
    amenity_id UNIQUEIDENTIFIER NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    PRIMARY KEY (room_id, amenity_id),
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
);
GO

-- =============================================
-- Table: rental_contracts
-- Hợp đồng thuê phòng
-- =============================================
CREATE TABLE rental_contracts (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    room_id UNIQUEIDENTIFIER NOT NULL,
    tenant_id UNIQUEIDENTIFIER NOT NULL,
    landlord_id UNIQUEIDENTIFIER NOT NULL,
    monthly_rent DECIMAL(12, 2) NOT NULL,
    deposit_amount DECIMAL(12, 2) NOT NULL, -- Tiền cọc
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    contract_status NVARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (contract_status IN ('active', 'expired', 'terminated', 'pending')),
    electricity_rate DECIMAL(10, 2) NOT NULL, -- Giá điện (VND/kWh)
    water_rate DECIMAL(10, 2) NOT NULL, -- Giá nước (VND/m³)
    service_fees DECIMAL(12, 2) DEFAULT 0, -- Phí dịch vụ khác
    contract_notes NVARCHAR(MAX),
    termination_reason NVARCHAR(MAX),
    terminated_date DATE,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE NO ACTION,
    FOREIGN KEY (landlord_id) REFERENCES users(id) ON DELETE NO ACTION
);
GO

CREATE INDEX idx_contracts_room ON rental_contracts(room_id);
CREATE INDEX idx_contracts_tenant ON rental_contracts(tenant_id);
CREATE INDEX idx_contracts_landlord ON rental_contracts(landlord_id);
CREATE INDEX idx_contracts_status ON rental_contracts(contract_status);
CREATE INDEX idx_contracts_dates ON rental_contracts(start_date, end_date);
GO

-- =============================================
-- Table: utility_readings
-- Chỉ số điện nước hàng tháng
-- =============================================
CREATE TABLE utility_readings (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    contract_id UNIQUEIDENTIFIER NOT NULL,
    month INT NOT NULL CHECK (month BETWEEN 1 AND 12), -- Tháng (1-12)
    year INT NOT NULL, -- Năm
    electricity_previous DECIMAL(10, 2) NOT NULL, -- Chỉ số điện đầu kỳ
    electricity_current DECIMAL(10, 2) NOT NULL, -- Chỉ số điện cuối kỳ
    electricity_usage AS (electricity_current - electricity_previous) PERSISTED,
    water_previous DECIMAL(10, 2) NOT NULL, -- Chỉ số nước đầu kỳ
    water_current DECIMAL(10, 2) NOT NULL, -- Chỉ số nước cuối kỳ
    water_usage AS (water_current - water_previous) PERSISTED,
    reading_date DATE NOT NULL,
    notes NVARCHAR(MAX),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (contract_id) REFERENCES rental_contracts(id) ON DELETE CASCADE,
    CONSTRAINT UQ_utility_readings_contract_period UNIQUE (contract_id, year, month)
);
GO

CREATE INDEX idx_utility_readings_contract ON utility_readings(contract_id);
CREATE INDEX idx_utility_readings_period ON utility_readings(year, month);
GO

-- =============================================
-- Table: bills
-- Hóa đơn thanh toán hàng tháng
-- =============================================
CREATE TABLE bills (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    contract_id UNIQUEIDENTIFIER NOT NULL,
    room_id UNIQUEIDENTIFIER NOT NULL,
    tenant_id UNIQUEIDENTIFIER NOT NULL,
    landlord_id UNIQUEIDENTIFIER NOT NULL,
    month INT NOT NULL CHECK (month BETWEEN 1 AND 12), -- Tháng (1-12)
    year INT NOT NULL, -- Năm
    utility_reading_id UNIQUEIDENTIFIER,
    
    -- Chi tiết các khoản phí
    room_rent DECIMAL(12, 2) NOT NULL, -- Tiền phòng
    electricity_usage DECIMAL(10, 2) DEFAULT 0, -- Số điện tiêu thụ (kWh)
    electricity_cost DECIMAL(12, 2) DEFAULT 0, -- Tiền điện
    water_usage DECIMAL(10, 2) DEFAULT 0, -- Số nước tiêu thụ (m³)
    water_cost DECIMAL(12, 2) DEFAULT 0, -- Tiền nước
    service_fees DECIMAL(12, 2) DEFAULT 0, -- Phí dịch vụ
    other_fees DECIMAL(12, 2) DEFAULT 0, -- Phí khác
    total_amount DECIMAL(12, 2) NOT NULL, -- Tổng tiền
    
    -- Thông tin thanh toán
    due_date DATE NOT NULL, -- Hạn thanh toán
    paid_date DATE, -- Ngày thanh toán
    status NVARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
    payment_method NVARCHAR(50), -- Phương thức thanh toán
    transaction_id NVARCHAR(100), -- Mã giao dịch
    
    notes NVARCHAR(MAX),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    
    FOREIGN KEY (contract_id) REFERENCES rental_contracts(id) ON DELETE NO ACTION,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE NO ACTION,
    FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE NO ACTION,
    FOREIGN KEY (landlord_id) REFERENCES users(id) ON DELETE NO ACTION,
    FOREIGN KEY (utility_reading_id) REFERENCES utility_readings(id) ON DELETE NO ACTION,
    CONSTRAINT UQ_bills_contract_period UNIQUE (contract_id, year, month)
);
GO

CREATE INDEX idx_bills_contract ON bills(contract_id);
CREATE INDEX idx_bills_tenant ON bills(tenant_id);
CREATE INDEX idx_bills_landlord ON bills(landlord_id);
CREATE INDEX idx_bills_status ON bills(status);
CREATE INDEX idx_bills_period ON bills(year, month);
CREATE INDEX idx_bills_due_date ON bills(due_date);
CREATE INDEX idx_bills_tenant_status ON bills(tenant_id, status);
CREATE INDEX idx_bills_landlord_status ON bills(landlord_id, status);
GO

-- =============================================
-- Table: rental_payments
-- Lịch sử thanh toán
-- =============================================
CREATE TABLE rental_payments (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    bill_id UNIQUEIDENTIFIER NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method NVARCHAR(50) NOT NULL, -- Tiền mặt, chuyển khoản, ví điện tử
    transaction_id NVARCHAR(100),
    notes NVARCHAR(MAX),
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE NO ACTION
);
GO

CREATE INDEX idx_rental_payments_bill ON rental_payments(bill_id);
CREATE INDEX idx_rental_payments_date ON rental_payments(payment_date);
GO

-- =============================================
-- Table: services
-- Dịch vụ bảo trì, vệ sinh, v.v.
-- =============================================
CREATE TABLE services (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(200) NOT NULL,
    description NVARCHAR(MAX),
    category NVARCHAR(20) NOT NULL CHECK (category IN ('cleaning', 'maintenance', 'security', 'utilities', 'other')),
    provider NVARCHAR(200) NOT NULL, -- Nhà cung cấp dịch vụ
    contact_phone NVARCHAR(20) NOT NULL,
    contact_email NVARCHAR(100),
    
    -- Giá dịch vụ
    price_min DECIMAL(12, 2) NOT NULL,
    price_max DECIMAL(12, 2) NOT NULL,
    price_unit NVARCHAR(20) NOT NULL CHECK (price_unit IN ('per_hour', 'per_room', 'per_service', 'monthly')),
    
    -- Khu vực phục vụ (JSON format)
    coverage_cities NVARCHAR(MAX), -- JSON array của các thành phố
    coverage_districts NVARCHAR(MAX), -- JSON array của các quận/huyện
    
    -- Giờ làm việc
    available_hours_start TIME,
    available_hours_end TIME,
    
    rating DECIMAL(3, 2) DEFAULT 0 CHECK (rating BETWEEN 0 AND 5), -- Đánh giá (0-5)
    review_count INT DEFAULT 0,
    is_active BIT DEFAULT 1,
    
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);
GO

CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_rating ON services(rating);
CREATE INDEX idx_services_active ON services(is_active);
GO

-- =============================================
-- Table: service_requests
-- Yêu cầu dịch vụ từ người thuê
-- =============================================
CREATE TABLE service_requests (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    service_id UNIQUEIDENTIFIER NOT NULL,
    requester_id UNIQUEIDENTIFIER NOT NULL,
    contract_id UNIQUEIDENTIFIER,
    room_address NVARCHAR(300) NOT NULL,
    requested_date DATE NOT NULL,
    preferred_time NVARCHAR(50),
    status NVARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
    estimated_price DECIMAL(12, 2),
    actual_price DECIMAL(12, 2),
    notes NVARCHAR(MAX),
    completion_notes NVARCHAR(MAX),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE NO ACTION,
    FOREIGN KEY (contract_id) REFERENCES rental_contracts(id) ON DELETE NO ACTION
);
GO

CREATE INDEX idx_service_requests_service ON service_requests(service_id);
CREATE INDEX idx_service_requests_requester ON service_requests(requester_id);
CREATE INDEX idx_service_requests_status ON service_requests(status);
CREATE INDEX idx_service_requests_date ON service_requests(requested_date);
GO

-- =============================================
-- Table: service_reviews
-- Đánh giá dịch vụ
-- =============================================
CREATE TABLE service_reviews (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    service_id UNIQUEIDENTIFIER NOT NULL,
    service_request_id UNIQUEIDENTIFIER,
    reviewer_id UNIQUEIDENTIFIER NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment NVARCHAR(MAX),
    created_at DATETIME2 DEFAULT GETDATE(),
    
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (service_request_id) REFERENCES service_requests(id) ON DELETE NO ACTION,
    FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE NO ACTION
);
GO

CREATE INDEX idx_service_reviews_service ON service_reviews(service_id);
CREATE INDEX idx_service_reviews_reviewer ON service_reviews(reviewer_id);
CREATE INDEX idx_service_reviews_rating ON service_reviews(rating);
GO

-- =============================================
-- SAMPLE DATA - Dữ liệu mẫu
-- =============================================

-- Insert sample users
INSERT INTO users (id, name, email, password_hash, phone, role, avatar) VALUES
(NEWID(), N'Nguyễn Văn Thành', 'landlord@example.com', '$2b$10$example_hash_landlord', '0123456789', 'landlord', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'),
(NEWID(), N'Trần Thị Hương', 'seeker@example.com', '$2b$10$example_hash_seeker', '0987654321', 'seeker', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'),
(NEWID(), N'Lê Minh Quân', 'quan.le@gmail.com', '$2b$10$example_hash_quan', '0909123456', 'landlord', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
(NEWID(), N'Phạm Thu Hà', 'ha.pham@gmail.com', '$2b$10$example_hash_ha', '0912345678', 'seeker', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150');
GO

-- Lấy user IDs để sử dụng
DECLARE @landlord1_id UNIQUEIDENTIFIER = (SELECT id FROM users WHERE email = 'landlord@example.com');
DECLARE @landlord2_id UNIQUEIDENTIFIER = (SELECT id FROM users WHERE email = 'quan.le@gmail.com');
DECLARE @tenant_id UNIQUEIDENTIFIER = (SELECT id FROM users WHERE email = 'seeker@example.com');

-- Insert sample amenities
INSERT INTO amenities (id, name, icon, description) VALUES
(NEWID(), N'WiFi', 'wifi', N'Mạng Internet không dây'),
(NEWID(), N'Điều hòa', 'snowflake', N'Máy lạnh điều hòa nhiệt độ'),
(NEWID(), N'Tủ lạnh', 'box', N'Tủ lạnh bảo quản thực phẩm'),
(NEWID(), N'Máy giặt', 'washing-machine', N'Máy giặt chung hoặc riêng'),
(NEWID(), N'Bãi xe', 'car', N'Chỗ để xe miễn phí'),
(NEWID(), N'An ninh 24/7', 'shield', N'Bảo vệ và camera giám sát'),
(NEWID(), N'Thang máy', 'elevator', N'Thang máy chở khách'),
(NEWID(), N'Nóng lạnh', 'shower', N'Máy nước nóng');
GO

-- Insert sample rooms (sử dụng biến trong batch riêng)
DECLARE @landlord1_id UNIQUEIDENTIFIER = (SELECT id FROM users WHERE email = 'landlord@example.com');
DECLARE @landlord2_id UNIQUEIDENTIFIER = (SELECT id FROM users WHERE email = 'quan.le@gmail.com');

INSERT INTO rooms (id, landlord_id, title, description, address, district, city, price, area, room_type, max_occupants, electricity_price, water_price, internet_included, parking_included, air_conditioned, furnished, is_available) VALUES
(NEWID(), @landlord1_id, N'Phòng trọ cao cấp gần ĐH Bách Khoa', N'Phòng trọ đầy đủ tiện nghi, gần trường đại học, an ninh tốt', N'123 Đường Lý Thường Kiệt', N'Quận 10', N'TP.HCM', 4500000, 25, 'single', 2, 3500, 20000, 1, 1, 1, 1, 1),
(NEWID(), @landlord1_id, N'Phòng trọ giá rẻ Gò Vấp', N'Phòng trọ sạch sẽ, giá cả phải chăng, gần chợ', N'456 Đường Phan Văn Trị', N'Gò Vấp', N'TP.HCM', 3200000, 20, 'single', 1, 3500, 20000, 1, 1, 0, 0, 1),
(NEWID(), @landlord2_id, N'Căn hộ studio Quận 1', N'Căn hộ mini đầy đủ tiện nghi, view đẹp', N'789 Nguyễn Huệ', N'Quận 1', N'TP.HCM', 8000000, 35, 'studio', 2, 4000, 25000, 1, 1, 1, 1, 0);
GO

-- Insert sample services
INSERT INTO services (id, name, description, category, provider, contact_phone, contact_email, price_min, price_max, price_unit, rating, review_count, is_active) VALUES
(NEWID(), N'Dịch vụ vệ sinh phòng trọ', N'Vệ sinh tổng quát, lau dọn phòng', 'cleaning', N'Công ty Vệ Sinh Sạch', '0901234567', 'contact@vesinhsach.vn', 200000, 500000, 'per_room', 4.5, 120, 1),
(NEWID(), N'Sửa chữa điện nước', N'Sửa chữa hệ thống điện, nước, máy lạnh', 'maintenance', N'Thợ Điện Tín', '0912345678', 'thodientin@gmail.com', 150000, 1000000, 'per_service', 4.8, 85, 1);
GO

-- =============================================
-- VIEWS - Các view hữu ích
-- =============================================

-- View: Thống kê phòng trọ của chủ trọ
GO
PRINT 'Creating view: v_landlord_room_stats';
GO
CREATE VIEW v_landlord_room_stats AS
SELECT 
    u.id AS landlord_id,
    u.name AS landlord_name,
    COUNT(r.id) AS total_rooms,
    SUM(CASE WHEN r.is_available = 1 THEN 1 ELSE 0 END) AS available_rooms,
    SUM(CASE WHEN r.is_available = 0 THEN 1 ELSE 0 END) AS occupied_rooms,
    SUM(r.price) AS total_potential_revenue
FROM users u
LEFT JOIN rooms r ON u.id = r.landlord_id AND r.is_active = 1
WHERE u.role = 'landlord'
GROUP BY u.id, u.name;
GO

-- View: Hóa đơn chi tiết với thông tin đầy đủ
GO
PRINT 'Creating view: v_bill_details';
GO
CREATE VIEW v_bill_details AS
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
GO

-- View: Hợp đồng đang hoạt động
GO
PRINT 'Creating view: v_active_contracts';
GO
CREATE VIEW v_active_contracts AS
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
    DATEDIFF(day, GETDATE(), rc.end_date) AS days_until_expiry
FROM rental_contracts rc
JOIN rooms r ON rc.room_id = r.id
JOIN users t ON rc.tenant_id = t.id
JOIN users l ON rc.landlord_id = l.id
WHERE rc.contract_status = 'active';
GO

-- =============================================
-- STORED PROCEDURES - Các thủ tục lưu trữ
-- =============================================

-- Procedure: Tạo hóa đơn tự động cho tháng
GO
PRINT 'Creating stored procedure: sp_generate_monthly_bills';
GO
CREATE PROCEDURE sp_generate_monthly_bills
    @p_month INT,
    @p_year INT
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO bills (
        contract_id, room_id, tenant_id, landlord_id,
        month, year, room_rent, service_fees, total_amount,
        due_date, status
    )
    SELECT 
        rc.id,
        rc.room_id,
        rc.tenant_id,
        rc.landlord_id,
        @p_month,
        @p_year,
        rc.monthly_rent,
        rc.service_fees,
        rc.monthly_rent + rc.service_fees,
        DATEADD(day, 5, EOMONTH(DATEFROMPARTS(@p_year, @p_month, 1))),
        'pending'
    FROM rental_contracts rc
    WHERE rc.contract_status = 'active'
    AND NOT EXISTS (
        SELECT 1 FROM bills 
        WHERE bills.contract_id = rc.id 
        AND bills.month = @p_month 
        AND bills.year = @p_year
    );
END;
GO

-- Procedure: Cập nhật điện nước cho hóa đơn
GO
PRINT 'Creating stored procedure: sp_update_bill_utilities';
GO
CREATE PROCEDURE sp_update_bill_utilities
    @p_bill_id UNIQUEIDENTIFIER,
    @p_electricity_usage DECIMAL(10,2),
    @p_water_usage DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @v_electricity_rate DECIMAL(10,2);
    DECLARE @v_water_rate DECIMAL(10,2);
    DECLARE @v_room_rent DECIMAL(12,2);
    DECLARE @v_service_fees DECIMAL(12,2);
    DECLARE @v_other_fees DECIMAL(12,2);
    DECLARE @v_electricity_cost DECIMAL(12,2);
    DECLARE @v_water_cost DECIMAL(12,2);
    DECLARE @v_total DECIMAL(12,2);
    
    -- Get contract rates and current bill values
    SELECT 
        @v_electricity_rate = rc.electricity_rate,
        @v_water_rate = rc.water_rate,
        @v_room_rent = b.room_rent,
        @v_service_fees = b.service_fees,
        @v_other_fees = ISNULL(b.other_fees, 0)
    FROM bills b
    JOIN rental_contracts rc ON b.contract_id = rc.id
    WHERE b.id = @p_bill_id;
    
    -- Calculate costs
    SET @v_electricity_cost = @p_electricity_usage * @v_electricity_rate;
    SET @v_water_cost = @p_water_usage * @v_water_rate;
    SET @v_total = @v_room_rent + @v_electricity_cost + @v_water_cost + @v_service_fees + @v_other_fees;
    
    -- Update bill
    UPDATE bills
    SET electricity_usage = @p_electricity_usage,
        electricity_cost = @v_electricity_cost,
        water_usage = @p_water_usage,
        water_cost = @v_water_cost,
        total_amount = @v_total,
        updated_at = GETDATE()
    WHERE id = @p_bill_id;
END;
GO

-- Procedure: Đánh dấu hóa đơn đã thanh toán
GO
PRINT 'Creating stored procedure: sp_mark_bill_paid';
GO
CREATE PROCEDURE sp_mark_bill_paid
    @p_bill_id UNIQUEIDENTIFIER,
    @p_payment_method NVARCHAR(50),
    @p_transaction_id NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @v_total_amount DECIMAL(12,2);
    
    -- Get bill amount
    SELECT @v_total_amount = total_amount
    FROM bills
    WHERE id = @p_bill_id;
    
    -- Update bill
    UPDATE bills
    SET status = 'paid',
        paid_date = GETDATE(),
        payment_method = @p_payment_method,
        transaction_id = @p_transaction_id,
        updated_at = GETDATE()
    WHERE id = @p_bill_id;
    
    -- Insert payment record
    INSERT INTO rental_payments (bill_id, amount, payment_date, payment_method, transaction_id)
    VALUES (@p_bill_id, @v_total_amount, GETDATE(), @p_payment_method, @p_transaction_id);
END;
GO

-- =============================================
-- TRIGGERS - Các trigger tự động
-- =============================================

-- Trigger: Cập nhật rating service khi có review mới
GO
PRINT 'Creating trigger: trg_update_service_rating_after_insert';
GO
CREATE TRIGGER trg_update_service_rating_after_insert
ON service_reviews
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE s
    SET s.rating = (
            SELECT AVG(CAST(rating AS FLOAT))
            FROM service_reviews
            WHERE service_id = i.service_id
        ),
        s.review_count = (
            SELECT COUNT(*)
            FROM service_reviews
            WHERE service_id = i.service_id
        ),
        s.updated_at = GETDATE()
    FROM services s
    INNER JOIN inserted i ON s.id = i.service_id;
END;
GO

-- Trigger: Tự động đánh dấu hóa đơn quá hạn
GO
PRINT 'Creating trigger: trg_check_bill_overdue_before_update';
GO
CREATE TRIGGER trg_check_bill_overdue_before_update
ON bills
INSTEAD OF UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE b
    SET b.status = CASE 
            WHEN i.status = 'pending' AND i.due_date < CAST(GETDATE() AS DATE) THEN 'overdue'
            ELSE i.status
        END,
        b.room_rent = i.room_rent,
        b.electricity_usage = i.electricity_usage,
        b.electricity_cost = i.electricity_cost,
        b.water_usage = i.water_usage,
        b.water_cost = i.water_cost,
        b.service_fees = i.service_fees,
        b.other_fees = i.other_fees,
        b.total_amount = i.total_amount,
        b.paid_date = i.paid_date,
        b.payment_method = i.payment_method,
        b.transaction_id = i.transaction_id,
        b.notes = i.notes,
        b.updated_at = GETDATE()
    FROM bills b
    INNER JOIN inserted i ON b.id = i.id;
END;
GO

-- Trigger: Cập nhật trạng thái phòng khi có hợp đồng mới
GO
PRINT 'Creating trigger: trg_update_room_availability_after_contract';
GO
CREATE TRIGGER trg_update_room_availability_after_contract
ON rental_contracts
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE r
    SET r.is_available = 0,
        r.updated_at = GETDATE()
    FROM rooms r
    INNER JOIN inserted i ON r.id = i.room_id
    WHERE i.contract_status = 'active';
END;
GO

-- Trigger: Cập nhật trạng thái phòng khi hợp đồng kết thúc
GO
PRINT 'Creating trigger: trg_update_room_availability_after_contract_end';
GO
CREATE TRIGGER trg_update_room_availability_after_contract_end
ON rental_contracts
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE r
    SET r.is_available = 1,
        r.updated_at = GETDATE()
    FROM rooms r
    INNER JOIN inserted i ON r.id = i.room_id
    INNER JOIN deleted d ON i.id = d.id
    WHERE d.contract_status = 'active' 
    AND i.contract_status IN ('expired', 'terminated');
END;
GO

-- Trigger: Tự động cập nhật updated_at cho users
GO
PRINT 'Creating trigger: trg_users_updated_at';
GO
CREATE TRIGGER trg_users_updated_at
ON users
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE u
    SET u.updated_at = GETDATE()
    FROM users u
    INNER JOIN inserted i ON u.id = i.id;
END;
GO

-- Trigger: Tự động cập nhật updated_at cho rooms
GO
PRINT 'Creating trigger: trg_rooms_updated_at';
GO
CREATE TRIGGER trg_rooms_updated_at
ON rooms
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE r
    SET r.updated_at = GETDATE()
    FROM rooms r
    INNER JOIN inserted i ON r.id = i.id;
END;
GO

-- =============================================
-- END OF SQL SERVER DATABASE SCRIPT
-- =============================================

-- Notes:
-- 1. SQL Server 2016 trở lên để hỗ trợ JSON functions
-- 2. Thay đổi password_hash bằng mật khẩu đã được hash trong production
-- 3. Sử dụng NVARCHAR để hỗ trợ tiếng Việt và Unicode
-- 4. Định kỳ chạy EXEC sp_generate_monthly_bills @month, @year để tạo hóa đơn
-- 5. Backup database định kỳ
-- 6. Cân nhắc enable Full-Text Search cho tìm kiếm nhanh hơn
