import React, { useState, useEffect } from "react";
import useGetUsers from "../hooks/useGetUsers";
import WithNavBar from "./withNavBar";
import useAddFriends from "../hooks/useAddFriends";
import useAuthContext from "../hooks/useAuthContext";

export default function Friends() {
  const { user, dispatch } = useAuthContext();
  const [ name, setUsername] = useState("");
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

  if (users.length > 0) {
    let usersEntries;
    usersEntries = users.map((person) => (
      <li>
        <button onClick={handleAdd}>{person}</button>
      </li>
    ));
    return (
      <WithNavBar>
        <h4>Friends Page</h4>
        <div>Friend list of {user.username}</div>
        <input
          type="text"
          id="myInput"
          placeholder="Search for new friends.."
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        <div>{usersEntries}</div>
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
      <button onClick={handleSubmit}>Submit</button>
      {/* <div>Friend list of {user.username}</div> */}
    </WithNavBar>
  );
}
