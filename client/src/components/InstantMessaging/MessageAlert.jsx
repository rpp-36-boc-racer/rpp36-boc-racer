import React, { useState } from "react";
import { blue, grey, yellow, orange } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import { styled, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import theme from "../../theme.jsx";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));
function MessageAlert({ timeStamp, message }) {
  const date = new Date(timeStamp).toLocaleString();
  const line1 = message.split(":")[0];
  const line2 = message.split(":")[1];
  return (
    <StyledPaper
      sx={{
        my: 1,
        mx: "auto",
        p: 2,
        color: orange[800],
        backgroundColor: yellow[100],
      }}
    >
      <Box align="center">
        <NotificationsActiveIcon />
        <ThemeProvider theme={theme}>
          <Typography variant="body1" align="center">
            {line2}
          </Typography>
        </ThemeProvider>
        <Typography
          align="center"
          style={{
            fontFamily: "Arial",
            fontSize: "10px",
            color: grey[600],
          }}
        >
          {date}
        </Typography>
      </Box>
    </StyledPaper>
  );
}

export default MessageAlert;
