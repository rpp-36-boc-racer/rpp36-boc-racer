import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadFile } from "react-s3";
import useAuthContext from "./useAuthContext";
import SocketContext from "../contexts/SocketContext";

const config = {
  bucketName: process.env.S3_BUCKET,
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

export default function useSendImage() {
  const { user } = useAuthContext();
  const socket = useContext(SocketContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId, friendId } = location.state;

  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const uploadAndSend = async (file) => {
    setIsLoading(true);

    uploadFile(file, config)
      .then(async (s3Response) => {
        const data = {
          senderID: user._id,
          conversationID: conversationId,
          photoUrl: s3Response.location,
        };

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
          // after post is completed, emit send-msg event, so that when read emit, the record is in DB
          socket.emit("send-msg", {
            senderId: user._id,
            receiverId: friendId,
            message: data.photoUrl,
          });
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
