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
import useGetUsers from "../hooks/useGetUsers";
import WithNavBar from "./withNavBar";
import useAddFriends from "../hooks/useAddFriends";
import useAuthContext from "../hooks/useAuthContext";

export default function Friends() {
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
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newfriend = e.target.id;
    addFriend({ user, newfriend });
    getUsers({ name });
  };

  const newuserslist = users.filter(
    (person) => person.username !== user.username
  );

  const chat = (friend) => {
    navigate("/messaging", { state: { friend } });
  };


  if (users && users.length > 0) {
    let usersEntries;
    usersEntries = newuserslist.map((person) => {
      if (person.friends && person.friends.includes(user.username)) {
        return (
          <div data-testid="user-tobe-selected-list">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="profilepic" src={person.profilepic} />
              </ListItemAvatar>
              <ListItemText primary={person.username} />
              <button
                type="button"
                data-testid="user-tobe-selected-button"
                id={person.username}
                onClick={() => chat(person.username)}
              >
                chat
              </button>
            </ListItem>
          </div>
        );
      }
      return (
        <div data-testid="user-tobe-selected-list">
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="profilepic" src={person.profilepic} />
            </ListItemAvatar>
            <ListItemText primary={person.username} />

            <button
              type="button"
              data-testid="user-tobe-selected-button"
              id={person.username}
              onClick={handleAdd}
            >
              add
            </button>
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
              <AddCircleIcon fontSize="large" />
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
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </div>
    </Box>
  );
}
