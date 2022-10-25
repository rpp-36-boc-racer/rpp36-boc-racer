import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { blue, grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
// import { saveAs } from "file-saver";

function FriendMessageBubble({
  message,
  friendname,
  avatarImg,
  photo,
  handleDownloadBtnClick,
}) {
  const [popView, setPopView] = useState(false);

  return (
    <Grid
      container
      wrap="nowrap"
      spacing={2}
      sx={{
        // justifyContent: "flex-start",
        alignItems: "baseline",
      }}
    >
      <Grid item padding={1}>
        <Avatar alt={friendname} src={avatarImg} />
        <span>{friendname}</span>
      </Grid>
      {message ? (
        <Grid
          item
          xs
          style={{
            backgroundColor: grey[200],
            color: blue[700],
            border: `1px solid ${grey[200]}`,
            marginTop: "25px",
            padding: "9px 14px",
            maxWidth: "50%",
            borderRadius: "14px 14px 14px 0",
          }}
        >
          <Typography>{message}</Typography>
        </Grid>
      ) : null}

      {photo && !popView ? (
        <Grid
          onClick={(e) => setPopView(!popView)}
          style={{
            backgroundColor: grey[200],
            border: `1px solid ${grey[200]}`,
            borderRadius: "14px 14px 14px 0",
            marginTop: "25px",
            padding: "9px 14px",
            maxWidth: "50%",
          }}
        >
          <img
            src={photo}
            alt="test-img"
            data-testid="test-thumbnail"
            style={{ width: "80px", height: "80px", pointerEvents: "none" }}
          />
        </Grid>
      ) : null}
      {popView ? (
        <Grid
          style={{
            backgroundColor: grey[100],
            border: `1px solid ${grey[100]}`,
            borderRadius: "14px 14px 14px 0",
            marginTop: "25px",
            padding: "9px 14px",
            width: "70%",
            height: "auto",
          }}
        >
          <IconButton onClick={(e) => handleDownloadBtnClick(e, photo)}>
            <DownloadIcon
              data-testid="test-download-btn"
              sx={{
                fontSize: 50,
              }}
            />
          </IconButton>
          <Grid
            onClick={(e) => setPopView(!popView)}
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              overflow: "auto",
            }}
          >
            <img
              src={photo}
              alt="test-img-zoom"
              data-testid="test-zoom"
              style={{
                pointerEvents: "none",
              }}
            />
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
}

export default FriendMessageBubble;
