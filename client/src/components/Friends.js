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
import ChatIcon from "@mui/icons-material/Chat";
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

  const getChatHistory = async (friend) => {
    const response2 = await fetch(`friendID/${friend}`, {
      method: "GET",
      headers: { Authentication: "Bearer " + user.token },
    });
    if (response2.ok) {
      response2.json().then((result) => {
        console.log("friendinfo", result);

        fetch(`instmsg-api/conversations/${user._id}/${result._id}`, {
          method: "GET",
          headers: { Authentication: "Bearer " + user.token },
        }).then((result2) => {
          result2
            .json()
            .then((result3) => {
              // const { friendId, username, profileImage } = result;
              // const { conversationId } = result3;

              const friendId = result._id;
              const username = result.username;
              const profileImage = result.profileImage;
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
                  Authentication: "Bearer " + user.token,
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

  return (
    <WithNavBar>
      <h3 style={{ textAlign: "center" }}>Friends</h3>
      <AddFriends getFriends={getFriends} />
      <h4
        style={{
          fontFamily: "Arial",
        }}
      >
        {" "}
        Friends{"  "}
      </h4>

      {friendList && (
        <table
          style={{
            background: "#bbdefb",
            color: "#1565c0",
            borderRadius: "10px",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          {friendList.map((friend) => (
            <tr key={friend.username}>
              <td
                style={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Avatar alt="profilepic" src={friend.profileImage} />{" "}
              </td>
              <td
                style={{
                  fontSize: "15px",
                  width: "22.5%",
                  textAlign: "left",
                  fontFamily: "Arial",
                }}
              >
                {" "}
                {friend.username}{" "}
              </td>
              <td
                style={{
                  width: "50%",
                  textAlign: "center",
                }}
              >
                <ChatIcon onClick={() => chat(friend.username)}>Chat</ChatIcon>
              </td>
            </tr>
          ))}
        </table>
      )}
    </WithNavBar>
  );
}
