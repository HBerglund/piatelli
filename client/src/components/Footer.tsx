import { Box, Container, Typography, Link, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import { useHistory } from "react-router";
import { UsersContext } from "./context/UsersContext";
import FooterSection from "./FooterSection";

function Footer() {
  const classes = useStyles();
  const usersContext = useContext(UsersContext);
  const history = useHistory();

  const handleLogOutClick = () => {
    usersContext.logOut();
    history.replace("/");
  };

  return (
    <Container className={classes.containerStyle} maxWidth={false}>
      <Hidden only={"xs"}>
        <Box className={classes.rootStyle}>
          <FooterSection />
          <FooterSection />
          <Hidden smDown>
            <FooterSection />
            <FooterSection />
          </Hidden>
        </Box>
      </Hidden>
      {usersContext.user ? (
        <Link>
          <Typography onClick={handleLogOutClick}>Log out</Typography>
        </Link>
      ) : (
        <>
          <Link href="/login">
            <Typography>Log in</Typography>
          </Link>

          <Link href="/registration">
            <Typography>or Register here</Typography>
          </Link>
        </>
      )}
      {usersContext.user?.authorizedAdmin ? (
        <Link href="/admin">
          <Typography>Admin CMS</Typography>
        </Link>
      ) : null}
      <Box>
        <Box className={classes.footerLogo}>
          <Typography variant="h4">PIATTELLI</Typography>
        </Box>
      </Box>
      <Hidden smUp>
        <Box className={classes.mobileFooterContainer}>
          <Box className={classes.mobileFooterContent}>
            <Box>
              <Typography variant="subtitle2">
                <Link>Collections</Link>
              </Typography>
            </Box>
            <br />
            <Box>
              <Typography variant="subtitle2">
                <Link>Help</Link>
              </Typography>
            </Box>
          </Box>
          <Box className={classes.mobileFooterContent}>
            <Box>
              <Typography variant="subtitle2">
                <Link>Company</Link>
              </Typography>
            </Box>
            <br />
            <Box>
              <Typography variant="subtitle2">
                <Link>Follow Us</Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Hidden>
    </Container>
  );
}
const useStyles = makeStyles((theme) => ({
  containerStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#333333",
    width: "100%",
  },
  rootStyle: {
    width: "60%",
    display: "flex",
    justifyContent: "space-around",
    padding: "2rem 1rem 1rem 1rem",
  },
  footerLogo: {
    paddingBottom: "2rem",
    color: "#E5E5E5",
  },
  mobileFooterContainer: {
    width: "100%",
    height: "10rem",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  mobileFooterContent: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
}));

export default Footer;
