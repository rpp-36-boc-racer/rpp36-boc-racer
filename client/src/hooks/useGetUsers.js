import { useState } from "react";

export default () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersJson, setusersJson] = useState([]);

  const getUsers = async (user) => {
    setIsLoading(true);
    setError(null);

    console.log(user.name);
    if (!user.name) {
      setUsers([]);
      setIsLoading(false);
    }

    const response = await fetch(`users/${user.name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    // .then((res) => res.json())
    // .then((data) => console.log('here', data));
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      const usersJson = JSON.stringify(json.users);
      setUsers(json.users);
      setusersJson(usersJson);
      setIsLoading(false);
    }
  };

  return { error, isLoading, users, usersJson, getUsers };
};
