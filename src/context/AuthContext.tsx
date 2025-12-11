import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { LoginCredentials, User } from "../types/User";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLandlord: boolean;
  isSeeker: boolean;
  isTenant: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate checking for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing saved user:", error);
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call - Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user accounts for testing
      // TÀI KHOẢN TEST:
      // 1. admin@demo.com     - Quản trị viên (Admin Dashboard)
      // 2. landlord@demo.com  - Chủ trọ (Landlord Dashboard)
      // 3. tenant@demo.com    - Người thuê (có phòng liên kết)
      // 4. seeker@demo.com    - Người tìm trọ (chưa có phòng)
      // Password: bất kỳ

      let role: "landlord" | "seeker" | "tenant" | "admin" | "guest" = "seeker";
      let name = "Người tìm trọ";
      let id = "USER_SEEKER";

      if (credentials.email === "admin@demo.com") {
        role = "admin";
        name = "Quản trị viên";
        id = "ADMIN_001";
      } else if (credentials.email === "landlord@demo.com") {
        role = "landlord";
        name = "Nguyễn Văn Chủ Trọ";
        id = "LANDLORD_001";
      } else if (credentials.email === "tenant@demo.com") {
        role = "tenant";
        name = "Trần Thị Thuê";
        id = "TENANT_001";
      } else if (credentials.email === "seeker@demo.com") {
        role = "seeker";
        name = "Lê Văn Tìm";
        id = "SEEKER_001";
      }

      const mockUser: User = {
        id,
        name,
        email: credentials.email,
        role,
        phone: "+84 901 234 567",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    isLandlord: user?.role === "landlord",
    isSeeker: user?.role === "seeker",
    isTenant: user?.role === "tenant",
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
