import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";

import { uploadFile } from "react-s3";
import useAuthContext from "../../hooks/useAuthContext";

const config = {
  bucketName: process.env.S3_BUCKET,
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

export default function SendImage() {
  const { user } = useAuthContext();
  const { conversationId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
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

  return (
    <>
      {selectedFile ? (
        <IconButton
          color="primary"
          component="label"
          sx={{ position: "fixed", top: 0, left: 0 }}
          size="large"
          onClick={() => setSelectedFile(null)}
        >
          <CancelIcon fontSize="inherit" />
        </IconButton>
      ) : (
        <Link to="/dashboard">
          <IconButton
            color="primary"
            component="label"
            sx={{ position: "fixed", top: 0, left: 0 }}
            size="large"
          >
            <ArrowCircleLeftIcon fontSize="inherit" />
          </IconButton>
        </Link>
      )}
      <Paper
        sx={{
          minHeight: "80vh",
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "7%",
          left: "5%",
          border: "1px dashed grey",
          borderRadius: "2%",
        }}
        elevation={2}
      >
        {selectedFile ? (
          <div>
            <img
              src={preview}
              alt="preview"
              style={{ height: 400, width: 300, objectFit: "contain" }}
            />
          </div>
        ) : (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            size="large"
          >
            <input
              hidden
              data-testid="select-img"
              accept="image/*"
              type="file"
              onChange={handleFileInput}
            />
            <CloudUploadIcon fontSize="large" />
          </IconButton>
        )}
        {error && <p>Error: {error}</p>}
        {isLoading && <p>loading...</p>}
      </Paper>
      <Box>
        <IconButton
          disabled={!selectedFile}
          color="primary"
          component="label"
          sx={{ position: "fixed", bottom: 0, left: "45%" }}
          onClick={() => handleUpload(selectedFile)}
        >
          <SendIcon fontSize="large" />
        </IconButton>
      </Box>
    </>
  );
}
