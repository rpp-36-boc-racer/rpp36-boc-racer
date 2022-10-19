import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../login/Login";
import Signup from "../login/Signup";
import Temporary from "../Temporary";
import PrivateRoutes from "../PrivateRoutes";
import LandingPage from "../LandingPage";
import ProfileImageSelect from "../ProfileImageSelect";
import useAuthContext from "../../hooks/useAuthContext";

export default function TestApp() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.profileImage) {
      navigate("/profilePic");
      return;
    }
    if (user) {
      navigate("/chat");
    }
  }, [user]);
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/" element={<LandingPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="profilePic" element={<ProfileImageSelect />} />
        <Route path="chat" element={<Temporary />} />
      </Route>
    </Routes>
  );
}
