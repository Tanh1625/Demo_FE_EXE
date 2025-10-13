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
  images: string[];
  isAvailable: boolean;
  landlordId: string;
  maxOccupants: number;
  electricityPrice?: number;
  waterPrice?: number;
  internetIncluded: boolean;
  parkingIncluded: boolean;
  airConditioned: boolean;
  furnished: boolean;
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
