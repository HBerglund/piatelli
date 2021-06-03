import {
  Box,
  Container,
  Typography,
  Link,
  Hidden,
  Button,
} from "@material-ui/core";
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
      <Box>
        <Box className={classes.footerLogo}>
          <Typography color="secondary" variant="h4">
            PIATTELLI
          </Typography>
        </Box>
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {usersContext.user ? (
          <Link>
            <Typography style={{ color: "white" }} onClick={handleLogOutClick}>
              Log out
            </Typography>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <Typography style={{ color: "white" }}>Log in</Typography>
            </Link>

            <Link href="/registration">
              <Typography style={{ color: "white" }}>
                or Register here
              </Typography>
            </Link>
          </>
        )}
        {usersContext.user?.authorizedAdmin ? (
          <Link href="/admin">
            <Typography style={{ color: "white" }}>Admin CMS</Typography>
          </Link>
        ) : null}
      </Box>

      <Hidden smUp>
        <Box className={classes.mobileFooterContainer}>
          <Box className={classes.mobileFooterContent}>
            <Box>
              <Typography variant="subtitle2">
                <Button color="inherit">Collections</Button>
              </Typography>
            </Box>
            <br />
            <Box>
              <Typography variant="subtitle2">
                <Button color="inherit">Help</Button>
              </Typography>
            </Box>
          </Box>
          <Box className={classes.mobileFooterContent}>
            <Box>
              <Typography variant="subtitle2">
                <Button color="inherit">Company</Button>
              </Typography>
            </Box>
            <br />
            <Box>
              <Typography variant="subtitle2">
                <Button color="inherit">Follow Us</Button>
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
    padding: "2rem 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#333333",
    width: "100%",
  },
  rootStyle: {
    color: "white",
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
    padding: "2rem 0",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  mobileFooterContent: {
    color: "white",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
}));

export default Footer;
