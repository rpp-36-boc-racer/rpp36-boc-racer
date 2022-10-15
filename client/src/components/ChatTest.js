import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import WithNavBar from "./withNavBar";
import useAuthContext from "../hooks/useAuthContext";

export default function ChatTest() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  let friendsInfo;
  // the code below is just for tests. Once the friends functionality is implemented, this part should update
  if (user?.username === "serena") {
    friendsInfo = [
      { username: "Racer", userID: "6345a5a6ed45bf9764482ebe" },
      { username: "BlueOcean", userID: "6347254a2a632c5c0c673043" },
      // { username: "serena", userID: "63459dfbed755a985aad36fb" },
    ];
  } else if (user?.username !== "serena") {
    friendsInfo = [{ username: "serena", userID: "63459dfbed755a985aad36fb" }];
  }

  const testSwitchUser = (e, userID) => {
    navigate(`/instmsgchats?friend=${userID}`);
  };

  return (
    <>
      {" "}
      <WithNavBar>
        <h4>Sample Chat TEST Page</h4>
        <div>TEST Message list of {user.username}</div>
        {friendsInfo.map((friend) => (
          <li key={friend.userID}>
            <Button
              variant="outlined"
              onClick={(e) => {
                testSwitchUser(e, friend?.userID);
              }}
            >
              instmsg with {friend.username}
            </Button>
          </li>
        ))}
      </WithNavBar>
    </>
  );
}
