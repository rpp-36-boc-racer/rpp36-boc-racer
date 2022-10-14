import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./login/Login";
import Signup from "./login/Signup";
import useAuthContext from "../hooks/useAuthContext";
import PrivateRoutes from "./PrivateRoutes";
import Temporary from "./Temporary";
import Chat from "./Chat";
import Friends from "./Friends";
import ProfileImageSelect from "./ProfileImageSelect";

function App() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.profileImage) {
      navigate("/profilePic");
      return;
    }
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<LandingPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/profilePic" element={<ProfileImageSelect />} />
        <Route path="/dashboard" element={<Temporary />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/friends" element={<Friends />} />
      </Route>
    </Routes>
  );
}

export default App;
