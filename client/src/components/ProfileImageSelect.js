import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import usePhotoUpload from "../hooks/usePhotoUpload";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

export default function ProfileImageSelect() {
  const [imageFile, setImageFile] = useState(null);
  const { imgError, imgIsLoading, imgUrl, getImgUrl } = usePhotoUpload();
  const { user, dispatch } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    if (imageFile) {
      getImgUrl(imageFile);
    }
  }, [imageFile]);

  const useImage = async () => {
    const response = await fetch("profileimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${user.token}`,
      },
      // eslint-disable-next-line no-underscore-dangle
      body: JSON.stringify({ url: imgUrl, _id: user._id }),
    });
    const json = await response.json();
    if (response.ok) {
      const newUserObj = { ...user };
      newUserObj.profileImage = json.profileImage;
      localStorage.setItem(
        "user",
        JSON.stringify({ token: newUserObj.token, user: newUserObj })
      );
      dispatch({
        type: "LOGIN",
        payload: newUserObj,
      });
    }
  };

  return (
    <>
      <h2>Select a profile image</h2>
      <div>
        <Button variant="contained" component="label">
          Upload
          <input
            data-testid="profile-pic-select"
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </Button>
        {imgUrl && (
          <Button variant="contained" onClick={useImage}>
            Use Image
          </Button>
        )}
        <Button variant="contained" onClick={logout}>
          Log Out
        </Button>
        {imgUrl && <img src={imgUrl} alt="profile" />}
        {imgIsLoading && <h2>Loading...</h2>}
        {imgError && <h2>{imgError}</h2>}
      </div>
    </>
  );
}
