import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import useSendImage from "../../hooks/useSendImage";

export default function SendImage() {
  const { isLoading, error, uploadAndSend } = useSendImage();
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const webcamRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!imageFile) {
      setPreview(null);
      return;
    }

    const imageSrc = URL.createObjectURL(imageFile);
    setPreview(imageSrc);

    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(imageSrc);
  }, [imageFile]);

  const handleCapture = useCallback(async () => {
    const snapSrc = webcamRef.current.getScreenshot();
    const randomFileName = Math.random().toString(36).slice(2);

    const snapFile = await fetch(snapSrc)
      .then((res) => res.arrayBuffer())
      .then(
        (buffer) =>
          new File([buffer], `${randomFileName}.jpeg`, { type: "image/jpeg" })
      );

    setImageFile(snapFile);
  }, [webcamRef]);

  const handleFileInput = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <>
      {imageFile ? (
        <IconButton
          color="primary"
          component="label"
          sx={{ position: "fixed", top: 0, left: 0 }}
          size="large"
          onClick={() => setImageFile(null)}
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

      {error && (
        <Stack sx={{ width: "70%", margin: "auto" }} spacking={2}>
          <Alert severity="error" variant="filled">
            Error: {error}
          </Alert>
        </Stack>
      )}
      {isLoading && (
        <Stack sx={{ width: "70%", margin: "auto" }} spacking={2}>
          <Alert severity="info" variant="filled">
            Loading...
          </Alert>
        </Stack>
      )}

      <Paper
        sx={{
          backgroundColor: "black",
          minHeight: "80vh",
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "7%",
          left: "5%",
        }}
        elevation={2}
      >
        {imageFile ? (
          <img
            src={preview}
            alt="preview"
            style={{ height: 400, width: 300, objectFit: "contain" }}
          />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
          />
        )}
      </Paper>

      <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          sx={{ left: "22%" }}
          size="large"
        >
          <input
            hidden
            data-testid="select-img"
            accept="image/*"
            type="file"
            onChange={handleFileInput}
          />
          <PhotoLibraryIcon fontSize="large" />
        </IconButton>

        <IconButton
          color="primary"
          component="label"
          sx={{ left: "25%" }}
          onClick={handleCapture}
          disabled={imageFile}
        >
          <RadioButtonCheckedIcon sx={{ fontSize: 70 }} />
        </IconButton>

        <IconButton
          disabled={!imageFile}
          color="primary"
          component="label"
          sx={{ left: "28%" }}
          onClick={(event) => {
            event.preventDefault();
            uploadAndSend(imageFile);
          }}
        >
          <SendIcon fontSize="large" />
        </IconButton>
      </Box>
    </>
  );
}
