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
      { username: "Racer", userID: "634a1af33ea01ae6f0609f25" },
      { username: "BlueOcean", userID: "634a1d523c59da237e5657e6" },
      // { username: "serena", userID: "63459dfbed755a985aad36fb" },
    ];
  } else if (user?.username !== "serena") {
    friendsInfo = [{ username: "serena", userID: "634a19a63ea01ae6f0609f20" }];
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
