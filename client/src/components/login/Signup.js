import React, { useState, useEffect } from "react";
import { Button, Box, OutlinedInput, List, ListItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import useAuthContext from "../../hooks/useAuthContext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [containsUpper, setContainsUpper] = useState(false);
  const [containsSpecial, setContainsSpecial] = useState(false);
  const [containsNumber, setContainsNumber] = useState(false);
  const [containsLower, setContainsLower] = useState(false);
  const [email, setEmail] = useState("");
  const { error, isLoading, signup } = useSignup();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profilePic");
    }
  }, [user]);

  useEffect(() => {
    if (/[a-z]/.test(password)) {
      setContainsLower(true);
    } else {
      setContainsLower(false);
    }
    if (/[A-Z]/.test(password)) {
      setContainsUpper(true);
    } else {
      setContainsUpper(false);
    }
    if (/[-+_!@#$%^&*.,?]/.test(password)) {
      setContainsSpecial(true);
    } else {
      setContainsSpecial(false);
    }
    if (/[1-9]/.test(password)) {
      setContainsNumber(true);
    } else {
      setContainsNumber(false);
    }
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      signup({ username, password, email });
    }
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
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1}
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
          <OutlinedInput
            data-testid="signup-password2"
            type="password"
            placeholder="Retype Password"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Button variant="contained" type="submit" data-testid="signup-submit">
            Sign Up
          </Button>
          {password.length > 0 && (
            <List>
              <ListItem color="red">Password requires</ListItem>
              <ListItem
                style={{ color: password.length >= 8 ? "green" : "red" }}
              >
                8 Characters
              </ListItem>
              <ListItem style={{ color: containsUpper ? "green" : "red" }}>
                1 Uppercase letter
              </ListItem>
              <ListItem style={{ color: containsLower ? "green" : "red" }}>
                1 Lowercase letter
              </ListItem>
              <ListItem style={{ color: containsNumber ? "green" : "red" }}>
                1 Number
              </ListItem>
              <ListItem style={{ color: containsSpecial ? "green" : "red" }}>
                1 Symbol
              </ListItem>
              {password2.length > 0 && password !== password2 && (
                <ListItem style={{ color: "red" }}>
                  Passwords do not match
                </ListItem>
              )}
            </List>
          )}
          {isLoading && <h2>Loading...</h2>}
          {error && <h2>{error}</h2>}
        </Box>
      </form>
    </Box>
  );
}
