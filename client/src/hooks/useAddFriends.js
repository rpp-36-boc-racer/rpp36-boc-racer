import { useState } from "react";

export default () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [friends, setFriends] = useState([]);

  const addFriend = async (person) => {
    setIsLoading(true);
    setError(null);
    const user = person.user.username;
    const { newfriend } = person;

    const response = await fetch(`friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, newfriend }),
    });

    const json = await response.json();

    // .then((res) => res.json())
    // .then((data) => console.log('here', data));
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setFriends([...json]);
      setIsLoading(false);
    }
  };

  return { addFriend };
};
