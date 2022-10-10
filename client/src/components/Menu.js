import React, { useState, useMemo } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import UserContext from "./UserContext";
import Chat from "./Chat";
import Friends from "./Friends";
import Login from "./Login";

function Menu() {
  const [user, setUser] = useState("user1");
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
        <li>
          <Link to="/friends">Friends</Link>
        </li>
        <li>
          <Link to="/login">Logout</Link>
        </li>
      </ul>

      <UserContext.Provider value={value}>
        <Routes>
          <Route path="chat" element={<Chat />} />
          <Route path="friends" element={<Friends />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default Menu;
