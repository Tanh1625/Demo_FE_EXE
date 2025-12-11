// Hostel.ts - Type definitions for hostel/dormitory management

export interface Hostel {
  id: string;
  name: string;
  description: string;
  address: string;
  district: string;
  city: string;
  landlordId: string;
  totalRooms: number;
  availableRooms: number;
  amenities: string[];
  images: string[];
  hasParking: boolean;
  hasSecurity: boolean;
  hasElevator: boolean;
  rules: string[];
  contactPhone: string;
  contactEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HostelInput {
  name: string;
  description: string;
  address: string;
  district: string;
  city: string;
  amenities: string[];
  hasParking: boolean;
  hasSecurity: boolean;
  hasElevator: boolean;
  rules: string[];
  contactPhone: string;
  contactEmail?: string;
}
