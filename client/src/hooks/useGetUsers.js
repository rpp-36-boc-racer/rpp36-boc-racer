import { useState } from "react";

export default () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [users, setUsers] = useState([]);

  const getUsers = async (user) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`users/${user.name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const json = await response.json();
      // .then((res) => res.json())
      // .then((data) => console.log('here', data));
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setUsers(json.users);
      setIsLoading(false);
    }
  };


  return { error, isLoading, users, getUsers };
};
