import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from './components/layouts/DashboardLayout';
import HomePage from './pages/HomePage';
import UserAnalytics from './pages/Dashboard/User/Analytics';
import UserDashboardHome from './pages/Dashboard/User/Index';
import UserSettings from './pages/Dashboard/User/Settings';
import './styles/index.scss';
import './App.css'
import AdminDashboardHome from "./pages/Dashboard/Admin/Index";

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* Main Layout Routes */}
          <Route path='/' element={<HomePage />} />

          {/* Dashboard Layout Routes */}
          <Route path="/dashboard/user" element={<DashboardLayout />}>
            <Route index element={<UserDashboardHome />} />
            <Route path="analytics" element={<UserAnalytics />} />
            <Route path="settings" element={<UserSettings />} />
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
  )
}

export default App
