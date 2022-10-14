import { useState } from "react";
import useAuthContext from "./useAuthContext";

export default () => {
  const {user} = useAuthContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getConversations = async () => {
    setError(null);
    const response = await fetch('conversations', {
      method: 'GET',
      headers: {Authentication: 'Bearer ' + user.token},
      body: JSON.stringify({_id: user._id})

    });

    const json = await response.json();
    if (response.ok) {
      setData(json);
    } else {
      setError(json);
    }
  }

  return {getConversations, data, error};
}