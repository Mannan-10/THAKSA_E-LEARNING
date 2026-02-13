import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import RouteFallback from "./RouteFallback";

import HomePage from "../pages/HomePage";
import CoursesPage from "../pages/CoursesPage";
import BatchesPage from "../pages/BatchesPage";
import PricingPage from "../pages/PricingPage";
import ContactPage from "../pages/ContactPage";

import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import VerifyOtpPage from "../pages/VerifyOtpPage";
import UpdatePasswordPage from "../pages/UpdatePasswordPage";

import DashboardLayout from "../pages/dashboard/DashboardLayout";
import UserDashboard from "../pages/dashboard/UserDashboard";
import MyCourses from "../pages/dashboard/MyCourses";
import MyBatch from "../pages/dashboard/MyBatch";
import Profile from "../pages/dashboard/Profile";
import Settings from "../pages/dashboard/Settings";

import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminBatches from "../pages/admin/AdminBatches";
import AdminCourses from "../pages/admin/AdminCourses";
import AdminStudents from "../pages/admin/AdminStudents";
import AdminSettings from "../pages/admin/AdminSettings";
import { UserDetailsModal } from "../pages/admin/components/UserDetailsModal";
import { RoleUpdateDialog } from "../pages/admin/components/RoleUpdateDialog";
import { DeleteUserDialog } from "../pages/admin/components/DeleteUserDialog";

import InstructorLayout from "../pages/instructor/InstructorLayout";
import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import ManageBatch from "../pages/instructor/ManageBatch";
import ManageCourses from "../pages/instructor/ManageCourses";
import MyStudents from "../pages/instructor/MyStudents";
import InstructorProfile from "../pages/instructor/InstructorProfile";
import InstructorSettings from "../pages/instructor/InstructorSettings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicOnlyRoute>
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/courses"
        element={
          <PublicOnlyRoute>
            <PublicLayout>
              <CoursesPage />
            </PublicLayout>
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/batches"
        element={
          <PublicOnlyRoute>
            <PublicLayout>
              <BatchesPage />
            </PublicLayout>
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/pricing"
        element={
          <PublicOnlyRoute>
            <PublicLayout>
              <PricingPage />
            </PublicLayout>
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicOnlyRoute>
            <PublicLayout>
              <ContactPage />
            </PublicLayout>
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <SignupPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicOnlyRoute>
            <ForgotPasswordPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/verify-otp"
        element={
          <PublicOnlyRoute>
            <VerifyOtpPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/update-password"
        element={
          <PublicOnlyRoute>
            <UpdatePasswordPage />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="student">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="batch" element={<MyBatch />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="batches" element={<AdminBatches />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="students/:id" element={<UserDetailsModal />} />
        <Route path="students/:id/role" element={<RoleUpdateDialog />} />
        <Route path="students/:id/delete" element={<DeleteUserDialog />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route
        path="/instructor"
        element={
          <ProtectedRoute role="instructor">
            <InstructorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<InstructorDashboard />} />
        <Route path="batches" element={<ManageBatch />} />
        <Route path="courses" element={<ManageCourses />} />
        <Route path="students" element={<MyStudents />} />
        <Route path="profile" element={<InstructorProfile />} />
        <Route path="settings" element={<InstructorSettings />} />
      </Route>

      <Route path="*" element={<RouteFallback />} />
    </Routes>
  );
}
