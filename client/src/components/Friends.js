import React, { useContext } from "react";

import UserContext from "./UserContext";

function Friends() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h4>Friends</h4>
      <div>{user}</div>
    </>
  );
}

export default Friends;
