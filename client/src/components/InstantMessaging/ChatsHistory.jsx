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
  const [conversations, setConversations] = useState([]);
  const [friend, setFriend] = useState(null);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(`/instmsg/conversations/${user?._id}`);
        console.log("this is the conv data:", response.data);
        setConversations(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    const friendID = conversations[0]?.members.filter(
      (m) => m !== user?._id
    )[0];
    const getFriend = async () => {
      try {
        const response = await axios.get("/users/" + friendID);
        console.log("this is friend res:", response.data);
        setFriend(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, [conversations]);

  // useEffect(() => {
  //   const getMessages = async () => {
  //     try {
  //       const res = await axios.get("/messages/" + currentChat?._id);
  //       setMessages(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getMessages();
  // }, [currentChat]);

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
        >
          <ArrowBackOutlinedIcon
            sx={{
              fontSize: 40,
            }}
          />
        </IconButton>

        <div>{user && <h3> DM with Racer as {user.username} </h3>}</div>
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
        <FriendMessage friendname={friend?.username} />
        <OwnerMessage ownername={user?.username} />
        <FriendMessage friendname={friend?.username} />
        <OwnerMessage ownername={user?.username} />
        <OwnerMessage ownername={user?.username} />
        <FriendMessage friendname={friend?.username} />
        <FriendMessage friendname={friend?.username} />
        <OwnerMessage ownername={user?.username} />
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
          />
        </IconButton>
      </Box>
    </div>
  );
}

export default ChatsHistory;
