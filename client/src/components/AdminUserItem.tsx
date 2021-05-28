import { ChangeEvent, useState, useContext } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  Box,
  Button,
  createStyles,
  Hidden,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { UsersContext } from "./context/UsersContext";

interface Props {
  user: {
    email: string;
    role: string;
    fullName: string;
    authorizedAdmin: boolean;
    phone: string;
    address: {
      street: string;
      zipcode: string;
      city: string;
      country: string;
    };
  };
}

function AdminUserItem(props: Props) {
  const usersContext = useContext(UsersContext);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [editable, setEditable] = useState<boolean>(false);
  // TODO: State type should be of User
  const [user, setUser] = useState<any>(props.user);

  const { email, role, fullName, authorizedAdmin, phone, address } = user;
  const { street, city, zipcode, country } = address;

  const inputFields = [
    { name: "email", value: email },
    { name: "fullName", value: fullName },
    { name: "phone", value: phone },
    { name: "street", value: street },
    { name: "city", value: city },
    { name: "zipcode", value: zipcode },
    { name: "country", value: country },
  ];

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleInputChange = (
    e: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const { name, value } = e.target;
    const isAddress: boolean =
      name === "street" ||
      name === "city" ||
      name === "zipcode" ||
      name === "country";

    if (isAddress) {
      setUser({
        ...user,
        address: { ...user.address, [name as string]: value },
      });
    } else {
      setUser({
        ...user,
        [name as string]: value,
      });
    }
  };

  const handleApprovedChange = (e: ChangeEvent<{ value: unknown }>) => {
    let value = false;
    e.target.value === "true" ? (value = true) : (value = false);
    setUser({
      ...user,
      authorizedAdmin: value,
    });
  };

  const saveUserToDb = () => {
    setEditable(false);
    //TODO: POST UPDATED USER TO DATABASE
    usersContext.updateUser(user);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion
        className={classes.accRoot}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            style={{ marginRight: "1rem", fontWeight: "bold" }}
            variant="body2"
            className={classes.heading}
          >
            {fullName}
          </Typography>
          <Hidden xsDown>
            <Typography className={classes.secondaryHeading}>{role}</Typography>
          </Hidden>
          {role === "admin" && !authorizedAdmin ? (
            <Hidden xsDown>
              <Typography
                className={classes.secondaryHeading}
                style={{ marginLeft: "2rem" }}
              >
                Approval required
              </Typography>
            </Hidden>
          ) : null}
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Box className={classes.editBox}>
            {editable ? (
              <Button
                variant="contained"
                onClick={saveUserToDb}
                className={classes.saveButton}
              >
                Save Changes
              </Button>
            ) : (
              <Box>
                <Tooltip title="Edit user" arrow>
                  <IconButton onClick={() => setEditable(true)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete user" arrow>
                  <IconButton>
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
          <Box className={classes.row}>
            <Typography style={{ marginRight: "8px" }} variant="caption">
              Role
            </Typography>
            {editable ? (
              <Select
                name="role"
                value={role}
                defaultValue={role}
                onChange={handleInputChange}
              >
                <MenuItem value={"customer"}>Customer</MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
              </Select>
            ) : (
              role
            )}
          </Box>
          <Box className={classes.row}>
            <Typography style={{ marginRight: "8px" }} variant="caption">
              Approved Admin
            </Typography>
            {editable ? (
              <Select
                defaultValue={authorizedAdmin}
                name="authorizedAdmin"
                value={authorizedAdmin}
                onChange={handleApprovedChange}
              >
                <MenuItem value={"true"}>Approved</MenuItem>
                <MenuItem value={"false"}>Not approved</MenuItem>
              </Select>
            ) : (
              <Typography>{authorizedAdmin ? "true" : "false"}</Typography>
            )}
          </Box>
          {inputFields.map(({ name, value }) => {
            return (
              <Box className={classes.row}>
                <Typography
                  style={{ marginBottom: "4px", textTransform: "capitalize" }}
                  variant="caption"
                >
                  {name}
                </Typography>
                {editable ? (
                  <TextField
                    style={{ width: "auto" }}
                    variant="outlined"
                    margin="dense"
                    size="small"
                    name={name}
                    onChange={handleInputChange}
                    value={value}
                    autoFocus
                  />
                ) : (
                  value
                )}
              </Box>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: { width: "100%" },
    accRoot: { margin: "1rem 0" },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "12%",
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    saveButton: { whiteSpace: "nowrap" },
    details: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
    },
    row: {
      display: "flex",
      flexDirection: "column",
      padding: "0.5rem 0",
      width: "50%",
      minWidth: "250px",
      borderBottom: "1px solid #f3f3f3",
    },
    editBox: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

export default AdminUserItem;
