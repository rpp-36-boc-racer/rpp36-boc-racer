import React from "react";
import useAuthContext from "../hooks/useAuthContext";

import WithNavBar from "./withNavBar";

export default function Temporary() {
  const { user } = useAuthContext();

  return (
    <div>
      <WithNavBar>
        <h2>logged in as {user.username}</h2>
      </WithNavBar>
    </div>
  );
}
