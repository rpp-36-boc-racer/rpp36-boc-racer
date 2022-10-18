import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadFile } from "react-s3";
import useAuthContext from "./useAuthContext";

const config = {
  bucketName: process.env.S3_BUCKET,
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

export default function useSendImage() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId } = location.state;

  const uploadAndSend = async (file) => {
    setIsLoading(true);

    uploadFile(file, config)
      .then(async (data) => {
        const response = await fetch("/send-img", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${user.token}`,
          },
          body: JSON.stringify({
            userId: user._id,
            conversationId,
            imageURL: data.location,
          }),
        });

        const json = await response.json();
        if (response.ok) {
          // navigate to previous page
          navigate(-1);
        } else {
          setError(json.error);
        }

        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  return { isLoading, error, uploadAndSend };
}
