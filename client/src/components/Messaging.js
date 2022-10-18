import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

export default function Messaging() {
  const { user } = useAuthContext();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const state = useLocation();
  const { friend } = state.state;
  const [connected, setConnected] = useState(false);

  const getMessages = async () => {
    const response = await fetch(
      `messages?userId=${user._id}&friendId=${friend._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      }
    );
    if (response.ok) {
      const json = await response.json();
      setMessages(json);
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      getMessages();
    }
  }, [messages]);

  const sendMessage = () => {
    const message = inputRef.current.value;
    if (socket && message) {
      // eslint-disable-next-line no-underscore-dangle
      socket.emit("new-message", {
        userId: user._id,
        message,
        friendId: friend._id,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { _id: Date.now(), message, username: "Me" },
      ]);
    }
  };

  useEffect(() => {
    if (!socket) {
      setSocket(
        io("http://localhost:4000", {
          reconnectionDelayMax: 10000,
          auth: {
            token: user.token,
          },
          query: {
            userId: user._id,
          },
        })
      );
    } else if (!connected) {
      socket.on("connection", () => {
        socket.on("new-message", (data) => {
          setMessages((prevMessages) => [...prevMessages, data.message]);
        });
      });
      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      setConnected(true);
    }
  }, [socket]);

  return (
    <>
      <h4>Messaging Page</h4>
      {messages && (
        <ul>
          {messages.map((message) => (
            <li key={message._id}>
              {message.message}{" "}
              <strong>
                from {message.username ? message.username : friend.username}
              </strong>
            </li>
          ))}
        </ul>
      )}
      <input type="text" ref={inputRef} />
      <Button variant="constained" onClick={sendMessage}>
        Send Message
      </Button>
      <div>Message list of {user.username}</div>
    </>
  );
}
