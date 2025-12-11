export interface RoomImage {
  id: string;
  url: string;
  type: "title" | "description" | "other"; // Phân loại ảnh
  caption?: string;
  order: number;
}

export interface Room {
  id: string;
  title: string;
  description: string;
  address: string;
  district: string;
  city: string;
  price: number;
  area: number; // m²
  roomType: "single" | "shared" | "apartment" | "studio";
  amenities: string[];
  images: string[]; // Deprecated - use roomImages instead
  roomImages?: RoomImage[]; // New structured images
  isAvailable: boolean;
  landlordId: string;
  hostelId?: string; // ID của dãy trọ
  hostelName?: string; // Tên dãy trọ
  maxOccupants: number;
  electricityPrice?: number;
  waterPrice?: number;
  internetIncluded: boolean;
  parkingIncluded: boolean;
  airConditioned: boolean;
  furnished: boolean;
  approvalStatus: "pending" | "approved" | "rejected"; // Trạng thái duyệt bài
  approvedBy?: string; // Admin ID
  approvedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomFilter {
  city?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  roomType?: string;
  minArea?: number;
  maxArea?: number;
  amenities?: string[];
  furnished?: boolean;
  airConditioned?: boolean;
  parkingIncluded?: boolean;
}

export interface RoomSearchParams {
  keyword?: string;
  filters?: RoomFilter;
  page?: number;
  limit?: number;
  sortBy?: "price" | "area" | "createdAt";
  sortOrder?: "asc" | "desc";
}
