import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
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
  const { conversationId, friendId } = location.state;
  const socket = useRef();

  const uploadAndSend = async (file) => {
    setIsLoading(true);

    uploadFile(file, config)
      .then(async (s3Response) => {
        const data = {
          senderID: user._id,
          conversationID: conversationId,
          photoUrl: s3Response.location,
        };

        socket.current = io("ws://localhost:4000");
        socket.current.emit("send-msg", {
          senderId: user._id,
          receiverId: friendId,
          message: data.photoUrl,
        });

        const response = await fetch("/instmsg-api/messages/addmsg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${user.token}`,
          },
          body: JSON.stringify(data),
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
