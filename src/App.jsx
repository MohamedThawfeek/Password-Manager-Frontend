import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ResetPassword from "./pages/auth/reset-password";
import ForgotPassword from "./pages/auth/forgot-password";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";

const App = () => {
  const { token } = useSelector((state) => state.user);
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Routes>
        <Route path="/" element={ token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={ token ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={ token ? <Navigate to="/" /> : <Signup />} />
        <Route path="/reset-password" element={ token ? <Navigate to="/" /> : <ResetPassword />} />
        <Route path="/forgot-password" element={ token ? <Navigate to="/" /> : <ForgotPassword />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
