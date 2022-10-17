/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { io } from "socket.io-client";

import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { blue, yellow } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import FriendMessage from "./FriendMessage.jsx";
import OwnerMessage from "./OwnerMessage.jsx";

import useAuthContext from "../../hooks/useAuthContext";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

function ChatsHistory() {
  const location = useLocation();
  const conversationID = location.state.conversationId;
  const friend = { _id: location.state.friendId, profileImage: location.state.profileImage, username: location.state.username };

  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [newArrivalMsg, setNewArrivalMsg] = useState(null);
  const socket = useRef();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const scrollRef = useRef();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    socket.current = io("ws://localhost:8080");
    socket.current.on("get-msg", (data) => {
      console.log("get msg at client side:", msg);
      setNewArrivalMsg({
        senderID: data.senderId,
        text: data.message,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    console.log("this is newArrival:", newArrivalMsg);
    newArrivalMsg &&
      friend?._id === newArrivalMsg.senderID &&
      setMessages((prev) => [...prev, newArrivalMsg]);
  }, [newArrivalMsg, friend]);

  useEffect(() => {
    socket.current.emit("add-user", user?._id);
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          "/instmsg-api/messages/" + conversationID
        );
        console.log("this is message data:", response.data);
        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [conversationID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textMessage = {
      conversationID,
      senderID: user?._id,
      text: newMessageText,
    };

    socket.current.emit("send-msg", {
      senderId: user?._id,
      receiverId: friend?._id,
      message: newMessageText,
    });

    try {
      const response = await axios.post(
        "/instmsg-api/messages/addmsg",
        textMessage
      );
      setMessages([...messages, response.data]);
      setNewMessageText("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const backToMessageList = (e) => {
    navigate(`/chat-test`);
  };

  // const refresh = (e) => {
  //   navigate("/chat-test");
  //   navigate("/instmsgchats?friend=" + friendUserId);
  // };

  return (
    <div className="chats">
      <Box
        sx={{
          width: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/chat">
          <IconButton
            color="primary"
            aria-label="back-to-messagelist"
            component="label"
            sx={{ "&:hover": { backgroundColor: blue[100] } }}
            onClick={(e) => {
              backToMessageList(e);
            }}
          >
            <ArrowBackOutlinedIcon
              sx={{
                fontSize: 40,
              }}
            />
          </IconButton>
        </Link>

        <div>
          {user && friend && (
            <h3>
              {" "}
              DM with {friend.username} as {user.username}{" "}
            </h3>
          )}
        </div>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          height: 500,
          maxWidth: 500,
          overflowY: "scroll",
          px: 3,
        }}
      >
        <>
          {messages?.map((m) => (
            <div>
              {m.senderID === user?._id ? (
                <OwnerMessage
                  ownername={user?.username}
                  avatarImg={user?.profileImage}
                  message={m.text}
                  photo={m.photoUrl}
                />
              ) : (
                <FriendMessage
                  friendname={friend?.username}
                  avatarImg={friend?.profileImage}
                  message={m.text}
                  photo={m.photoUrl}
                />
              )}
            </div>
          ))}
        </>
        <span ref={scrollRef}></span>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        position="relative"
        bottom="0px"
        left="10px"
      >
        <Link to="send-image">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            sx={{ "&:hover": { backgroundColor: blue[100] } }}
          >
            <input hidden accept="image/*" type="file" />
            <AddPhotoAlternateIcon
              sx={{
                fontSize: 60,
              }}
            />
          </IconButton>
        </Link>

        <TextField
          sx={{
            width: 400,
          }}
          onChange={(e) => setNewMessageText(e.target.value)}
          value={newMessageText}
        />
        <IconButton
          color="primary"
          aria-label="send message"
          component="label"
          sx={{ "&:hover": { backgroundColor: blue[100] } }}
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          <SendIcon
            sx={{
              fontSize: 60,
            }}
          />
        </IconButton>
      </Box>
      {/* <IconButton
        onClick={(e) => {
          refresh(e);
        }}
      >
        temp refresh
      </IconButton> */}

    </div>
  );
}

export default ChatsHistory;
