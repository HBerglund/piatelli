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
          <Link>The Softy Basic</Link>
          <Link>Le Scandinive</Link>
          <Link>Mona-Lisa Piattelli</Link>
          <Link>Rinacimento</Link>
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
