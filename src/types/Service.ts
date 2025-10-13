export interface Service {
  id: string;
  name: string;
  description: string;
  category: "cleaning" | "maintenance" | "security" | "utilities" | "other";
  provider: string;
  contactPhone: string;
  contactEmail?: string;
  priceRange: {
    min: number;
    max: number;
    unit: "per_hour" | "per_room" | "per_service" | "monthly";
  };
  coverage: string[]; // Districts/Cities covered
  rating?: number;
  reviewCount?: number;
  isActive: boolean;
  availableHours?: {
    start: string; // "08:00"
    end: string; // "18:00"
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceRequest {
  id: string;
  serviceId: string;
  requesterId: string;
  roomAddress: string;
  requestedDate: Date;
  preferredTime?: string;
  notes?: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  estimatedPrice?: number;
  actualPrice?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceReview {
  id: string;
  serviceId: string;
  reviewerId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
}
