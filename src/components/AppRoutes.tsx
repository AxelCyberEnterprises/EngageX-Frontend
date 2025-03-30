import { tokenManager } from "@/lib/utils";
import Contact from "@/pages/Contact";
import HelpPage from "@/pages/Dashboard/User/help";
import Chat from "@/pages/Dashboard/User/help/ChatbotPage";
import Help from "@/pages/Dashboard/User/help/help";
import SafetyPrivacy from "@/pages/Dashboard/User/help/SafetyPrivacy";
import PitchPractice from "@/pages/Dashboard/User/PitchPractice";
import PresentationPractice from "@/pages/Dashboard/User/PresentationPractice";
import PublicSpeaking from "@/pages/Dashboard/User/PublicSpeaking";
import PublicSpeakingSession from "@/pages/Sessions/PublicSpeaking";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router";
import DashboardLayout from "../components/layouts/DashboardLayout";
import SessionsLayout from "../components/layouts/SessionsLayout";
import AuthPage from "../pages/auth";
import ForgotPassword from "../pages/auth/forgotPassword";
import LoginPage from "../pages/auth/login";
import ResetPassword from "../pages/auth/resetPassword";
import Tutorial from "../pages/auth/tutorial";
import AdminSessionHistory from "../pages/Dashboard/Admin/AdminSessionHistory";
import AdminDashboardHome from "../pages/Dashboard/Admin/Index";
import UserAnalytics from "../pages/Dashboard/User/Analytics";
import UserDashboardHome from "../pages/Dashboard/User/Index";
import UserSessionReport from "../pages/Dashboard/User/SessionReport";
import AdminSessionReport from "../pages/Dashboard/Admin/SessionReport";
import UserSettings from "../pages/Dashboard/User/Settings";
import UserSessionHistory from "../pages/Dashboard/User/UserSessionHistory";
import Features from "../pages/Features";
import HomePage from "../pages/HomePage";
import Pricing from "../pages/Pricing";
import PitchPracticeSession from "../pages/Sessions/PitchPractice";
import UserPlan from "./layouts/userAuth";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import SessionComparison from "@/pages/Dashboard/User/SessionComparison";
import ProgressTracking from "@/pages/Dashboard/User/ProgressTracking";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import CookiePolicy from "../pages/CookiePolicy";
import TermsOfService from "../pages/TermsOfService";
import Press from "@/pages/Press/Press";

function RequireAuth({ children }: { children: ReactNode }) {
  const isAuthenticated = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.auth.isAuthenticated
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isUser = useSelector((state: any) => state.auth.user);

  const location = useLocation();

  if (!isAuthenticated && !tokenManager.getToken()) {
    return <Navigate replace to="/auth/login" state={{ from: location }} />;
  }

  // Redirect users trying to access the wrong dashboard
  if (location.pathname.startsWith("/dashboard")) {
    if (isUser && location.pathname.startsWith("/dashboard/admin")) {
      return <Navigate replace to="/dashboard/user" />;
    }
    if (!isUser && location.pathname.startsWith("/dashboard/user")) {
      return <Navigate replace to="/dashboard/admin" />;
    }
    if (location.pathname === "/dashboard") {
      return (
        <Navigate
          replace
          to={isUser ? "/dashboard/user" : "/dashboard/admin"}
        />
      );
    }
  }

  return children;
}

function UserDashboardRoutes() {
  return (
    <Routes>
      <Route index element={<UserDashboardHome />} />
      <Route path="public-speaking" element={<PublicSpeaking />} />
      <Route path="pitch-practice" element={<PitchPractice />} />
      <Route path="presentation-practice" element={<PresentationPractice />} />
      <Route path="progress-tracking" element={<ProgressTracking />} />
      <Route path="session-history" element={<UserSessionHistory />} />
      <Route path="session-history/:id" element={<UserSessionReport />} />
      <Route path="session-comparison" element={<SessionComparison />} />
      <Route path="analytics" element={<UserAnalytics />} />
      <Route path="settings" element={<UserSettings />} />
      <Route path="help" element={<HelpPage />}>
        <Route index element={<Help />} />
        <Route path="safety" element={<SafetyPrivacy />} />
        <Route path="message" element={<Chat />} />
      </Route>

      <Route path="*" element={<Navigate replace to="/dashboard/user" />} />
    </Routes>
  );
}

function AdminDashboardRoutes() {
  return (
    <Routes>
      <Route index element={<AdminDashboardHome />} />
      <Route path="session-history" element={<AdminSessionHistory />} />
      <Route path="session-history/:id" element={<AdminSessionReport />} />
      <Route path="analytics" element={<UserAnalytics />} />
      <Route path="settings" element={<UserSettings />} />
      <Route path="*" element={<Navigate replace to="/dashboard/admin" />} />
    </Routes>
  );
}

function SessionRoutes() {
  return (
    <Routes>
      <Route path="pitch-practice-session" element={<PitchPracticeSession />} />
      <Route
        path="public-speaking-session"
        element={<PublicSpeakingSession />}
      />
      <Route path="*" element={<Navigate replace to="/dashboard/user" />} />
    </Routes>
  );
}

function AuthRoutes() {
  return (
    <Routes>
      <Route path="signup" element={<AuthPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="tutorial" element={<Tutorial />} />
      <Route path="*" element={<Navigate replace to="/auth/signup" />} />
    </Routes>
  );
}

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="dashboard/user/*"
          element={
            <DashboardLayout>
              <UserDashboardRoutes />
            </DashboardLayout>
          }
        />
        <Route
          path="dashboard/admin/*"
          element={
            <DashboardLayout>
              <AdminDashboardRoutes />
            </DashboardLayout>
          }
        />
        <Route
          path="sessions/*"
          element={
            <SessionsLayout>
              <SessionRoutes />
            </SessionsLayout>
          }
        />
      </Routes>
    </>
  );
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="features" element={<Features />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="cookie-policy" element={<CookiePolicy />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="contact" element={<Contact />} />
        <Route path="terms-of-service" element={<TermsOfService />} />
        <Route path="press" element={<Press />} />
        <Route
          path="auth/*"
          element={
            <UserPlan>
              <AuthRoutes />
            </UserPlan>
          }
        />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <MainRoutes />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="text-xl text-muted-foreground">Oops! Page not found</p>
      <Separator className="my-4 h-1 w-24 rounded bg-primary" />
      <p className="mb-6 text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild size="lg">
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  );
}
