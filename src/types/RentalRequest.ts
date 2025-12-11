// Rental Request Types
export interface RentalRequest {
  id: string;
  roomId: string;
  roomTitle: string;
  roomAddress: string;
  roomPrice: number;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  landlordId: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
  moveInDate?: string;
  requestDate: Date;
  responseDate?: Date;
  rejectionReason?: string;
}

export interface RentalRequestInput {
  roomId: string;
  message?: string;
  moveInDate?: string;
}
