import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./login/Login";
import Signup from "./login/Signup";
import ChatsHistory from "./InstantMessaging/ChatsHistory.jsx";
import useAuthContext from "../hooks/useAuthContext";
import PrivateRoutes from "./PrivateRoutes";
import Chat from "./MessageList/Chat";
import Friends from "./Friends";
import SendImage from "./InstantMessaging/SendImage";
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
        <Route path="chat" element={<Chat />} />
        <Route path="myfriends" element={<Friends />} />
        <Route path="messaging" element={<ChatsHistory />} />
        <Route path="send-image" element={<SendImage />} />
      </Route>
    </Routes>
  );
}

export default App;
