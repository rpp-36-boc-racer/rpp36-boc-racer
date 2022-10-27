/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SocketContext from "../../contexts/SocketContext";

import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { blue, yellow } from "@mui/material/colors";
import { styled, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import OwnerMessageBubble from "../InstantMessaging/OwnerMessageBubble.jsx";
import FriendMessageBubble from "../InstantMessaging/FriendMessageBubble.jsx";
import MessageAlert from "../InstantMessaging/MessageAlert.jsx";
import theme from "../../theme.jsx";
import { saveAs } from "file-saver";

import useAuthContext from "../../hooks/useAuthContext";

function ChatsHistory() {
  const location = useLocation();
  const conversationID = location.state.conversationId;
  const friend = {
    _id: location.state.friendId,
    profileImage: location.state.profileImage,
    username: location.state.username,
  };
  const { user } = useAuthContext();
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [newArrivalMsg, setNewArrivalMsg] = useState(null);
  let socket = useContext(SocketContext);

  const navigate = useNavigate();
  const scrollRef = useRef();

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

  const emitReadEvent = () => {
    const emitData = {
      conversationId: conversationID,
      receiverId: user._id,
      readAt: new Date(),
    };
    console.log("emit read");
    socket.emit("read", emitData);
  };

  useEffect(() => {
    socket.emit("add-user", user?._id);
    emitReadEvent();

    socket.on("get-msg", (data) => {
      console.log("get msg at client side:", data);
      emitReadEvent();

      // get updated message to remove expired image after 70s
      setTimeout(getMessages, 70000);

      setNewArrivalMsg({
        senderID: data.senderId,
        text: data.message,
        createdAt: Date.now(),
      });
    });

    // get updated message to remove expired image after 70s
    setTimeout(getMessages, 70000);

    return () => {
      socket.off("get-msg");
      socket.emit("remove-user", user._id);
    };
  }, []);

  // useEffect(() => {
  //   socket.emit("add-user", user?._id);
  // }, [user]);

  useEffect(() => {
    getMessages();
  }, [conversationID, newArrivalMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textMessage = {
      conversationID,
      senderID: user?._id,
      text: newMessageText,
    };

    socket.emit("send-msg", {
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

  const handleSendImageButtonClick = (event) => {
    event.preventDefault();
    navigate("/send-image", {
      state: { conversationId: conversationID, friendId: friend._id },
    });
  };

  /************* download photo btn***************/

  const downloadAndSendNotification = async (e, photoUrl) => {
    e.preventDefault();
    saveAs(photoUrl, "download.jpg");
    const textMessage = {
      conversationID,
      senderID: user?._id,
      text: `⚠️SYSTEM MESSAGE⚠️: ${user?.username} has saved your photo!!! `,
    };
    socket.emit("send-msg", {
      senderId: user?._id,
      receiverId: friend?._id,
      message: `⚠️SYSTEM MESSAGE⚠️: ${user?.username} has saved your photo!!! `,
      photoSaved: true,
    });
    try {
      const response = await axios.post(
        "/instmsg-api/messages/addmsg",
        textMessage
      );
      console.log("Success notify!");
      setMessages([...messages, response.data]);
    } catch (err) {
      console.log("can not trigger notification!", err);
    }
  };

  return (
    <div className="chats" style={{ marginTop: "0px" }}>
      <Box
        sx={{
          maxWidth: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: 3,
        }}
        style={{
          // border: `1px solid ${blue[500]}`,

          backgroundColor: blue[100],
        }}
      >
        <Link to="/chat">
          <IconButton
            color="primary"
            aria-label="back-to-messagelist"
            component="label"
            sx={{ "&:hover": { backgroundColor: blue[200] } }}
          >
            <ArrowBackIosNewIcon
              sx={{
                fontSize: 50,
              }}
            />
          </IconButton>
        </Link>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ padding: "10px" }}
        >
          {user && friend && (
            <>
              <img
                src="https://i.ibb.co/ZK2D678/paw-messaging.png"
                alt="DM-img"
                style={{
                  maxWidth: "80%",
                  height: "auto",
                  pointerEvents: "none",
                }}
              ></img>

              <ThemeProvider theme={theme}>
                <Typography variant="title1">
                  with {friend.username} as {user.username}{" "}
                </Typography>
              </ThemeProvider>
            </>
          )}
        </Grid>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          height: 500,
          maxWidth: 550,
          overflowY: "scroll",
          px: 3,
        }}
      >
        {messages?.map((m, index) => (
          <div key={index}>
            {m.text && m.text.includes("⚠️SYSTEM MESSAGE⚠️:") ? (
              <MessageAlert
                message={m.text}
                timeStamp={m.createdAt}
                friendname={friend?.username}
              />
            ) : m.senderID === user?._id ? (
              <OwnerMessageBubble
                ownername={user?.username}
                avatarImg={user?.profileImage}
                message={m.text}
                photo={m.photoUrl}
                timeStamp={m.createdAt}
              />
            ) : (
              <FriendMessageBubble
                friendname={friend?.username}
                avatarImg={friend?.profileImage}
                message={m.text}
                photo={m.photoUrl}
                timeStamp={m.createdAt}
                handleDownloadBtnClick={downloadAndSendNotification}
              />
            )}
          </div>
        ))}
        <span ref={scrollRef}></span>
      </Box>
      <Box
        sx={{
          maxWidth: 600,
          display: "flex",
          alignItems: "center",
          backgroundColor: blue[100],
          boxShadow: 3,
        }}
        position="relative"
        bottom="0px"
        left="0px"
      >
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          sx={{ "&:hover": { backgroundColor: blue[200] } }}
          onClick={handleSendImageButtonClick}
        >
          <AddPhotoAlternateIcon
            sx={{
              fontSize: 60,
            }}
          />
        </IconButton>

        <TextField
          sx={{
            width: 550,
            backgroundColor: "white",
          }}
          placeholder="Enter your message here..."
          onChange={(e) => setNewMessageText(e.target.value)}
          value={newMessageText}
        />
        {newMessageText ? (
          <IconButton
            color="primary"
            aria-label="send message"
            component="label"
            sx={{ "&:hover": { backgroundColor: blue[200] } }}
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
        ) : (
          <IconButton
            color="primary"
            aria-label="send message disabled"
            component="label"
            disabled
            sx={{ "&:hover": { backgroundColor: blue[200] } }}
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
        )}
      </Box>
    </div>
  );
}

export default ChatsHistory;
