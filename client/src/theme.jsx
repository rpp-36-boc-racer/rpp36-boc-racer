import { createTheme } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";

const theme = createTheme();
theme.typography.title1 = {
  fontSize: "1rem",
  fontFamily: "Arial",
  color: blue[700],
  "@media (min-width:500px)": {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.3rem",
  },
};
theme.typography.body1 = {
  fontSize: "0.9rem",
  fontFamily: "Arial",
  "@media (min-width:500px)": {
    fontSize: "1.1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem",
  },
};

theme.typography.body2 = {
  fontSize: "0.7rem",
  fontFamily: "Arial",
  "@media (min-width:500px)": {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
};

// theme.typography.fontFamily = {

// }

export default theme;
