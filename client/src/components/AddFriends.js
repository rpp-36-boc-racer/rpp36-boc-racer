import React from "react";
import useAuthContext from "../hooks/useAuthContext";
import WithNavBar from "./withNavBar";

export default function Chat() {
  const { user } = useAuthContext();

  return (
    <WithNavBar>
      <h4>Add Friend</h4>
    </WithNavBar>
  );
}
