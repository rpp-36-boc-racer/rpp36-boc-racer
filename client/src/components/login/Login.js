import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
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
      navigate("/dashboard");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div>
      <Link to="/">
        <Button variant="contained">Back</Button>
      </Link>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          data-testid="login-username"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
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
      </form>
    </div>
  );
}
