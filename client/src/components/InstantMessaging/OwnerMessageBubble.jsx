import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { blue, grey } from "@mui/material/colors";
import { styled, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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
        padding={2}
        xs={2.5}
        style={{ border: "1px solid grey", borderRadius: "10px" }}
        alignItems="center"
      >
        <Avatar alt={ownername} src={avatarImg} />
        <ThemeProvider theme={theme}>
          <Typography variant="body2"> {ownername}</Typography>
        </ThemeProvider>
      </Grid>

      {message ? (
        <Grid item xs>
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
                maxWidth: "50%",
                borderRadius: "50px 50px 0 50px",
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
            backgroundColor: blue[600],
            border: `1px solid ${blue[100]}`,
            borderRadius: "50px 50px 0 50px",
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
            backgroundColor: blue[700],
            border: `1px solid ${blue[100]}`,
            borderRadius: "50px 50px 0 50px",
            marginTop: "25px",
            padding: "9px 14px",
            maxWidth: "50%",
          }}
        >
          <Grid
            onClick={(e) => setPopView(!popView)}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
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

export default OwnerMessageBubble;
