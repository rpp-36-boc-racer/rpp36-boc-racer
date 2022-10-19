import React, { useState, useEffect } from "react";
import useGetUsers from "../hooks/useGetUsers";
import WithNavBar from "./withNavBar";
import useAddFriends from "../hooks/useAddFriends";
import useAuthContext from "../hooks/useAuthContext";

export default function Friends() {
  const { user, dispatch } = useAuthContext();
  const [name, setUsername] = useState("");
  const { error, isLoading, users, getUsers } = useGetUsers(name);
  const { addFriend } = useAddFriends(user);

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

  if (users && users.length > 0) {
    let usersEntries;
    usersEntries = newuserslist.map((person) => {
      if (person.friends && person.friends.includes(user.username)) {
        return (
          <div data-testid="user-tobe-selected-list">
            <li>
              {person.username}
              <button
                type="button"
                data-testid="user-tobe-selected-button"
                id={person.username}
                onClick={handleAdd}
              >
                chat
              </button>
            </li>
          </div>
        );
      }
      return (
        <div data-testid="user-tobe-selected-list">
          <li>
            {person.username}
            <button
              type="button"
              data-testid="user-tobe-selected-button"
              id={person.username}
              onClick={handleAdd}
            >
              add
            </button>
          </li>
        </div>
      );
    });

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
