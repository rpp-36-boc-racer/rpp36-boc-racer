import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import useAuthContext from "../../hooks/useAuthContext";
import WithNavBar from "../withNavBar";
import Conversations from "./Conversations";
import useConversations from "../../hooks/useConversations";
const axios = require("axios").default;

export default function Chat() {
  const { user } = useAuthContext();
  const { getConversations, data } = useConversations();
  const [newArrivalMsg, setNewArrivalMsg] = useState(null);
  const socket = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  useEffect(() => {
    getConversations();
  }, []);
  useEffect(() => {
    socket.current = io("ws://localhost:4000");
    socket.current.on("get-msg", (data) => {
      console.log("get msg at client side:", data);
      setNewArrivalMsg({
        senderID: data.senderId,
        text: data.message,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    getConversations();
  }, [newArrivalMsg]);

  useEffect(() => {
    socket.current.emit("add-user", user?._id);
  }, [user]);

  function deleteConvoFunc(convoId) {
    axios
      .delete(`/instmsg-api/conversations/${convoId}`)
      .then((result) => {
        getConversations();
      })
      .catch((error) => {
        console.log(`cannot delete conversation.\n ${error}`);
      });
  }

  function hasBeenReadFunc(textMessageId) {
    // axios.put(`/instmsg-api/messages/${textMessageId}`)
  }

  function confirmDeleteFunc(friendUsername) {
    if (confirm(`Delete conversation with ${friendUsername}?`)) {
      deleteConvoFunc();
    }
  }

  return (
    <WithNavBar>
      <h4> Chat </h4>
      {data && (
        <Conversations
          data={data}
          deleteConvoFunc={deleteConvoFunc.bind(this)}
          hasBeenReadFunc={hasBeenReadFunc.bind(this)}
          confirmDeleteFunc={confirmDeleteFunc.bind(this)}
        />
      )}
    </WithNavBar>
  );
}
