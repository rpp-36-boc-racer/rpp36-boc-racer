import React, { useState, useEffect } from "react";
import { Button, ImageList, ImageListItem, Box } from "@mui/material";
import usePhotoUpload from "../hooks/usePhotoUpload";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

export default function ProfileImageSelect() {
  const [imageFile, setImageFile] = useState(null);
  const { imgError, imgIsLoading, imgUrl, getImgUrl } = usePhotoUpload();
  const [selected, setSelected] = useState(null);
  const { user, dispatch } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    if (imgUrl) {
      setSelected(imgUrl);
    }
  }, [imgUrl]);

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
      body: JSON.stringify({ url: selected, _id: user._id }),
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
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      gap={3}
      style={{}}
    >
      <Box>
        <Button variant="contained" onClick={logout}>
          Log Out
        </Button>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingLeft={2}
        paddingRight={2}
      >
        <h2>Select a profile image</h2>
        <ImageList sx={{ width: 380, height: 350 }} cols={2} rowHeight={164}>
          {imgUrl && (
            <ImageListItem onClick={() => setSelected(imgUrl)}>
              <img src={imgUrl} alt="" width="150" height="150" />
            </ImageListItem>
          )}
          {Array(20)
            .fill()
            .map((item, index) => {
              const image = `https://boc-bucket-racer.s3.amazonaws.com/image${
                index + 1
              }.png`;
              return (
                <ImageListItem
                  key={`image${index + 1}`}
                  onClick={() => setSelected(image)}
                >
                  <img
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
                    src={image}
                    width="150"
                    height="150"
                    alt=""
                  />
                </ImageListItem>
              );
            })}
        </ImageList>
        <Box marginBottom={4}>
          <Box display="flex" flexDirection="row" gap={5}>
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
            {selected && (
              <Button variant="contained" onClick={useImage}>
                Use Image
              </Button>
            )}
          </Box>
          {imgIsLoading && <h2>Loading...</h2>}
          {imgError && <h2>{imgError}</h2>}
        </Box>
        {selected && <img src={selected} alt="" width="150" height="150" />}
      </Box>
    </Box>
  );
}
