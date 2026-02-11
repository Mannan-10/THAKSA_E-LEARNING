import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import AdminLayout from "./pages/admin/AdminLayout";

import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import BatchesPage from "./pages/BatchesPage";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";

import UserDashboard from "./pages/dashboard/UserDashboard";
import MyCourses from "./pages/dashboard/MyCourses";
import MyBatch from "./pages/dashboard/MyBatch";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBatches from "./pages/admin/AdminBatches";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminSettings from "./pages/admin/AdminSettings";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/courses"
          element={
            <PublicLayout>
              <CoursesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/batches"
          element={
            <PublicLayout>
              <BatchesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/pricing"
          element={
            <PublicLayout>
              <PricingPage />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <ContactPage />
            </PublicLayout>
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
          path="/dashboard"
          element={
            <ProtectedRoute>
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
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="batches" element={<AdminBatches />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
