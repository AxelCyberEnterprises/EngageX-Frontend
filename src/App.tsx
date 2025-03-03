import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";
import HomePage from "./pages/HomePage";
import UserAnalytics from "./pages/Dashboard/User/Analytics";
import UserDashboardHome from "./pages/Dashboard/User/Index";
import UserSettings from "./pages/Dashboard/User/Settings";
import "./styles/index.scss";
import "./App.css";
import UserAuth from "./components/layouts/userAuth";
import AdminDashboardHome from "./pages/Dashboard/Admin/Index";
import AuthQuestions from "./pages/auth";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import Tutorial from "./pages/auth/tutorial";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Main Layout Routes */}
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/userAuth" element={<UserAuth />} /> */}

          {/* Dashboard Layout Routes */}
          <Route path="/dashboard/user" element={<DashboardLayout />}>
            <Route index element={<UserDashboardHome />} />
            <Route path="analytics" element={<UserAnalytics />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>

          {/* Signup flow */}
          <Route path="/auth" element={<UserAuth />}>
            <Route index element={<AuthQuestions />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="tutorial" element={<Tutorial />} />
          </Route>

          <Route path="/dashboard/admin" element={<DashboardLayout />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="analytics" element={<UserAnalytics />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>

          {/* 404 Page */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
