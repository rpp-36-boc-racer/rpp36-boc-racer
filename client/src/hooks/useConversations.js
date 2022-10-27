import { useState } from "react";
import useAuthContext from "./useAuthContext";

export default () => {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getConversations = async () => {
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
  };

  return { data, error, getConversations };
};
