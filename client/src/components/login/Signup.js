import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
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
      navigate("/dashboard");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ username, password, email });
  };

  return (
    <div>
      <Link to="/">
        <Button variant="contained">Back</Button>
      </Link>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          data-testid="signup-username"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          data-testid="signup-email"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
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
      </form>
    </div>
  );
}
