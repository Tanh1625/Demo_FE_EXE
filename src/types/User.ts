export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "seeker" | "tenant" | "landlord" | "admin" | "guest";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  // Additional fields for linked room
  linkedRoomId?: string; // For tenant role - room they are renting
  isEmailVerified?: boolean;
  allowedPostsPerMonth?: number; // For landlord - managed by admin
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "seeker" | "landlord";
}

export interface UserProfile extends User {
  idCard?: string;
  address?: string;
  dateOfBirth?: Date;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface FeedbackData {
  roomId?: string;
  rating: number;
  comment: string;
  category: "room" | "landlord" | "service" | "platform";
}
