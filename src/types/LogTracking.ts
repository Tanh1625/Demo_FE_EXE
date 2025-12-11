// LogTracking.ts - Type definitions for user activity tracking

export interface ActivityLog {
  id: string;
  userId: string;
  activityType:
    | "login"
    | "logout"
    | "register"
    | "service_request"
    | "payment"
    | "room_view"
    | "room_favorite"
    | "post_created"
    | "post_approved"
    | "post_rejected"
    | "contract_created"
    | "contract_terminated"
    | "profile_updated"
    | "password_changed";
  description: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface ServiceRequestLog {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  requestDate: Date;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  amount?: number;
  notes?: string;
}

export interface PaymentHistory {
  id: string;
  userId: string;
  billId: string;
  amount: number;
  paymentMethod: "cash" | "bank_transfer" | "e_wallet" | "other";
  paymentDate: Date;
  transactionId?: string;
  status: "pending" | "completed" | "failed";
  notes?: string;
}

export interface RoomViewHistory {
  id: string;
  userId: string;
  roomId: string;
  roomTitle: string;
  viewDate: Date;
  durationSeconds?: number;
}

export interface FavoriteRoom {
  id: string;
  userId: string;
  roomId: string;
  addedDate: Date;
  notes?: string;
}
