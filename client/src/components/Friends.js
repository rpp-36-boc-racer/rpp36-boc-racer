import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import WithNavBar from "./withNavBar";

export default function Friends() {
  const { user } = useAuthContext();
  const [result, setResult] = useState([]);
  const [friendList, setFriendList] = useState(null);
  const navigate = useNavigate();
  const inputRef = useRef();

  const getFriends = async () => {
    const response = await fetch("get-friends", {
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

  const search = async () => {
    const response = await fetch("friend-search", {
      method: "POST",
      headers: {
        Authorization: `bearer ${user.token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ term: inputRef.current.value }),
    });
    if (response.ok) {
      const json = await response.json();
      console.log("friend added");
      setResult(json);
    }
  };

  const addFriend = async (friendId) => {
    const response = await fetch("add-friend", {
      method: "POST",
      headers: {
        Authorization: `bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id, friendId }),
    });
    if (response.ok) {
      console.log("friend added");
    }
  };

  return (
    <WithNavBar>
      <h4>Sample Friends Page</h4>
      <input ref={inputRef} placeholder="Find friend" />
      <Button variant="contained" onClick={search}>
        Search
      </Button>
      {result && (
        <ul>
          {result.map((person) => (
            <li key={person.username}>
              {person.username} --{" "}
              <Button onClick={() => addFriend(person._id)}>Add Friend</Button>
            </li>
          ))}
        </ul>
      )}
      <div>Friend list of {user.username}</div>
      {friendList && (
        <ul>
          {friendList.map((friend) => (
            <li key={friend.username}>
              {friend.username}
              <Button onClick={() => chat(friend)}>Chat</Button>
            </li>
          ))}
        </ul>
      )}
    </WithNavBar>
  );
}
