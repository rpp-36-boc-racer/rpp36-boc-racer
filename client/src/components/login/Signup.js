import React, { useState, useEffect } from "react";
import { Button, Box, OutlinedInput } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import useAuthContext from "../../hooks/useAuthContext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { error, isLoading, signup } = useSignup();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profilePic");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ username, password, email });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100vw"
      height="100vh"
      gap={10}
      style={{}}
    >
      <Link to="/">
        <Button variant="contained">Back</Button>
      </Link>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={4}
          style={{}}
        >
          <h2>Sign Up</h2>
          <OutlinedInput
            data-testid="signup-username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <OutlinedInput
            data-testid="signup-email"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <OutlinedInput
            data-testid="signup-password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" type="submit" data-testid="signup-submit">
            Sign Up
          </Button>
          {isLoading && <h2>Loading...</h2>}
          {error && <h2>{error}</h2>}
        </Box>
      </form>
    </Box>
  );
}
