import React, { useContext } from "react";
import Button from "@mui/material/Button";

import UserContext from "./UserContext";

function AddFriends() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h4>Add A Friend</h4>
      <div>{user}</div>
      <Button variant="contained">Add</Button>
    </>
  );
}

export default AddFriends;
