import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";

// Components
import ProtectedRoute from "./components/common/ProtectedRoute";

// Public Pages
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";
import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import RoomDetailsPage from "./pages/public/RoomDetailsPage";
import SearchPage from "./pages/public/SearchPage";
import ServicePage from "./pages/public/ServicePage";

// Landlord Pages
import BillingPage from "./pages/landlord/BillingPage";
import DashboardPage from "./pages/landlord/DashboardPage";
import HostelManagePage from "./pages/landlord/HostelManagePage";
import ManageRoomsPage from "./pages/landlord/ManageRoomsPage";
import ServiceManagePage from "./pages/landlord/ServiceManagePage";
import TenantsPage from "./pages/landlord/TenantsPage";

// Tenant Pages
import MyRentalPage from "./pages/tenant/MyRentalPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import PostApprovalPage from "./pages/admin/PostApprovalPage";
import UserManagementPage from "./pages/admin/UserManagementPage";

// Common Pages
import FavoriteRoomsPage from "./pages/common/FavoriteRoomsPage";
import MyRequestsPage from "./pages/common/MyRequestsPage";
import ProfilePage from "./pages/common/ProfilePage";
import SettingsPage from "./pages/common/SettingsPage";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="services" element={<ServicePage />} />
            <Route path="room/:id" element={<RoomDetailsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* Common Protected Routes */}
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            {/* Seeker Routes */}
            <Route
              path="favorites"
              element={
                <ProtectedRoute requiredRole="seeker">
                  <FavoriteRoomsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="rental-requests"
              element={
                <ProtectedRoute>
                  <MyRequestsPage />
                </ProtectedRoute>
              }
            />

            {/* Tenant Routes */}
            <Route
              path="my-rental"
              element={
                <ProtectedRoute requiredRole="tenant">
                  <MyRentalPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Landlord Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="landlord">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="rooms" element={<ManageRoomsPage />} />
            <Route path="hostels" element={<HostelManagePage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="services" element={<ServiceManagePage />} />
            <Route path="tenants" element={<TenantsPage />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="posts" element={<PostApprovalPage />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
