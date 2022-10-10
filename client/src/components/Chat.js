import React, { useContext } from "react";

import UserContext from "./UserContext";

function Chat() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h4>Chat</h4>
      <div>{user}</div>
    </>
  );
}

export default Chat;
