import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import { useAppDispatch } from "@/store/hooks";
import { forceLogout } from "@/store/authSlice";
import AppFooter from "@/components/AppFooter";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fired by the axios interceptor when a silent token refresh fails --
    // syncs redux state so the UI reflects the now-logged-out session.
    const handler = () => dispatch(forceLogout());
    window.addEventListener("auth:logout", handler);
    return () => window.removeEventListener("auth:logout", handler);
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  );
}
