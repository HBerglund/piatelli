import { Box, createStyles, makeStyles, Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";
import AdminUserItem from "./AdminUserItem";
import { LoggedInContext } from "./context/LoginContext";

function AdminUsers() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {},
    })
  );
  const loggedInContext = useContext(LoggedInContext);

  useEffect(() => {
    loggedInContext.getAllUsers();
  }, []);

  // TODO: GET USERS FROM DB
  const users: any = [
    {
      email: "victor.wikstrom@icloud.com",
      role: "admin",
      fullName: "Victor Wikström",
      approvedAdmin: true,
      phone: "0702045411",
      address: {
        street: "Jenny Lindsgatan 4B",
        zipcode: "41662",
        city: "Gothenburg",
        country: "Sweden",
      },
    },
    {
      email: "andrea.soderlind@gmail.com",
      role: "customer",
      fullName: "Andrea Söderlind",
      approvedAdmin: false,
      phone: "0763456332",
      address: {
        street: "Drivhusgatan 4C",
        zipcode: "42633",
        city: "Gothenburg",
        country: "Sweden",
      },
    },
  ];

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        All Users
      </Typography>
      <Box>
        {loggedInContext.allUsers?.length
          ? loggedInContext.allUsers.map((user: any, i: number) => (
              <AdminUserItem user={user} key={i} />
            ))
          : null}
      </Box>
    </div>
  );
}

export default AdminUsers;
