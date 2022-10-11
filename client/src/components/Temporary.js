import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";

export default function Temporary() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      {user && <h2>logged in as {user.username}</h2>}
      <Button variant="contained" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
