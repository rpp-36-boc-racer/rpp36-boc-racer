import React, { useState, useEffect } from "react";
import { Button, Box, OutlinedInput } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import useAuthContext from "../../hooks/useAuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, login } = useLogin();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100vw"
      height="100vh"
      gap={10}
      style={{}}
      fontFamily="arial"
    >
      <Link to="/">
        <Button variant="contained">Back</Button>
      </Link>
      <form onSubmit={handleSubmit} size="medium">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={4}
          style={{}}
        >
          <h2>Login</h2>
          <OutlinedInput
            data-testid="login-username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <OutlinedInput
            data-testid="login-password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" type="submit" data-testid="login-submit">
            Login
          </Button>
          {isLoading && <h2>Loading...</h2>}
          {error && <h2>{error}</h2>}
        </Box>
      </form>
    </Box>
  );
}
