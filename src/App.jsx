import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Employees from "./pages/Employees";
import EmployeeDetails from "./pages/EmployeeDetails";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import LeaveRequests from "./pages/LeaveRequests";
import ApplyLeave from "./pages/ApplyLeave";
import MyLeaves from "./pages/MyLeaves";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/profile" element={<Profile />} />

          <Route
            path="/employees"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/add"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <AddEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/:id"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <EmployeeDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/:id/edit"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <EditEmployee />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leaves"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <LeaveRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-leaves"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <MyLeaves />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-leave"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <ApplyLeave />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <Onboarding />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/" element={<HomeRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomeRedirect() {
  return <Navigate to="/login" replace />;
}

export default App;
