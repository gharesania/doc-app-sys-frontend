import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DashboardPage from "./Pages/DashboardPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer, Bounce } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
