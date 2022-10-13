import React from "react";
import useAuthContext from "../hooks/useAuthContext";
import WithNavBar from "./withNavBar";

export default function Friends() {
  const { user } = useAuthContext();

  return (
    <WithNavBar>
      <h4>Sample Friends Page</h4>
      <div>Friend list of {user.username}</div>
    </WithNavBar>
  );
}
