import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DistributorDashboardPage from "./pages/DistributorDashboardPage";
import CartDrawer from "./components/CartDrawer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/distributor"
          element={
            <ProtectedRoute requiredRole="distributor">
              <DistributorDashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <CartDrawer />
    </BrowserRouter>
  );
}

export default App;
