import * as React from "react";
import moment from "moment";
// import React from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

const profileImageStyle = {
  borderRadius: "50%",
  padding: "5px",
  height: "50px",
  width: "50px",
};

const sameLineAndSpace = {
  display: "flex",
  justifyContent: "space-between",
};

const sameLineStyle = {
  display: "flex",
};

const boldFont = {
  fontWeight: "bold",
};

const getConvoTime = (convoTime) => {
  const timeElapsed = moment(convoTime).fromNow();

  return timeElapsed;
};
//
function Conversation(props) {
  const {
    userID,
    profileImage,
    friendId,
    username,
    text,
    time,
    conversationId,
    hasBeenRead,
    senderId,
    lastMessageId,
  } = props.convo;
  console.log('props in conversation', props,
  'userID', userID,
  'senderId', senderId,
  'userID !== senderID', userID !== senderId);
  const navigate = useNavigate();
  const handleConversationClick = () => {
    navigate("/messaging", {
      state: { conversationId, friendId, username, profileImage },
    });
  };
  return (
    <StyledPaper
      data-testid="convo"
      style={{paddingTop: '26px'}}
      sx={{
        my: 1,
        mx: "auto",
        p: 2,
        color: blue[800],
        backgroundColor: blue[100],
      }}
    >
      <Grid container wrap="nowrap" spacing={2} style={{ display: 'flex', width: '100%', marginLeft: '0' }}>
        <Grid style={{display: 'flex', alignItems: 'center', width: '100%'}}>
          <Grid item padding={1}>
            <Avatar alt={username} src={profileImage} />
          </Grid>
          <Grid
            data-testid="innerConvo"
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            onClick={() => {
              props.hasBeenReadFunc(lastMessageId);
              handleConversationClick();
            }}
          >
            <span style={{ display: 'flex', justifyContent: "space-between" }}>
              <span style={{ fontWeight: "bold" }}>{username}</span>
              <span
                style={{
                  fontWeight:
                    !hasBeenRead && (userID !== senderId) ? "bold" : "normal",
                }}
              >
                {getConvoTime(time)}
              </span>
            </span>
            <span
              style={{
                fontWeight: !hasBeenRead && (userID !== senderId) ? "bold" : "normal",
              }}
            >
              {text.length > 100 ? text.substring(0, 99) + "..." : text}
            </span>
          </Grid>
        </Grid>

        <Grid style={{display: 'flex', alignItem: 'center'}}>
          <IconButton
            aria-label="delete"
            data-testid="delete"
            size="large"
            onClick={() => {
              props.confirmDeleteFunc(username, conversationId);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </StyledPaper>
  );
}

export default Conversation;
