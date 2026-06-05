import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import HistoryPage from "../pages/HistoryPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

import ProtectedRoute from "./ProtectedRoute";

import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import CTASection from "../components/CTASection";
import WorkflowSection from "../components/WorkflowSection";
import BenefitsSection from "../components/BenefitsSection";
import FAQSection from "../components/FAQSection";

function HomePage() {
  return (
    <>
      <HeroSection />

      <FeaturesSection />

      <WorkflowSection />

      <BenefitsSection />

      <FAQSection />

      <CTASection />
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>

        <Routes>

          {/* Landing Page */}
          <Route
            path="/"
            element={<HomePage />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={<LoginPage />}
          />

          {/* Register */}
          <Route
            path="/register"
            element={<RegisterPage />}
          />

          {/* Reset Password */}
          <Route
            path="/reset-password"
            element={<ResetPasswordPage />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* History */}
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />

        </Routes>

      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRoutes;