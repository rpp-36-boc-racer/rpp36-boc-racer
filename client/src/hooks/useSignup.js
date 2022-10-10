import { useState } from "react";
import useAuthContext from "./useAuthContext";

export default () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (userInfo) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      const { user } = json;
      user.token = json.token;
      dispatch({
        type: "LOGIN",
        payload: user,
      });
      setIsLoading(false);
    }
  };

  return { error, isLoading, signup };
};
