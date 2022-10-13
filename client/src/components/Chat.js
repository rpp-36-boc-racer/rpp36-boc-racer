import React from "react";
import useAuthContext from "../hooks/useAuthContext";
import WithNavBar from "./withNavBar";

export default function Chat() {
  const { user } = useAuthContext();

  return (
    <WithNavBar>
      <h4>Sample Chat Page</h4>
      <div>Message list of {user.username}</div>
    </WithNavBar>
  );
}
