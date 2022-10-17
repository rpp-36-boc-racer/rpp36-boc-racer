import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./login/Login";
import Signup from "./login/Signup";
import ChatsHistory from "./InstantMessaging/ChatsHistory.jsx";
import useAuthContext from "../hooks/useAuthContext";
import PrivateRoutes from "./PrivateRoutes";
import Temporary from "./Temporary";
import Chat from "./MessageList/Chat";
// import ChatTest from "./ChatTest";
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
    // if (user && !user.profileImage) {
    //   navigate("/profilePic");
    //   return;
    // }
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
        {/* <Route path="dashboard" element={<Temporary />} /> */}
        <Route path="chat" element={<Chat />} />
        <Route path="friends" element={<Friends />} />
        <Route
          // path="instmsgchats/messages/:curConversation/:friendUserId"
          path="messaging"
          element={<ChatsHistory />}
        />
        <Route
          // path="instmsgchats/messages/:conversationId/:friendUserId/send-image"
          path="send-image"
          element={<SendImage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
