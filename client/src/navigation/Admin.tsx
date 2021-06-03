import React, { useContext } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Section from "../components/Section";
import AdminProducts from "./AdminProducts";
import AdminUsers from "../components/AdminUsers";
import AdminOrders from "../components/AdminOrders";
import { UsersContext } from "../components/context/UsersContext";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Admin() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const usersContext = useContext(UsersContext);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (usersContext.user?.authorizedAdmin) {
    return (
      <Section>
        <div className={classes.root}>
          <AppBar style={{ backgroundColor: "#333333" }} position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Products" {...a11yProps(0)} />
              <Tab label="Users" {...a11yProps(1)} />
              <Tab label="Orders" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <AdminProducts />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AdminUsers />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AdminOrders />
          </TabPanel>
        </div>
      </Section>
    );
  } else {
    return (
      <Section>
        <Typography>
          You do not have permissions to visit this page...
        </Typography>
      </Section>
    );
  }
}

export default Admin;
