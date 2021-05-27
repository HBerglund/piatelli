import {
  createStyles,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Section: React.FC<Props> = ({ children }) => {
  const useStyles = makeStyles(() =>
    createStyles({
      section: {
        margin: "auto",
        marginTop: "8rem",
        padding: matchesMd ? "4rem" : "2rem" && matchesSm ? "2rem" : "0.8rem",
        overflow: "hidden",
        maxWidth: "1400px",
      },
    })
  );

  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));

  const classes = useStyles();

  return <div className={classes.section}>{children}</div>;
};

export default Section;
