/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
  const [friendUserId, setFriendUserId] = useState("");
  const [conversations, setConversations] = useState([]);

  const [friend, setFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");

  const { user } = useAuthContext();
  const navigate = useNavigate();
  const scrollRef = useRef();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  const friendUserID = window.location.href.split("friend=")[1];
  useEffect(() => {
    const updateFriendUserId = async () => {
      try {
        // const friendUserID = window.location.href.split("friend=")[1];
        setFriendUserId(friendUserID);
      } catch (err) {
        console.log(err);
      }
    };
    updateFriendUserId();
  }, [friendUserId]);

  useEffect(() => {
    const getFriend = async () => {
      try {
        const response = await axios.get("/users-api/" + friendUserID);
        console.log("this is friend res:", response.data);
        setFriend(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, [friendUserId]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(
          `/instmsg-api/conversations/${user?._id}/${friend?._id}`
        );
        console.log("this is the conv data:", response.data);
        setConversations(response?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id, friend]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          "/instmsg-api/messages/" + conversations?._id
        );
        console.log("this is message data:", response.data);
        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [friend, conversations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textMessage = {
      conversationID: conversations?._id,
      senderID: user?._id,
      text: newMessageText,
    };

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

  // const testSwitchUser = (e) => {
  //   window.location.href = "/instmsgchats?friend=6347254a2a632c5c0c673043";
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
                />
              ) : (
                <FriendMessage
                  friendname={friend?.username}
                  avatarImg={friend?.profileImage}
                  message={m.text}
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
        >
          <SendIcon
            sx={{
              fontSize: 60,
            }}
            onClick={(e) => {
              handleSubmit(e);
            }}
          />
        </IconButton>
      </Box>
      {/* <IconButton
        onClick={(e) => {
          testSwitchUser(e);
        }}
      >
        test to switch another friend
      </IconButton> */}
    </div>
  );
}

export default ChatsHistory;
