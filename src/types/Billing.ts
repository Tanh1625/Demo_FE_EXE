export interface Bill {
  id: string;
  roomId: string;
  tenantId: string;
  month: number;
  year: number;
  electricityUsage: number; // kWh
  waterUsage: number; // m³
  electricityCost: number;
  waterCost: number;
  roomRent: number;
  serviceFees: number;
  otherFees?: number;
  totalAmount: number;
  dueDate: Date;
  paidDate?: Date;
  status: "pending" | "paid" | "overdue";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomBillInput {
  roomId: string;
  roomName: string;
  tenantId?: string;
  tenantName?: string;
  electricityPrevious: number;
  electricityCurrent: number;
  electricityUsage: number;
  waterPrevious: number;
  waterCurrent: number;
  waterUsage: number;
}

export interface BillInput {
  roomId: string;
  tenantId: string;
  electricityUsage: number;
  waterUsage: number;
  serviceFees?: number;
  otherFees?: number;
  notes?: string;
}

export interface BatchBillInput {
  month: number;
  year: number;
  electricityRate: number; // Giá điện mỗi kWh
  waterRate: number; // Giá nước mỗi m³
  rooms: RoomBillInput[]; // Danh sách phòng để nhập chỉ số
  dueDate: Date;
  notes?: string;
}

export interface DashboardStats {
  totalRooms: number;
  availableRooms: number;
  occupiedRooms: number;
  monthlyRevenue: number;
  pendingBills: number;
  expiringContracts: number;
}
