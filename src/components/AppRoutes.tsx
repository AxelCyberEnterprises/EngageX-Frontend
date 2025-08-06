/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider } from "@/context/ThemeContext";
import { tokenManager } from "@/lib/utils";
import AccessGate from "@/pages/auth/AccessGate";
import CancellationPolicy from "@/pages/CancellationPolicy";
import Contact from "@/pages/Contact";
import AdminSettings from "@/pages/Dashboard/Admin/AdminSettings";
import CoachingRoom from "@/pages/Dashboard/User/CoachingRoom";
import HelpPage from "@/pages/Dashboard/User/help";
import Chat from "@/pages/Dashboard/User/help/ChatbotPage";
import Help from "@/pages/Dashboard/User/help/help";
import SafetyPrivacy from "@/pages/Dashboard/User/help/SafetyPrivacy";
import PerformanceImprovement from "@/pages/Dashboard/User/PerformanceImprovement";
import PitchPractice from "@/pages/Dashboard/User/PitchPractice";
import PresentationPractice from "@/pages/Dashboard/User/PresentationPractice";
import ProgressTracking from "@/pages/Dashboard/User/ProgressTracking";
import PublicSpeaking from "@/pages/Dashboard/User/PublicSpeaking";
import RookieRoom from "@/pages/Dashboard/User/RookieRoom";
import SessionComparison from "@/pages/Dashboard/User/SessionComparison";
import Press from "@/pages/Press/Press";
import CoachingRoomSession from "@/pages/Sessions/CoachingRoom";
import NBAMediaTraining from "@/pages/Sessions/NBACoachTraining";
import NBAGMTraining from "@/pages/Sessions/NBAGMTraining";
import NFLMediaTraining from "@/pages/Sessions/NFLCoachTraining";
import NFLGMTraining from "@/pages/Sessions/NFLGMTraining";
import PresentationPracticeSession from "@/pages/Sessions/PresentationPractice";
import PublicSpeakingSession from "@/pages/Sessions/PublicSpeaking";
import TheRookieMediaTraining from "@/pages/Sessions/TheRookieMediaTraining";
import TheRookieSpeaking from "@/pages/Sessions/TheRookieSpeaking";
import WNBAMediaTraining from "@/pages/Sessions/WNBACoachTraining";
import WNBAGMTraining from "@/pages/Sessions/WNBAGMTraining";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, Route, BrowserRouter as Router, Routes, useLocation } from "react-router";
import DashboardLayout from "../components/layouts/DashboardLayout";
import SessionsLayout from "../components/layouts/SessionsLayout";
import AuthPage from "../pages/auth";
import ForgotPassword from "../pages/auth/forgotPassword";
import LoginPage from "../pages/auth/login";
import ResetPassword from "../pages/auth/resetPassword";
import Tutorial from "../pages/auth/tutorial";
import AdminSessionHistory from "../pages/Dashboard/Admin/AdminSessionHistory";
import AdminDashboardHome from "../pages/Dashboard/Admin/Index";
import AdminSessionReport from "../pages/Dashboard/Admin/SessionReport";
import UserAnalytics from "../pages/Dashboard/User/Analytics";
import UserDashboardHome from "../pages/Dashboard/User/Index";
import UserSessionReport from "../pages/Dashboard/User/SessionReport";
import UserSessionHistory from "../pages/Dashboard/User/UserSessionHistory";
import UserSettings from "../pages/Dashboard/User/UserSettings";
import Features from "../pages/Features";
import HomePage from "../pages/HomePage";
import Pricing from "../pages/Pricing";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import SecurityAndCompliance from "../pages/SecurityAndCompliance";
import PitchPracticeSession from "../pages/Sessions/PitchPractice";
import TermsOfService from "../pages/TermsOfService";
import DynamicDialog from "./dialogs/DynamicDialog";
import UserPlan from "./layouts/userAuth";
import WebsiteLayout from "./layouts/WebsiteLayout";
import ScrollToTop from "./ScrollToTop";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Toaster } from "./ui/sonner";
import VideoPopup from "./VideoPopup";

function RequireAuth({ children }: { children: ReactNode }) {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const isUser = useSelector((state: any) => state.auth.user)?.is_admin === false;

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
            return <Navigate replace to={isUser ? "/dashboard/user" : "/dashboard/admin"} />;
        }
    }

    return children;
}

function UserDashboardRoutes() {
    return (
        <Routes>
            <Route index element={<UserDashboardHome />} />
            <Route path="public-speaking" element={<PublicSpeaking />} />
            <Route path="the-coaching-room" element={<CoachingRoom />} />
            <Route path="pitch-practice" element={<PitchPractice />} />
            <Route path="presentation-practice" element={<PresentationPractice />} />
            <Route
                path="the-rookie-room"
                element={
                    <AccessGate>
                        <RookieRoom />
                    </AccessGate>
                }
            />
            <Route path="progress-tracking" element={<ProgressTracking />} />
            <Route path="session-history" element={<UserSessionHistory />} />
            <Route path="session-history/:id" element={<UserSessionReport />} />
            <Route path="session-comparison" element={<SessionComparison />} />
            <Route path="performance-improvement" element={<PerformanceImprovement />} />
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
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate replace to="/dashboard/admin" />} />
        </Routes>
    );
}

function SessionRoutes() {
    return (
        <Routes>
            <Route path="pitch-practice-session/:id" element={<PitchPracticeSession />} />
            <Route path="public-speaking-session/:id" element={<PublicSpeakingSession />} />
            <Route path="presentation-practice-session/:id" element={<PresentationPracticeSession />} />
            <Route path="the-rookie-media-training/:id" element={<TheRookieMediaTraining />} />
            <Route path="the-rookie-speaking/:id" element={<TheRookieSpeaking />} />
            <Route path="NFL-coach-room/:id" element={<NFLMediaTraining />} />
            <Route path="NBA-coach-room/:id" element={<NBAMediaTraining />} />
            <Route path="WNBA-coach-room/:id" element={<WNBAMediaTraining />} />
            <Route path="NFL-GM-room/:id" element={<NFLGMTraining />} />
            <Route path="NBA-GM-room/:id" element={<NBAGMTraining />} />
            <Route path="WNBA-GM-room/:id" element={<WNBAGMTraining />} />
            <Route path="coaching-room/:id" element={<CoachingRoomSession />} />
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
                        <AccessGate>
                            <DashboardLayout>
                                <UserDashboardRoutes />
                            </DashboardLayout>
                        </AccessGate>
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
                        <AccessGate>
                            <SessionsLayout>
                                <SessionRoutes />
                            </SessionsLayout>
                        </AccessGate>
                    }
                />
            </Routes>
        </>
    );
}

export default function AppRoutes() {
    return (
        <Router>
            <ThemeProvider>
                <DynamicDialog />
                <ScrollToTop />
                <Toaster toastOptions={{ classNames: { content: "size-full" } }} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <WebsiteLayout>
                                <>
                                    <VideoPopup />
                                    <HomePage />
                                </>
                            </WebsiteLayout>
                        }
                    />
                    <Route
                        path="features"
                        element={
                            <WebsiteLayout>
                                <Features />
                            </WebsiteLayout>
                        }
                    />
                    <Route
                        path="privacy-policy"
                        element={
                            <WebsiteLayout>
                                <PrivacyPolicy />
                            </WebsiteLayout>
                        }
                    />
                    <Route
                        path="security-and-compliance"
                        element={
                            <WebsiteLayout>
                                <SecurityAndCompliance />
                            </WebsiteLayout>
                        }
                    />
                    <Route
                        path="pricing"
                        element={
                            <WebsiteLayout>
                                <Pricing />
                            </WebsiteLayout>
                        }
                    />
                    <Route
                        path="contact"
                        element={
                            <WebsiteLayout>
                                <Contact />
                            </WebsiteLayout>
                        }
                    />
                    <Route
                        path="terms-of-service"
                        element={
                            <WebsiteLayout>
                                <TermsOfService />
                            </WebsiteLayout>
                        }
                    />
                    <Route
                        path="cancellation-policy"
                        element={
                            <WebsiteLayout>
                                <CancellationPolicy />
                            </WebsiteLayout>
                        }
                    />
                    <Route
                        path="press"
                        element={
                            <WebsiteLayout>
                                <Press />
                            </WebsiteLayout>
                        }
                    />
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
            </ThemeProvider>
        </Router>
    );
}

function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6">
            <h1 className="text-6xl font-bold text-foreground">404</h1>
            <p className="text-xl text-muted-foreground">Oops! Page not found</p>
            <Separator className="my-4 h-1 w-24 rounded bg-primary" />
            <p className="mb-6 text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
            <Button asChild size="lg">
                <Link to="/">Go Home</Link>
            </Button>
        </div>
    );
}
