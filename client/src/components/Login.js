import React, { useContext } from "react";

import UserContext from "./UserContext";

function Login() {
  const { setUser } = useContext(UserContext);
  return (
    <>
      <h4>Login</h4>
      <button
        type="button"
        onClick={() => {
          setUser("logged out");
        }}
      >
        Login
      </button>
    </>
  );
}

export default Login;
