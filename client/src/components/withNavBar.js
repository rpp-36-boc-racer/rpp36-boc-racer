import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

import useLogout from "../hooks/useLogout";

export default function withNavBar({ children }) {
  const { logout } = useLogout();

  return (
    <>
      {children}
      <ul>
        <li>
          <Link to="/chat">
            <Button variant="contained">Chat</Button>
          </Link>
        </li>
        <li>
          <Link to="/friends">
            <Button variant="contained">Friends</Button>
          </Link>
        </li>
        <li>
          <Link to="/chat-test">
            <Button variant="contained">*******chat test page*****</Button>
          </Link>
        </li>
        <li>
          <Button variant="contained" onClick={() => logout()}>
            Logout
          </Button>
        </li>
      </ul>
    </>
  );
}

withNavBar.propTypes = {
  children: PropTypes.node.isRequired,
};
