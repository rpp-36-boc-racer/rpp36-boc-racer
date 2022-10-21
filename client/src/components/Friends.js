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
import AddFriends from "./AddFriends";

export default function Friends() {
  const { user, dispatch } = useAuthContext();
  const [friendList, setFriendList] = useState(null);
  const navigate = useNavigate();

  const getFriends = async () => {
    const response = await fetch(`friends/`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${user.token}`,
      },
    });
    if (response.ok) {
      const json = await response.json();
      setFriendList(json);
    }
  };

  useEffect(() => {
    if (!friendList) {
      getFriends();
    }
  }, [friendList]);

  const chat = (friend) => {
    navigate("/messaging", { state: { friend } });
  };

  return (
    <WithNavBar>
      <h4>Friends Page</h4>
      <AddFriends />
      <div>Friend list</div>
      {friendList && (
        <ul>
          {friendList.map((friend) => (
            <div key={friend}>
              <li>{friend}</li>
              <Button onClick={() => chat(friend)}>Chat</Button>
            </div>
          ))}
        </ul>
      )}
    </WithNavBar>
  );
}