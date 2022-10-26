import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { blue, grey } from "@mui/material/colors";
import { styled, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import theme from "../../theme.jsx";

// import { saveAs } from "file-saver";

function FriendMessageBubble({
  message,
  friendname,
  avatarImg,
  photo,
  timeStamp,
  handleDownloadBtnClick,
}) {
  const [popView, setPopView] = useState(false);
  const date = new Date(timeStamp).toLocaleString();

  return (
    <Grid
      container
      wrap="nowrap"
      spacing={2}
      justify="felx-start"
      style={{ border: "1px solid grey" }}
      sx={{ marginTop: 0 }}
    >
      <Grid
        item
        padding={1}
        xs={2.5}
        justify="flex-start"
        style={{ border: "1px solid grey", borderRadius: "10px" }}
        alignItems="center"
      >
        <Avatar alt={friendname} src={avatarImg} />

        <ThemeProvider theme={theme}>
          <Typography variant="body2"> {friendname}</Typography>
        </ThemeProvider>
      </Grid>
      {message ? (
        <Grid item xs>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid
              item
              style={{
                backgroundColor: grey[200],
                color: blue[700],
                border: `1px solid ${grey[200]}`,
                marginTop: "25px",
                padding: "9px 9px 9px 9px",
                maxWidth: "50%",
                borderRadius: "50px 50px 50px 0",
              }}
            >
              <ThemeProvider theme={theme}>
                <Typography variant="body1">{message}</Typography>
              </ThemeProvider>
            </Grid>
            <Grid
              item
              style={{
                fontFamily: "Arial",
                fontSize: "10px",
                color: grey[600],
              }}
            >
              {date}
            </Grid>
          </Grid>
        </Grid>
      ) : null}

      {photo && !popView ? (
        <Grid
          onClick={(e) => setPopView(!popView)}
          style={{
            backgroundColor: grey[200],
            border: `1px solid ${grey[200]}`,
            borderRadius: "50px 50px 50px 0",
            marginTop: "25px",
            padding: "9px 9px",
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
            borderRadius: "50px 50px 50px 0",
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
