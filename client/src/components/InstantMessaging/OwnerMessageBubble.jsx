import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function OwnerMessageBubble({ message, ownername, avatarImg, photo }) {
  const [popView, setPopView] = useState(false);
  return (
    <Grid
      container
      wrap="nowrap"
      spacing={2}
      direction="row-reverse"
      sx={{
        // justifyContent: "flex-end",
        alignItems: "baseline",
      }}
    >
      <Grid item>
        <Avatar alt={ownername} src={avatarImg} />
        <span>{ownername}</span>
      </Grid>

      {message ? (
        <Grid
          item
          xs
          style={{
            backgroundColor: blue[700],
            color: "white",
            border: `1px solid ${blue[100]}`,
            marginTop: "25px",
            padding: "9px 14px",
            maxWidth: "50%",
            borderRadius: "14px 14px 0 14px",
          }}
        >
          <Typography>{message}</Typography>
        </Grid>
      ) : null}
      {photo && !popView ? (
        <Grid
          onClick={(e) => setPopView(!popView)}
          style={{
            backgroundColor: blue[700],
            border: `1px solid ${blue[100]}`,
            borderRadius: "14px 14px 0 14px",
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
            borderRadius: "14px 14px 0 14px",
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
