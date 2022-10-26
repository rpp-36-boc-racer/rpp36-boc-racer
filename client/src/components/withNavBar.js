import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import IconButton from "@mui/material/IconButton";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import GroupsIcon from "@mui/icons-material/Groups";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LogoutIcon from "@mui/icons-material/Logout";

import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

export default function withNavBar({ children }) {
  const [value, setValue] = React.useState(0);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { logout } = useLogout();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <IconButton
        color="primary"
        component="label"
        sx={{ position: "fixed", top: 0, right: 0 }}
        onClick={() => logout()}
      >
        <LogoutIcon />
      </IconButton>

      {children}

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={Link}
            to="/chat"
            label="Chat"
            icon={<ChatBubbleIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/myfriends"
            label="Friends"
            icon={<GroupsIcon />}
          />
          {/* <BottomNavigationAction
            component={Link}
            to="/upload-image"
            label="Image"
            icon={<AddPhotoAlternateIcon />}
          /> */}
        </BottomNavigation>
      </Paper>
    </>
  );
}

withNavBar.propTypes = {
  children: PropTypes.node.isRequired,
};
