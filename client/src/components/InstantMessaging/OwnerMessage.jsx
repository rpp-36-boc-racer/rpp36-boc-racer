import React from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
// import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

function OwnerMessage({ message, ownername, avatarImg, photo }) {
  return (
    <StyledPaper
      sx={{
        my: 1,
        mx: "auto",
        p: 2,
      }}
    >
      <Grid container wrap="nowrap" spacing={2} direction="row-reverse">
        <Grid item>
          <Avatar alt={ownername} src="xxx.jpg" />
          <span>{ownername}</span>
        </Grid>

        {message ? (
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
        ) : null}
        {photo ? (
          <Grid>
            <img src={photo} alt="test-img" />
          </Grid>
        ) : null}
      </Grid>
    </StyledPaper>
  );
}

export default OwnerMessage;
