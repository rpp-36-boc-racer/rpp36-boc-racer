import React from "react";
import useAuthContext from "../hooks/useAuthContext";

export default function UploadImage() {
  const { user } = useAuthContext();

  return (
    <>
      <h4>Upload Image</h4>
      <div>as {user.username}</div>
    </>
  );
}
