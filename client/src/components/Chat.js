import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import WithNavBar from "./withNavBar";

export default function Chat() {
  const { user } = useAuthContext();
  const [conversations, setConversations] = useState(null);
  const navigate = useNavigate();

  const getConversations = async () => {
    const response = await fetch(`conversations?userId=${user._id}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${user.token}`,
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      const json = await response.json();
      setConversations(json);
    }
  };

  useEffect(() => {
    if (!conversations) {
      getConversations();
    }
  }, [conversations]);

  const chat = (friend) => {
    navigate("/messaging", { state: { friend } });
  };

  return (
    <WithNavBar>
      <h4>Sample Chat Page</h4>
      {conversations && (
        <ul>
          {conversations.map((conversation) => (
            <li key={conversation.friend._id}>
              {conversation.message} -- with {conversation.friend.username}
              <Button onClick={() => chat(conversation.friend)}>Chat</Button>
            </li>
          ))}
        </ul>
      )}
      <div>Message list of {user.username}</div>
    </WithNavBar>
  );
}
