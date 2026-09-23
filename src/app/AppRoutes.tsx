import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import PropertiesPage from "../pages/PropertiesPage";
import StaffPage from "../pages/StaffPage";
import MaintenancePage from "../pages/MaintenancePage";
import InventoryPage from "../pages/InventoryPage";
import BookingsPage from "../pages/BookingsPage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import ProtectedRoute from "../components/ProtectedRoute";
import DrawerLayout from "../layouts/DrawerLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<DrawerLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;