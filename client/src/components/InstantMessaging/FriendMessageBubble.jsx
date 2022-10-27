import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { blue, grey } from "@mui/material/colors";
import { styled, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import theme from "../../theme.jsx";

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
      // spacing={2}
      justify="felx-start"
      // style={{ border: "1px solid grey" }}
      sx={{ marginTop: 0 }}
      alignItems="center"
    >
      <Grid
        item
        padding={1}
        xs={2}
        justify="flex-start"
        // style={{ border: "1px solid grey", borderRadius: "10px" }}
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
            justifyContent="flex-start"
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
                maxWidth: "80%",
                borderRadius: "0px 25px 25px 25px",
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
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid
              item
              onClick={(e) => setPopView(!popView)}
              style={{
                backgroundColor: grey[200],
                border: `1px solid ${grey[200]}`,
                borderRadius: "0px 25px 25px 25px",
                marginTop: "25px",
                padding: "9px 9px",
                maxWidth: "100%",
              }}
            >
              <img
                src={photo}
                alt="test-img"
                data-testid="test-thumbnail"
                style={{ width: "50px", height: "50px", pointerEvents: "none" }}
              />
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
      {popView ? (
        <Modal
          open={popView}
          onClose={(e) => setPopView(!popView)}
          aria-labelledby="modal-zoom-img"
          handleDownloadBtnClick={handleDownloadBtnClick}
        >
          <Box
            justifyContent="center"
            alignItems="center"
            style={{
              backgroundColor: grey[100],
              border: `1px solid ${grey[100]}`,
              borderRadius: "25px 25px 25px 25px",
              marginTop: "25px",
              padding: "9px 14px",
              width: "100%",
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
                maxWidth: "100%",
                maxHeight: "100%",
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
          </Box>
        </Modal>
      ) : null}
    </Grid>
  );
}

export default FriendMessageBubble;
