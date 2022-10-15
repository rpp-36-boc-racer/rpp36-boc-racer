import { useState } from "react";
import useAuthContext from "./useAuthContext";

export default () => {
  const [imgError, setImgError] = useState(null);
  const [imgIsLoading, setImgIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const { user } = useAuthContext();

  const getImgUrl = async (file) => {
    setImgError(null);
    setImgIsLoading(true);
    const formData = new FormData();
    formData.set("image", file);

    const response = await fetch("photo", {
      method: "POST",
      headers: {
        Authorization: `bearer ${user.token}`,
      },
      body: formData,
    });
    const json = await response.json();
    if (response.ok) {
      setImgUrl(json.url);
    } else {
      setImgError(json.error);
    }
    setImgIsLoading(false);
  };

  return { imgError, imgIsLoading, imgUrl, getImgUrl };
};
