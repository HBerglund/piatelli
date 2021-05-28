import { Box, createStyles, makeStyles, Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";
import AdminUserItem from "./AdminUserItem";
import { UsersContext } from "./context/UsersContext";

function AdminUsers() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {},
    })
  );
  const usersContext = useContext(UsersContext);

  useEffect(() => {
    usersContext.getAllUsers();
  }, [usersContext]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        All Users
      </Typography>
      <Box>
        {usersContext.allUsers?.length
          ? usersContext.allUsers.map((user: any, i: number) => (
              <AdminUserItem user={user} key={i} />
            ))
          : null}
      </Box>
    </div>
  );
}

export default AdminUsers;
