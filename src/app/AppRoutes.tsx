import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import PropertiesPage from "../pages/PropertiesPage";
import StaffPage from "../pages/StaffPage";
import MaintenancePage from "../pages/MaintenancePage";
import InventoryPage from "../pages/InventoryPage";
import BookingsPage from "../pages/BookingsPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/bookings" element={<BookingsPage />} />

        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;