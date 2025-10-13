import type { Room, User } from "../types";

// Custom Service Interface for pricing packages
export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  popular: boolean;
}

// Custom Bill Interface for landlord dashboard
export interface LandlordBill {
  id: string;
  roomId: string;
  roomTitle: string;
  tenantName: string;
  tenantPhone: string;
  month: string;
  rentAmount: number;
  electricityUsage: number;
  electricityRate: number;
  waterUsage: number;
  waterRate: number;
  otherFees: number;
  totalAmount: number;
  status: "paid" | "pending" | "overdue";
  paidDate?: Date;
  dueDate: Date;
  contractStart: Date;
  contractEnd: Date;
}

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Nguyễn Văn Thành",
    email: "landlord@example.com",
    phone: "0123456789",
    role: "landlord",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-10-11"),
  },
  {
    id: "2",
    name: "Trần Thị Hương",
    email: "seeker@example.com",
    phone: "0987654321",
    role: "seeker",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-10-11"),
  },
  {
    id: "3",
    name: "Lê Minh Quân",
    email: "quan.le@gmail.com",
    phone: "0909123456",
    role: "landlord",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-10-11"),
  },
  {
    id: "4",
    name: "Phạm Thu Hà",
    email: "ha.pham@gmail.com",
    phone: "0912345678",
    role: "seeker",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-10-11"),
  },
];

// Mock Rooms Data
export const mockRooms: Room[] = [
  {
    id: "1",
    title: "Phòng trọ cao cấp gần ĐH Bách Khoa",
    description:
      "Phòng trọ đầy đủ tiện nghi, gần trường đại học, an ninh tốt, môi trường sạch sẽ. Có ban công, cửa sổ thoáng mát.",
    address: "123 Đường Lý Thường Kiệt, Quận 10, TP.HCM",
    district: "Quận 10",
    city: "TP.HCM",
    price: 4500000,
    area: 25,
    roomType: "single",
    amenities: ["WiFi", "Điều hòa", "Tủ lạnh", "Máy giặt", "Bãi xe", "An ninh 24/7"],
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    ],
    isAvailable: true,
    landlordId: "1",
    maxOccupants: 1,
    electricityPrice: 3500,
    waterPrice: 25000,
    internetIncluded: true,
    parkingIncluded: true,
    airConditioned: true,
    furnished: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-10-11"),
  },
  {
    id: "2",
    title: "Căn hộ mini 1 phòng ngủ Quận 1",
    description:
      "Căn hộ mini hiện đại, đầy đủ nội thất, view đẹp, gần trung tâm thành phố. Thích hợp cho sinh viên và nhân viên văn phòng.",
    address: "456 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    district: "Quận 1",
    city: "TP.HCM",
    price: 8500000,
    area: 35,
    roomType: "apartment",
    amenities: ["WiFi", "Điều hòa", "Tủ lạnh", "Bếp riêng", "Balcony", "Thang máy", "Bảo vệ"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    ],
    isAvailable: true,
    landlordId: "1",
    maxOccupants: 2,
    electricityPrice: 3500,
    waterPrice: 25000,
    internetIncluded: true,
    parkingIncluded: true,
    airConditioned: true,
    furnished: true,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-10-11"),
  },
  {
    id: "3",
    title: "Phòng trọ giá rẻ gần chợ Bình Tây",
    description:
      "Phòng trọ sạch sẽ, giá cả phải chăng, gần chợ và các tiện ích sinh hoạt. Phù hợp cho sinh viên có thu nhập thấp.",
    address: "789 Đường Hậu Giang, Quận 6, TP.HCM",
    district: "Quận 6",
    city: "TP.HCM",
    price: 2800000,
    area: 20,
    roomType: "single",
    amenities: ["WiFi", "Quạt trần", "Nhà vệ sinh riêng", "Bãi xe"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571508601382-5dc1b3f45764?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff2c?w=800&h=600&fit=crop",
    ],
    isAvailable: true,
    landlordId: "3",
    maxOccupants: 1,
    electricityPrice: 3500,
    waterPrice: 25000,
    internetIncluded: true,
    parkingIncluded: true,
    airConditioned: false,
    furnished: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-10-11"),
  },
  {
    id: "4",
    title: "Homestay cao cấp Quận 3",
    description:
      "Homestay sang trọng với thiết kế hiện đại, đầy đủ tiện nghi 5 sao. View thành phố tuyệt đẹp, phù hợp cho gia đình nhỏ.",
    address: "321 Đường Võ Văn Tần, Quận 3, TP.HCM",
    district: "Quận 3",
    city: "TP.HCM",
    price: 12000000,
    area: 50,
    roomType: "apartment",
    amenities: [
      "WiFi",
      "Điều hòa",
      "Tủ lạnh",
      "Máy giặt",
      "Bếp đầy đủ",
      "Ban công",
      "Thang máy",
      "Gym",
      "Hồ bơi",
    ],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7eded47d24e5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop",
    ],
    isAvailable: false,
    landlordId: "3",
    maxOccupants: 4,
    electricityPrice: 3500,
    waterPrice: 25000,
    internetIncluded: true,
    parkingIncluded: true,
    airConditioned: true,
    furnished: true,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-10-11"),
  },
  {
    id: "5",
    title: "Phòng trọ sinh viên gần ĐH Kinh tế",
    description:
      "Phòng trọ dành riêng cho sinh viên, có không gian học tập, WiFi tốc độ cao, môi trường an toàn và thân thiện.",
    address: "159 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
    district: "Quận Bình Thạnh",
    city: "TP.HCM",
    price: 3200000,
    area: 18,
    roomType: "single",
    amenities: ["WiFi", "Điều hòa", "Bàn học", "Tủ quần áo", "Bãi xe đạp"],
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&h=600&fit=crop",
    ],
    isAvailable: true,
    landlordId: "1",
    maxOccupants: 1,
    electricityPrice: 3500,
    waterPrice: 25000,
    internetIncluded: true,
    parkingIncluded: true,
    airConditioned: true,
    furnished: true,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-10-11"),
  },
  {
    id: "6",
    title: "Chung cư mini Quận 7 - Full nội thất",
    description:
      "Chung cư mini mới xây, full nội thất cao cấp, có hồ bơi và gym. Khu vực an ninh 24/7, gần siêu thị và trường học.",
    address: "753 Đường Nguyễn Thị Thập, Quận 7, TP.HCM",
    district: "Quận 7",
    city: "TP.HCM",
    price: 9800000,
    area: 42,
    roomType: "apartment",
    amenities: [
      "WiFi",
      "Điều hòa",
      "Tủ lạnh",
      "Máy giặt",
      "Bếp từ",
      "Ban công",
      "Thang máy",
      "Hồ bơi",
      "Gym",
      "Siêu thị",
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    ],
    isAvailable: true,
    landlordId: "3",
    maxOccupants: 3,
    electricityPrice: 3500,
    waterPrice: 25000,
    internetIncluded: true,
    parkingIncluded: true,
    airConditioned: true,
    furnished: true,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-10-11"),
  },
  {
    id: "7",
    title: "Phòng ở ghép cho nữ Quận Tân Bình",
    description:
      "Phòng ở ghép dành riêng cho nữ, sạch sẽ và an toàn. Có không gian riêng tư và khu vực chung tiện lợi.",
    address: "486 Đường Cộng Hòa, Quận Tân Bình, TP.HCM",
    district: "Quận Tân Bình",
    city: "TP.HCM",
    price: 2500000,
    area: 15,
    roomType: "shared",
    amenities: ["WiFi", "Quạt trần", "Tủ cá nhân", "Nhà vệ sinh chung", "Bếp chung"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571508601382-5dc1b3f45764?w=800&h=600&fit=crop",
    ],
    isAvailable: true,
    landlordId: "1",
    maxOccupants: 2,
    electricityPrice: 3500,
    waterPrice: 25000,
    internetIncluded: true,
    parkingIncluded: false,
    airConditioned: false,
    furnished: true,
    createdAt: new Date("2024-01-30"),
    updatedAt: new Date("2024-10-11"),
  },
  {
    id: "8",
    title: "Studio apartment Thủ Đức - Gần ĐHQG",
    description:
      "Studio apartment hiện đại gần Đại học Quốc gia TP.HCM, thiết kế thông minh, đầy đủ tiện nghi cho cuộc sống độc lập.",
    address: "268 Đường Võ Văn Ngân, TP. Thủ Đức, TP.HCM",
    district: "Thủ Đức",
    city: "TP.HCM",
    price: 6500000,
    area: 30,
    roomType: "studio",
    amenities: ["WiFi", "Điều hòa", "Tủ lạnh mini", "Bếp từ", "Ban công nhỏ", "Bảo vệ"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
    ],
    isAvailable: true,
    landlordId: "3",
    maxOccupants: 2,
    electricityPrice: 3500,
    waterPrice: 25000,
    internetIncluded: true,
    parkingIncluded: true,
    airConditioned: true,
    furnished: true,
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-10-11"),
  },
];

// Mock Service Packages for pricing
export const mockServices: ServicePackage[] = [
  {
    id: "1",
    name: "Gói Cơ Bản",
    description: "Phù hợp cho chủ trọ có ít phòng",
    price: 299000,
    duration: 30,
    features: ["Đăng tối đa 5 phòng", "Hỗ trợ qua email", "Báo cáo cơ bản", "Quản lý khách thuê"],
    popular: false,
  },
  {
    id: "2",
    name: "Gói Tiêu Chuẩn",
    description: "Lựa chọn phổ biến nhất",
    price: 599000,
    duration: 30,
    features: [
      "Đăng tối đa 20 phòng",
      "Hỗ trợ qua điện thoại",
      "Báo cáo chi tiết",
      "Quản lý hợp đồng",
      "Tính năng thông báo",
      "Quản lý hóa đơn",
    ],
    popular: true,
  },
  {
    id: "3",
    name: "Gói Cao Cấp",
    description: "Dành cho chủ trọ chuyên nghiệp",
    price: 999000,
    duration: 30,
    features: [
      "Đăng không giới hạn",
      "Hỗ trợ 24/7",
      "Báo cáo nâng cao",
      "API tích hợp",
      "Quản lý đa chi nhánh",
      "Tư vấn chuyên nghiệp",
      "Tính năng AI",
    ],
    popular: false,
  },
  {
    id: "4",
    name: "Gói Doanh Nghiệp",
    description: "Giải pháp cho công ty bất động sản",
    price: 2499000,
    duration: 30,
    features: [
      "Tất cả tính năng cao cấp",
      "Quản lý nhóm",
      "White-label solution",
      "Tích hợp hệ thống",
      "Đào tạo chuyên nghiệp",
      "Account manager riêng",
    ],
    popular: false,
  },
];

// Mock Bills/Tenants Data for Landlord Dashboard
export const mockBills: LandlordBill[] = [
  {
    id: "1",
    roomId: "1",
    roomTitle: "Phòng trọ cao cấp gần ĐH Bách Khoa",
    tenantName: "Trần Thị Hương",
    tenantPhone: "0987654321",
    month: "10/2024",
    rentAmount: 4500000,
    electricityUsage: 150,
    electricityRate: 3500,
    waterUsage: 12,
    waterRate: 25000,
    otherFees: 200000,
    totalAmount: 5025000,
    status: "paid",
    paidDate: new Date("2024-10-05"),
    dueDate: new Date("2024-10-31"),
    contractStart: new Date("2024-01-01"),
    contractEnd: new Date("2024-12-31"),
  },
  {
    id: "2",
    roomId: "2",
    roomTitle: "Căn hộ mini 1 phòng ngủ Quận 1",
    tenantName: "Phạm Thu Hà",
    tenantPhone: "0912345678",
    month: "10/2024",
    rentAmount: 8500000,
    electricityUsage: 200,
    electricityRate: 3500,
    waterUsage: 15,
    waterRate: 25000,
    otherFees: 300000,
    totalAmount: 9475000,
    status: "pending",
    paidDate: undefined,
    dueDate: new Date("2024-10-31"),
    contractStart: new Date("2024-02-15"),
    contractEnd: new Date("2025-02-14"),
  },
  {
    id: "3",
    roomId: "5",
    roomTitle: "Phòng trọ sinh viên gần ĐH Kinh tế",
    tenantName: "Nguyễn Minh Tú",
    tenantPhone: "0908765432",
    month: "09/2024",
    rentAmount: 3200000,
    electricityUsage: 100,
    electricityRate: 3500,
    waterUsage: 8,
    waterRate: 25000,
    otherFees: 150000,
    totalAmount: 3700000,
    status: "overdue",
    paidDate: undefined,
    dueDate: new Date("2024-09-30"),
    contractStart: new Date("2024-08-01"),
    contractEnd: new Date("2025-07-31"),
  },
  {
    id: "4",
    roomId: "7",
    roomTitle: "Phòng ở ghép cho nữ Quận Tân Bình",
    tenantName: "Lê Thị Lan",
    tenantPhone: "0919876543",
    month: "10/2024",
    rentAmount: 2500000,
    electricityUsage: 80,
    electricityRate: 3500,
    waterUsage: 6,
    waterRate: 25000,
    otherFees: 100000,
    totalAmount: 2880000,
    status: "paid",
    paidDate: new Date("2024-10-02"),
    dueDate: new Date("2024-10-31"),
    contractStart: new Date("2024-06-01"),
    contractEnd: new Date("2025-05-31"),
  },
];

// Dashboard Statistics
export const mockDashboardStats = {
  totalRooms: 8,
  occupiedRooms: 4,
  availableRooms: 4,
  totalRevenue: 21580000,
  monthlyRevenue: 18500000,
  pendingPayments: 2,
  overduePayments: 1,
  newInquiries: 12,
  viewsThisMonth: 1247,
  averageRating: 4.6,
};

// Featured rooms for homepage
export const featuredRooms = mockRooms.slice(0, 6);

// Districts for search filter
export const districts = [
  "Quận 1",
  "Quận 2",
  "Quận 3",
  "Quận 4",
  "Quận 5",
  "Quận 6",
  "Quận 7",
  "Quận 8",
  "Quận 9",
  "Quận 10",
  "Quận 11",
  "Quận 12",
  "Quận Bình Thạnh",
  "Quận Tân Bình",
  "Quận Tân Phú",
  "Quận Phú Nhuận",
  "Quận Gò Vấp",
  "Thủ Đức",
  "Bình Chánh",
  "Hóc Môn",
  "Củ Chi",
  "Nhà Bè",
  "Cần Giờ",
];

// Room types for display
export const roomTypeLabels = {
  single: "Phòng đơn",
  shared: "Phòng ở ghép",
  apartment: "Căn hộ mini",
  studio: "Studio",
};

// Price ranges
export const priceRanges = [
  { label: "Dưới 3 triệu", min: 0, max: 3000000 },
  { label: "3 - 5 triệu", min: 3000000, max: 5000000 },
  { label: "5 - 8 triệu", min: 5000000, max: 8000000 },
  { label: "8 - 12 triệu", min: 8000000, max: 12000000 },
  { label: "Trên 12 triệu", min: 12000000, max: 999999999 },
];

// Common amenities
export const commonAmenities = [
  "WiFi",
  "Điều hòa",
  "Tủ lạnh",
  "Máy giặt",
  "Bếp riêng",
  "Ban công",
  "Thang máy",
  "Bãi xe",
  "An ninh 24/7",
  "Gym",
  "Hồ bơi",
  "Siêu thị",
];

// Utility functions
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const getRoomTypeLabel = (roomType: string): string => {
  return roomTypeLabels[roomType as keyof typeof roomTypeLabels] || roomType;
};

// Room Services Interface
export interface RoomService {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  icon: string;
  estimatedTime: string;
  features: string[];
  popular?: boolean;
}

// Mock Room Services Data
export const mockRoomServices: RoomService[] = [
  {
    id: "cleaning-1",
    name: "Dọn dẹp phòng trọ",
    description:
      "Dịch vụ dọn dẹp phòng trọ chuyên nghiệp, bao gồm vệ sinh tổng thể và lau chùi nội thất",
    price: 150000,
    unit: "lần",
    category: "Vệ sinh",
    icon: "🧹",
    estimatedTime: "2-3 giờ",
    features: [
      "Vệ sinh tổng thể phòng",
      "Lau chùi nội thất",
      "Dọn dẹp nhà vệ sinh",
      "Thay đổi ga gối nệm",
      "Vệ sinh cửa sổ",
    ],
    popular: true,
  },
  {
    id: "moving-1",
    name: "Chuyển trọ trọn gói",
    description:
      "Dịch vụ chuyển trọ toàn diện từ A-Z, bao gồm đóng gói, vận chuyển và sắp xếp đồ đạc",
    price: 500000,
    unit: "lần",
    category: "Chuyển nhà",
    icon: "📦",
    estimatedTime: "4-6 giờ",
    features: [
      "Đóng gói đồ đạc chuyên nghiệp",
      "Vận chuyển an toàn",
      "Bốc xếp cẩn thận",
      "Sắp xếp lại phòng mới",
      "Bảo hiểm hàng hóa",
    ],
  },
  {
    id: "repair-1",
    name: "Sửa chữa điện nước",
    description: "Dịch vụ sửa chữa hệ thống điện, nước và các thiết bị trong phòng trọ",
    price: 200000,
    unit: "lần",
    category: "Sửa chữa",
    icon: "🔧",
    estimatedTime: "1-2 giờ",
    features: [
      "Sửa chữa điện",
      "Thông tắc cống",
      "Sửa vòi nước",
      "Thay bóng đèn",
      "Kiểm tra an toàn",
    ],
  },
  {
    id: "laundry-1",
    name: "Giặt ủi quần áo",
    description: "Dịch vụ giặt ủi quần áo chuyên nghiệp, lấy tại phòng và giao lại",
    price: 25000,
    unit: "kg",
    category: "Giặt ủi",
    icon: "👕",
    estimatedTime: "24-48 giờ",
    features: [
      "Giặt khô/ướt",
      "Ủi phẳng phiu",
      "Lấy và giao tận nơi",
      "Đóng gói cẩn thận",
      "Hương thơm tự nhiên",
    ],
  },
  {
    id: "security-1",
    name: "Bảo vệ phòng trọ",
    description: "Dịch vụ bảo vệ và canh gác phòng trọ khi vắng nhà dài ngày",
    price: 100000,
    unit: "ngày",
    category: "Bảo vệ",
    icon: "🛡️",
    estimatedTime: "24 giờ",
    features: [
      "Canh gác 24/7",
      "Kiểm tra định kỳ",
      "Báo cáo tình hình",
      "Liên lạc khẩn cấp",
      "Camera giám sát",
    ],
  },
  {
    id: "grocery-1",
    name: "Mua sắm tạp hóa",
    description: "Dịch vụ mua sắm thực phẩm và đồ dùng thiết yếu giao tận phòng",
    price: 30000,
    unit: "đơn hàng",
    category: "Tiện ích",
    icon: "🛒",
    estimatedTime: "1-2 giờ",
    features: [
      "Mua sắm theo yêu cầu",
      "Giao hàng tận phòng",
      "Thanh toán linh hoạt",
      "Tư vấn sản phẩm",
      "Đảm bảo chất lượng",
    ],
  },
  {
    id: "internet-1",
    name: "Lắp đặt Internet",
    description: "Dịch vụ lắp đặt và bảo trì hệ thống Internet tốc độ cao cho phòng trọ",
    price: 300000,
    unit: "lần",
    category: "Công nghệ",
    icon: "📶",
    estimatedTime: "2-3 giờ",
    features: [
      "Lắp đặt WiFi tốc độ cao",
      "Cấu hình router",
      "Test tốc độ mạng",
      "Hướng dẫn sử dụng",
      "Bảo trì định kỳ",
    ],
    popular: true,
  },
  {
    id: "pest-1",
    name: "Diệt côn trùng",
    description: "Dịch vụ diệt côn trùng, khử trùng phòng trọ an toàn và hiệu quả",
    price: 120000,
    unit: "lần",
    category: "Vệ sinh",
    icon: "🐛",
    estimatedTime: "1-2 giờ",
    features: [
      "Diệt muỗi, kiến, gián",
      "Khử trùng toàn diện",
      "Sử dụng hóa chất an toàn",
      "Tư vấn phòng chống",
      "Bảo hành 3 tháng",
    ],
  },
];
