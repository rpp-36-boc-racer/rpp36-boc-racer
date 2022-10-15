import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

function FriendMessage({ message, friendname, avatarImg, photo }) {
  const [popView, setPopView] = useState(false);
  return (
    <StyledPaper
      sx={{
        my: 1,
        mx: "auto",
        p: 2,
        color: blue[800],
        backgroundColor: blue[100],
      }}
    >
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item padding={1}>
          <Avatar alt={friendname} src={avatarImg} />
          <span>{friendname}</span>
        </Grid>
        {message ? (
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
        ) : null}

        {photo && !popView ? (
          <Grid onClick={(e) => setPopView(!popView)}>
            <img
              src={photo}
              alt="test-img"
              style={{ width: "80px", height: "80px" }}
            />
          </Grid>
        ) : null}
        {popView ? (
          <Grid>
            <IconButton>
              <DownloadIcon
                sx={{
                  fontSize: 50,
                }}
              />
            </IconButton>
            <Grid onClick={(e) => setPopView(!popView)}>
              <img src={photo} alt="test-img-zoom" />
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </StyledPaper>
  );
}

export default FriendMessage;
