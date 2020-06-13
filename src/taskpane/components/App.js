import * as React from "react";
import "date-fns";
import Autocomplete from "./Autocomplete"; //Other autocomplete component
import AutocompleteComponent from "./AutocompleteComponent";
import Template from "./Template"
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TabPanel from "./Tab";
import SubTabPanel from "./SubTab";
import DateFnsUtils from "@date-io/date-fns";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import { purple } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import { Tabs, Tab, Divider } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { userService } from "../../services"
import { makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { constants } from "../../constants";
//import Progress from "./Progress";
/* global Button, Header, HeroList, HeroListItem, Progress */

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

SubTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const themeObject = createMuiTheme({
  typography: {
    fontFamily: "Raleway, Arial"
  },
  palette: {
    primary: { main: purple[700], light: purple[100], dark: purple[800] },
    secondary: {
      main: purple[200],
      light: purple[50],
      dark: purple[400]
    },
    type: "light"
  }
});

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 245,
    marginBottom: 0
  },
  tagButton: {
    marginLeft: 76,
    marginRight: 44,
    marginTop: 8
  },
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  container: {
    alignItems: "center"
  },
  subtabs: {
    minHeight: 36
  }
}));
const App = props => {
  const [value, setValue] = useState(0);
  const [subTabValue, setsubTabValue] = useState(0);
  const [tags, setTags] = useState({
    tagdata: []
  });

  const classes = useStyles();
  // if (!props.isOfficeInitialized) {
  //   return (
  //     <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
  //   );
  // }

  async function clickTags() {
    debugger;
    await OneNote.run(async context => {
      // var topMargin;
      // if (type === "earningsUpdate") {
      //   topMargin = 120;
      // } else if (type === "managementCall") {
      //   topMargin = 60;
      // } else if ((type = "generalNews")) {
      //   topMargin = 60;
      // }
      var page = context.application.getActivePage();
      var tagString = "";
      tags.tagdata.forEach(function (entry) {
        tagString += "<p><B><I>" + entry.name + "</B></I></p>";
      });
      var table = "<p></p>";
      page.addOutline(520, 0, tagString);
    }).catch(function (error) {
      console.log("Error: " + error);
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  }

  function handleSubtypeChange() {
    setSubType(event.target.value);
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  function a11ySubTabProps(index) {
    return {
      id: `simple-subtab-${index}`,
      "aria-controls": `simple-subtabpanel-${index}`
    };
  }

  const handleTabChange = (event, newValue) => {
    debugger;
    setValue(newValue);
  };

  const handleSubTabChange = (event, newValue) => {
    //alert('I am in');
    debugger;
    if (event.target.textContent == constants.ASSET_TAB) {
      console.log(event.target.textContent)
    }
    setsubTabValue(newValue);
  };

  return (
    <MuiThemeProvider theme={themeObject}>
      <div className="ms-welcome">
        <Container className={classes.container}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} elevation={3}>
              <React.Fragment>
                <AppBar position="static">
                  <Tabs variant="fullWidth" value={value} onChange={handleTabChange} aria-label="simple tabs example">
                    <Tab label="Template" {...a11yProps(0)} />
                    <Tab label="Tags" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  {Template}
                </TabPanel>
                <Divider />
                <TabPanel value={value} index={1}>
                  <Tabs
                    //orientation="vertical"
                    variant="fullWidth"
                    value={subTabValue}
                    onChange={handleSubTabChange}
                    aria-label="tags subtabs"
                    indicatorColor="primary"
                  //className={classes.tagsPanel}
                  >
                    <Tab disableRipple className={classes.subtabs} label="Static" {...a11ySubTabProps(0)} />
                    <Tab disableRipple className={classes.subtabs} label="Issuer" {...a11ySubTabProps(1)} />
                    <Tab disableRipple className={classes.subtabs} label="Asset" {...a11ySubTabProps(2)} />
                  </Tabs>
                  <SubTabPanel value={subTabValue} index={0}>
                    <AutocompleteComponent tags={tags} />
                  </SubTabPanel>
                  <SubTabPanel value={subTabValue} index={1}>
                    <AutocompleteComponent tags={tags} />
                  </SubTabPanel>
                  <SubTabPanel value={subTabValue} index={2}>
                    <AutocompleteComponent tags={tags} />
                  </SubTabPanel>

                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    className={classes.tagButton}
                    endIcon={<AddIcon />}
                    onClick={clickTags}
                  >
                    ADD TAGS
                  </Button>
                </TabPanel>
              </React.Fragment>
            </Paper>
          </Grid>
        </Container>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
