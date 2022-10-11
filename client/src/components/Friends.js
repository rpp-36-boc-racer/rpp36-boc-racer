import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import UserContext from "./UserContext";

function Friends() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h4>Friends</h4>
      <div>{user}</div>
      <Link to="add-friends">Add A Friend</Link>
      <Outlet />
    </>
  );
}

export default Friends;
