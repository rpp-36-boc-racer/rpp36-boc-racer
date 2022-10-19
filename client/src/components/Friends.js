import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGetUsers from "../hooks/useGetUsers";
import WithNavBar from "./withNavBar";
import useAddFriends from "../hooks/useAddFriends";
import useAuthContext from "../hooks/useAuthContext";

export default function Friends() {
  const { user, dispatch } = useAuthContext();
  const [name, setUsername] = useState("");
  const [friendList, setFriendList] = useState(null);
  const { error, isLoading, users, getUsers } = useGetUsers(name);
  const { addFriend } = useAddFriends(user);
  const navigate = useNavigate();

  const getFriends = async () => {
    const response = await fetch("friends", {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    getUsers({ name });
  };

  const handleAdd = (person) => {
    // e.preventDefault();
    const newfriend = person;
    addFriend({ user, newfriend });
    getFriends();
  };

  if (users && users.length > 0) {
    const usersEntries = users.map((person) => (
      <div key={person[0]} data-testid="user-tobe-selected-list">
        <li>
          <button
            type="button"
            data-testid="user-tobe-selected-button"
            onClick={() => handleAdd(person[0])}
          >
            {person[0]}
          </button>
        </li>
      </div>
    ));
    return (
      <WithNavBar>
        <h4>Friends Page</h4>
        <input
          type="text"
          data-testid="myInput"
          placeholder="Search for new friends.."
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="button"
          data-testid="submit-search-btn"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div data-testid="userslist">{usersEntries}</div>
        <div>Friend list of {user.username}</div>
        {friendList && (
          <ul>
            {friendList.map((friend) => (
              <div>
                <li key={friend}>{friend}</li>
                <Button onClick={() => chat(friend)}>Chat</Button>
              </div>
            ))}
          </ul>
        )}
      </WithNavBar>
    );
  }
  return (
    <WithNavBar>
      <h4>Friends Page</h4>
      <input
        type="text"
        id="myInput"
        placeholder="Search for new friends.."
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        type="button"
        data-testid="submit-search-btn"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <div>Friend list of {user.username}</div>
      {friendList && (
        <ul>
          {friendList.map((friend) => (
            <div>
              <li key={friend}>{friend}</li>
              <Button onClick={() => chat(friend)}>Chat</Button>
            </div>
          ))}
        </ul>
      )}
    </WithNavBar>
  );
}
