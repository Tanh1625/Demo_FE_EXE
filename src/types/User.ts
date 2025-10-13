export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "seeker" | "landlord" | "guest";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
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
