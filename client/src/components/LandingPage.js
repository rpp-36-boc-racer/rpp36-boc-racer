import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function LandingPage() {
  return (
    <div>
      <h2>PawPrint</h2>
      <Link to="/login">
        <Button variant="contained">Login</Button>
      </Link>
      <Link to="/signup">
        <Button variant="contained">Sign Up</Button>
      </Link>
    </div>
  );
}
