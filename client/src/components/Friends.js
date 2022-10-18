import React, { useState, useEffect } from "react";
import useGetUsers from "../hooks/useGetUsers";
import WithNavBar from "./withNavBar";
import useAddFriends from "../hooks/useAddFriends";
import useAuthContext from "../hooks/useAuthContext";

export default function Friends() {
  const { user, dispatch } = useAuthContext();
  const [name, setUsername] = useState("");
  console.log(name)
  const { error, isLoading, users, getUsers } = useGetUsers(name);
  const { addFriend } = useAddFriends(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    getUsers({ name });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newfriend = e.target.innerHTML;
    addFriend({ user, newfriend });
  };

  if (users && users.length > 0) {
    let usersEntries;
    usersEntries = users.map((person) => (
      <div data-testid="user-tobe-selected-list">
        <li>
          <button data-testid="user-tobe-selected-button" onClick={handleAdd}>
            {person.username}
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
    </WithNavBar>
  );
}
