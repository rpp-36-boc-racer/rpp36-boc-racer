import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import useSendImage from "../../hooks/useSendImage";

export default function SendImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();
  const { isLoading, error, uploadAndSend } = useSendImage();
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

  const handleBackButtonClick = () => {
    navigate(-1);
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
        <IconButton
          color="primary"
          component="label"
          sx={{ position: "fixed", top: 0, left: 0 }}
          size="large"
          onClick={handleBackButtonClick}
        >
          <ArrowCircleLeftIcon fontSize="inherit" />
        </IconButton>
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
        {error && <p>Error: {error}</p>}
        {isLoading && <p>loading...</p>}
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
      </Paper>
      <Box>
        <IconButton
          disabled={!selectedFile}
          color="primary"
          component="label"
          sx={{ position: "fixed", bottom: 0, left: "45%" }}
          onClick={(event) => {
            event.preventDefault();
            uploadAndSend(selectedFile);
          }}
        >
          <SendIcon fontSize="large" />
        </IconButton>
      </Box>
    </>
  );
}
