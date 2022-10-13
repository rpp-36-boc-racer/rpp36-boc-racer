import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./login/Login";
import Signup from "./login/Signup";
import Temporary from "./Temporary";
import ChatsHistory from "./InstantMessaging/ChatsHistory.jsx";
import useAuthContext from "../hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
      // navigate("/instmsgchats");
    }
  }, [user]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/app" element={<LandingPage />} />
      <Route path="/dashboard" element={<Temporary />} />
      <Route path="/instmsgchats" element={<ChatsHistory />} />
    </Routes>
  );
}

export default App;
