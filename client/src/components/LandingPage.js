import React from "react";
import { Link } from "react-router-dom";
import { Button, SvgIcon, Box } from "@mui/material";
import PawPrintIcon from "./PawPrintIcon";

export default function LandingPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      gap={5}
    >
      <SvgIcon component={PawPrintIcon} />
      <h2>Welcome to PawPrints</h2>
      <Box display="flex" flexDirection="row" gap={3}>
        <Link
          to="/login"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Button variant="contained">Login</Button>
        </Link>
        <Link
          to="/signup"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Button variant="contained">Sign Up</Button>
        </Link>
      </Box>
    </Box>
  );
}
