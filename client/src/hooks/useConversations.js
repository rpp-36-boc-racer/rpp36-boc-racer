import { useState } from "react";
import useAuthContext from "./useAuthContext";

export default () => {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [running, setRunning] = useState(false);
  if (!running) {
    setInterval(async () => {
      setError(null);
      const response = await fetch(`instmsg-api/conversations/${user._id}`, {
        method: "GET",
        headers: { Authentication: `Bearer ${user.token}` },
      });
      if (response.ok) {
        const json = await response.json();
        setData(json);
      } else {
        setError(true);
      }
    }, 2000);
    setRunning(true);
  }
  return { data, error };
};
