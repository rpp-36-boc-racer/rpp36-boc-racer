import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { blue, grey } from "@mui/material/colors";
import { styled, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import theme from "../../theme.jsx";

function OwnerMessageBubble({
  message,
  ownername,
  avatarImg,
  photo,
  timeStamp,
}) {
  const [popView, setPopView] = useState(false);
  const date = new Date(timeStamp).toLocaleString();
  return (
    <Grid
      container
      wrap="nowrap"
      // spacing={2}
      direction="row-reverse"
      justify="flex-end"
      alignItems="center"
      sx={{ marginTop: 0 }}
    >
      <Grid
        item
        container
        xs={2}
        padding={1}
        justify="center"
        // style={{ border: "1px solid grey", borderRadius: "10px" }}
        alignItems="flex-end"
        direction="column"
      >
        <Grid item>
          <Avatar alt={ownername} src={avatarImg} />
        </Grid>
        <Grid item>
          <ThemeProvider theme={theme}>
            <Typography variant="body2"> {ownername}</Typography>
          </ThemeProvider>
        </Grid>
      </Grid>

      {message ? (
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Grid
              item
              xs
              style={{
                backgroundColor: blue[600],
                color: "white",
                border: `1px solid ${blue[100]}`,
                marginTop: "25px",
                padding: "9px 14px",
                maxWidth: "80%",
                borderRadius: "25px 0 25px 25px",
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
            alignItems="flex-end"
          >
            <Grid
              item
              onClick={(e) => setPopView(!popView)}
              style={{
                backgroundColor: blue[600],
                border: `1px solid ${blue[600]}`,
                borderRadius: "25px 0 25px 25px",
                marginTop: "25px",
                padding: "9px 9px",
                maxWidth: "80%",
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
        >
          <Box
            style={{
              backgroundColor: blue[100],
              border: `1px solid ${blue[100]}`,
              borderRadius: "25px 25px 25px 25px",
              marginTop: "25px",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
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

export default OwnerMessageBubble;
