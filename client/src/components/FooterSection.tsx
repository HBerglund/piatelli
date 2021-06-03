import { Box, Link, Typography, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function FooterSection() {
  const classes = useStyles();
  return (
    <Box>
      <Hidden only={"xs"}>
        <Typography variant="h5" className={classes.textColor}>
          Collection
        </Typography>
        <Typography variant="subtitle2" className={classes.textColor}>
          <Typography variant="subtitle1" style={{ color: "white" }}>
            The Softy Basic
          </Typography>
          <Typography variant="subtitle1" style={{ color: "white" }}>
            Le Scandinive
          </Typography>
          <Typography variant="subtitle1" style={{ color: "white" }}>
            Mona-Lisa Piattelli
          </Typography>
          <Typography variant="subtitle1" style={{ color: "white" }}>
            Rinacimento
          </Typography>
        </Typography>
      </Hidden>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  textColor: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "300%",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
}));

export default FooterSection;
