// Rental.ts - Type definitions for rental information

export interface RentalContract {
  id: string;
  roomId: string;
  roomTitle: string;
  roomAddress: string;
  roomImages: string[];
  landlordName: string;
  landlordPhone: string;
  landlordEmail: string;
  monthlyRent: number;
  deposit: number;
  startDate: string;
  endDate: string;
  contractStatus: "active" | "expired" | "terminated";
  electricityRate: number;
  waterRate: number;
  additionalServices: {
    name: string;
    price: number;
  }[];
}

export interface RentalUtilityReading {
  id: string;
  month: string;
  electricityPrevious: number;
  electricityCurrent: number;
  electricityUsage: number;
  waterPrevious: number;
  waterCurrent: number;
  waterUsage: number;
  totalAmount: number;
  isPaid: boolean;
  paidDate?: string;
}

export interface RentalPayment {
  id: string;
  month: string;
  rentAmount: number;
  electricityAmount: number;
  waterAmount: number;
  serviceAmount: number;
  totalAmount: number;
  isPaid: boolean;
  paidDate?: string;
  dueDate: string;
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  category: "plumbing" | "electrical" | "furniture" | "other";
  status: "pending" | "in-progress" | "completed" | "rejected";
  createdDate: string;
  completedDate?: string;
  images?: string[];
  response?: string;
}
