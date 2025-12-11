// PostApproval.ts - Type definitions for post approval system

export interface PostApproval {
  id: string;
  roomId: string;
  landlordId: string;
  requestedDate: Date;
  status: "pending" | "approved" | "rejected";
  reviewedBy?: string; // Admin user ID
  reviewedDate?: Date;
  rejectionReason?: string;
  notes?: string;
}

export interface PostApprovalRequest {
  roomId: string;
  notes?: string;
}

export interface PostApprovalReview {
  approvalId: string;
  status: "approved" | "rejected";
  rejectionReason?: string;
  notes?: string;
}

export interface PostQuota {
  userId: string;
  maxPostsPerMonth: number;
  currentMonthPosts: number;
  lastResetDate: Date;
  availablePosts: number;
}
