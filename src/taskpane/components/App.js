import * as React from "react";
import "date-fns";
import Template from "./Template";
import Tags from "./Tags";
import Typography from "@material-ui/core/Typography"
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TabPanel from "./Tab";
import SubTabPanel from "./SubTab";
import Chip from '@material-ui/core/Chip';
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
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { constants } from "../../constants";
import { Provider } from "react-redux"; //The entire app gets the access to store
import { store } from "./../../helpers";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from '../../actions';
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
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center"
    //overflow: "auto",
    //flexDirection: "column"
  },
  searchTagsPaper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    marginTop: theme.spacing(1),
    minHeight: 150
  },
  selectedTagsPaper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    marginTop: theme.spacing(1),
    maxHeight: 150,
    minHeight: 150,
    padding: 10
  },
  container: {
    alignItems: "center",
  },
  subtabs: {
    minHeight: 36,
    height: "fit-content"
  },

  tag: {
    marginTop: 3,
    height: 10,
    padding: '.15em 4px',
    fontWeight: 400,
    lineHeight: '10px',
    borderRadius: 2,
  },
  displayTags: {
    padding: "inherit",
    width: "fit-content"

  },
  chips: {
    height: 20
  }
}));
const App = props => {
  const [value, setValue] = useState(0);
  const [subTabValue, setSubTabValue] = useState(0);
  const [subTabText, setSubTabText] = useState();
  const [tags, setTags] = useState();

  const classes = useStyles();
  const dispatch = useDispatch();
  const tagState = useSelector(state => state.tags);

  const theme = useTheme();
  debugger;
  let loadedAssetTags;
  let loadedIssuerTags;
  let loadedStaticTags;
  debugger;
  if (tagState) {
    if (tagState.assetTags) {
      loadedAssetTags = tagState.assetTags
    }
    if (tagState.issuerTags) {
      loadedIssuerTags = tagState.issuerTags
    }
    if (tagState.staticTags) {
      loadedStaticTags = tagState.staticTags
    }
  }
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

  async function handleTabChange(event, newValue) {
    setValue(newValue);
    if (!loadedAssetTags || !loadedIssuerTags || !loadedStaticTags) {
      Promise.all([userService.getAllAssetTags(), userService.getAllIssuerTags(), userService.getAllStaticTags()])
        .then((responses) => {
          console.log("These are the promise all response" + responses);
          setTags(responses);
          dispatch(userActions.saveAssetTags(responses[0]));
          dispatch(userActions.saveIssuerTags(responses[1]));
          dispatch(userActions.saveStaticTags(responses[2]));
        });
    }
  };

  const handleDelete = (event) => {
    alert('delete');
  }

  const handleSubTabChange = (event, newValue) => {
    setSubTabValue(newValue);
    setSubTabText(event.target.textContent);
  }

  return (
    //<Provider store={store}>
    <MuiThemeProvider theme={themeObject}>
      <div className="ms-welcome">
        <Container className={classes.container}>
          {/* <Grid item xs={12} sm={6} alignItems="center" justify="center" direction="column"> */}
          <Paper className={classes.paper} elevation={3}>
            <React.Fragment>
              <AppBar position="static">
                <Tabs variant="fullWidth" value={value} onChange={handleTabChange} aria-label="simple tabs example">
                  <Tab label="Template" {...a11yProps(0)} />
                  <Tab label="Tags" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <Template />
              </TabPanel>
              <Divider />
              <TabPanel value={value} index={1}>
                <Tags tags={tags} />
              </TabPanel>
            </React.Fragment>
          </Paper>
          {/* </Grid> */}
        </Container>
      </div>
    </MuiThemeProvider>
    //</Provider >
  );
};


export default App;
