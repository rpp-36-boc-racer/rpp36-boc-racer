import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import CommentIcon from "@mui/icons-material/Comment";
import { blue } from "@mui/material/colors";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import useGetUsers from "../hooks/useGetUsers";
import WithNavBar from "./withNavBar";
import useAddFriends from "../hooks/useAddFriends";
import useAuthContext from "../hooks/useAuthContext";

export default function Friends({ getFriends }) {
  const { user, dispatch } = useAuthContext();
  const [name, setUsername] = useState("");
  const { error, isLoading, users, usersJson, getUsers } = useGetUsers(name);
  const navigate = useNavigate();

  const { addFriend } = useAddFriends(user);

  useEffect(() => {
    getUsers({ name });
  }, [usersJson]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getUsers({ name });
    document.getElementById("myInput").value = "";
  };

  const handleAdd = (friend) => {
    const newfriend = friend;
    addFriend({ user, newfriend });
    getUsers({ name });
    getFriends();
  };

  const newuserslist = users.filter(
    (person) => person.username !== user.username
  );

  const getChatHistory = async (friend) => {
    const response2 = await fetch(`friendID/${friend}`, {
      method: "GET",
      headers: { Authentication: `Bearer ${user.token}` },
    });
    if (response2.ok) {
      response2.json().then((result) => {
        console.log("friendinfo", result);

        fetch(`instmsg-api/conversations/${user._id}/${result._id}`, {
          method: "GET",
          headers: { Authentication: `Bearer ${user.token}` },
        }).then((result2) => {
          result2
            .json()
            .then((result3) => {
              // const { friendId, username, profileImage } = result;
              // const { conversationId } = result3;

              const friendId = result._id;
              const { username } = result;
              const { profileImage } = result;
              const conversationId = result3._id;

              // console.log('result', result);
              // console.log('result3', result3);
              // console.log('friendId', friendId);
              // console.log('conversationId', conversationId);
              navigate("/messaging", {
                state: { conversationId, friendId, username, profileImage },
              });
            })
            .catch((error) => {
              fetch(`/instmsg-api/conversations`, {
                method: "POST",
                headers: {
                  Authentication: `Bearer ${user.token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  senderID: user._id,
                  receiverID: result._id,
                }),
              });
              getChatHistory(friend);
            });
        });
      });
    }
  };

  const chat = (friend) => {
    getChatHistory(friend);
  };

  if (users && users.length > 0) {
    let usersEntries;
    usersEntries = newuserslist.map((person) => {
      if (person.friends && person.friends.includes(user.username)) {
        return (
          <div data-testid="user-tobe-selected-list">
            <ListItem
              alignItems="flex-start"
              sx={{
                backgroundColor: blue[100],
                my: 1,
                mx: "auto",
                p: 2,
                boxShadow: 2,
              }}
            >
              <ListItemAvatar>
                <Avatar alt="profilepic" src={person.profileImage} />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  color: blue[800],
                }}
                primary={person.username}
                secondary={person.email}
              />

              <IconButton
                aria-label="chat with a friend"
                size="large"
                type="button"
                data-testid="user-tobe-selected-button"
                sx={{ display: "flex" }}
              >
                <CommentIcon
                  fontSize="large"
                  onClick={() => chat(person.username)}
                  sx={{ color: blue[700] }}
                />
              </IconButton>
            </ListItem>
          </div>
        );
      }
      return (
        <div data-testid="user-tobe-selected-list">
          <ListItem
            alignItems="flex-start"
            sx={{
              backgroundColor: blue[100],
              my: 1,
              mx: "auto",
              p: 2,
              boxShadow: 2,
            }}
          >
            <ListItemAvatar>
              <Avatar alt="profilepic" src={person.profilepic} />
            </ListItemAvatar>
            <ListItemText
              sx={{
                color: blue[800],
                fontWeight: "bold",
              }}
              primary={person.username}
              secondary={person.email}
            />

            <IconButton
              aria-label="add a new friend"
              size="large"
              type="button"
              data-testid="user-tobe-selected-button"
              sx={{ display: "flex" }}
              onClick={() => {
                handleAdd(person.username);
              }}
            >
              <AddReactionIcon fontSize="large" sx={{ color: blue[700] }} />
            </IconButton>
          </ListItem>
        </div>
      );
    });

    return (
      <>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          noValidate
          autoComplete="off"
        >
          <TextField
            type="text"
            data-testid="myInput"
            label="USERNAME"
            id='myInput'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            placeholder="Search for new friends.."
            onChange={(e) => setUsername(e.target.value)}
          />
          <div style={{ width: "20%", display: "flex" }}>
            <IconButton
              aria-label="add friend"
              size="large"
              data-testid="submit-search-btn"
              sx={{ display: "flex" }}
              onClick={handleSubmit}
            >
              <AddCircleIcon fontSize="large" sx={{ color: blue[700] }} />
            </IconButton>
          </div>
        </Box>
        <div data-testid="userslist">{usersEntries}</div>
      </>
    );
  }
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "30ch" },
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      noValidate
      autoComplete="off"
    >
      <TextField
        type="text"
        data-testid="myInput"
        label="USERNAME"
        id="myInput"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        placeholder="Search for new friends.."
        onChange={(e) => setUsername(e.target.value)}
      />
      <div style={{ width: "20%", display: "flex" }}>
        <IconButton
          aria-label="add friend"
          size="large"
          data-testid="submit-search-btn"
          sx={{ display: "flex" }}
          onClick={handleSubmit}
        >
          <AddCircleIcon fontSize="large" sx={{ color: blue[700] }} />
        </IconButton>
      </div>
    </Box>
  );
}
