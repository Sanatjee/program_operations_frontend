import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Auth/Login';
import DashBoard from '../pages/Dashboard/DashBoard';
import Programs from '../pages/Programs/Programs';
import Users from '../pages/Users/Users';
import Registrations from '../pages/Registrations/Registrations';
import Payments from '../pages/Payments/Payments';

import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Private */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={<DashBoard />}
          />

          <Route
            path="/programs"
            element={<Programs />}
          />

          <Route
            path="/users"
            element={<Users />}
          />

          <Route
            path="/registrations"
            element={<Registrations />}
          />

          <Route
            path="/payments"
            element={<Payments />}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/dashboard" />}
      />
    </Routes>
  );
}

export default AppRoutes;