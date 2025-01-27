import * as React from "react";
import "date-fns";
import Autocomplete from "./Autocomplete"; //Other autocomplete component
import AutocompleteComponent from "./AutocompleteComponent";
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TabPanel from "./Tab";
import SubTabPanel from "./SubTab";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Loader from "./Loader";
import { purple } from "@material-ui/core/colors";
import { Tabs, Tab, Divider } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { userService } from "../../services";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { constants } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../actions";
import $ from "jquery";
//import 'core-js/es/array'
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
    marginTop: theme.spacing(1)
  },
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  searchTagsPaper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    marginTop: theme.spacing(1),
    minHeight: 150,
    padding: 5
  },
  selectedTagsPaper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    marginTop: theme.spacing(1),
    minHeight: 150,
    padding: 5
  },
  container: {
    alignItems: "center"
  },
  subtabs: {
    minHeight: 36,
    height: "fit-content"
  },

  tag: {
    marginTop: 3,
    height: 10,
    padding: ".15em 4px",
    fontWeight: 400,
    lineHeight: "10px",
    borderRadius: 2
  },
  displayTags: {
    padding: "inherit",
    width: "fit-content",
    minWidth: "-webkit-fill-available"
  },
  chips: {
    height: 20,
    fontSize: 12,
    margin: 2
  },
  tagsPaper: {
    margin: 2,
    padding: 5
  },
  groupChip: {
    height: 20,
    fontSize: 12,
    display: "block",
    width: "fit-content"
  }
}));

const Tags = props => {
  const [value, setValue] = useState(0);
  const [subTabValue, setSubTabValue] = useState(0);
  const [subTabText, setSubTabText] = useState("Static");
  const [tags, setTags] = useState({
    tagdata: []
  });
  const [savedTags, setSavedTags] = useState([]);
  const [tagsSaved, setTagsSaved] = useState(false);
  const [selectedTagsState, setSelectedTagsState] = useState();
  const [deleteClicked, setDeleteClicked] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();
  const tagState = useSelector(state => state.tags);
  const theme = useTheme();
  let loadedAssetTags;
  let loadedIssuerTags;
  let loadedStaticTags;
  const selectedTags = tagState.savedTags;
  let templateId = tagState.templateId;
  const groupedTags = selectedTags && groupBy(selectedTags, "UniqueIdentifier");

  function groupBy(array, key) {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  }

  let loaderComponent;
  if (selectedTagsState) {
    loaderComponent = loaderComponent = (
      <Loader type="circular" loaderText={deleteClicked ? "Deleting note from RMS.." : "Pushing note to RMS..."} />
    );
  }

  const handleDelete = tag => {
    for (let index = 0; index < selectedTags.length; index++) {
      const element = selectedTags[index];
      if (element == tag.tag) {
        selectedTags.splice(index, 1);
      }
    }
    dispatch(userActions.storeSavedTags(selectedTags));
  };

  if (tagState && !tagsSaved) {
    if (tagState.assetTags) {
      loadedAssetTags = tagState.assetTags;
    } else {
      loadedAssetTags = props.tags && props.tags[0];
    }
    if (tagState.issuerTags) {
      loadedIssuerTags = tagState.issuerTags;
    } else {
      loadedIssuerTags = props.tags && props.tags[1];
    }
    if (tagState.staticTags) {
      loadedStaticTags = tagState.staticTags;
    } else {
      loadedStaticTags = props.tags && props.tags[2];
    }
    // if (tagState.selectedAssetTags) {
    //     tagState.selectedAssetTags.forEach(x => selectedTags.push(x));
    // }
    // if (tagState.selectedIssuerTags) {
    //     tagState.selectedIssuerTags.forEach(x => selectedTags.push(x));
    // }
    // if (tagState.selectedStaticTags) {
    //     tagState.selectedStaticTags.forEach(x => selectedTags.push(x));
    // }
    //setSavedTags(selectedTags);
  } else {
    //selectedTags = savedTags;
  }

  async function clickTags() {
    setSelectedTagsState(true);
    let noteId;
    let webUrl;
    let title;
    await OneNote.run(async context => {
      const page = context.application.getActivePage();
      page.load("webUrl");
      page.load("title");
      const restApiId = page.getRestApiId();
      return context.sync().then(function() {
        webUrl = page.webUrl;
        title = page.title;
        noteId = restApiId.value;
      });
    }).catch(function(error) {
      console.log("Error: " + error);
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
    noteId = noteId.replace(/[{}]/g, "");
    selectedTags && selectedTags.forEach(x => (x.NoteId = noteId));
    //await userService.saveTemplateNoteMap(templateId, noteId);
    if (!templateId) {
      templateId = 3;
    }
    const savedNoteTags = await userService.SaveNoteInfo(selectedTags, webUrl, title, noteId, templateId);
    dispatch(userActions.storeSavedTags(JSON.parse(savedNoteTags)));
    setSavedTags(JSON.parse(savedNoteTags));
    setTagsSaved(true);
    setSelectedTagsState(false);
  }

  async function deleteNote() {
    setDeleteClicked(true);
    setSelectedTagsState(true);
    let noteId;
    await OneNote.run(async context => {
      const page = context.application.getActivePage();
      const restApiId = page.getRestApiId();
      return context.sync().then(function() {
        noteId = restApiId.value;
      });
    }).catch(function(error) {
      console.log("Error: " + error);
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
    noteId = noteId.replace(/[{}]/g, "");
    userService.deleteNoteFromRMS(noteId).then(() => {
      dispatch(userActions.storeSavedTags(null));
      setSavedTags(null);
      setSelectedTagsState(false);
      setDeleteClicked(false);
    });
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

  const handleSubTabChange = (event, newValue) => {
    setSubTabValue(newValue);
    setSubTabText(event.target.textContent);
  };

  return (
    <React.Fragment>
      <Paper className={classes.searchTagsPaper} elevation={3}>
        <Tabs
          //orientation="vertical"
          variant="fullWidth"
          value={subTabValue}
          onChange={handleSubTabChange}
          aria-label="tags subtabs"
          indicatorColor="primary"
          //className={classes.tagsPanel}
        >
          <Tab disableRipple label="Static" {...a11ySubTabProps(0)} />
          <Tab disableRipple label="Issuer" {...a11ySubTabProps(1)} />
          <Tab disableRipple label="Asset" {...a11ySubTabProps(2)} />
        </Tabs>
        <Divider />
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={subTabValue}
          //onChangeIndex={handleSubTabChange}
        >
          <SubTabPanel value={subTabValue} index={0} dir={theme.direction}>
            <AutocompleteComponent tags={tags} subTab={subTabText} />
          </SubTabPanel>
          <SubTabPanel value={subTabValue} index={1} dir={theme.direction}>
            <AutocompleteComponent tags={tags} subTab={subTabText} />
          </SubTabPanel>
          <SubTabPanel value={subTabValue} index={2} dir={theme.direction}>
            <AutocompleteComponent tags={tags} subTab={subTabText} />
          </SubTabPanel>
        </SwipeableViews>
      </Paper>
      <Paper className={classes.selectedTagsPaper} elevation={3}>
        <Typography variant="caption">Selected Tags: </Typography>
        {loaderComponent}
        {!selectedTagsState && (
          <div className={classes.displayTags}>
            {groupedTags &&
              Object.keys(groupedTags).map((item, index) => (
                <Paper className={classes.tagsPaper} elevation={3}>
                  <Chip className={classes.groupChip} size="small" color="primary" label={item} />
                  {Object.values(groupedTags)[index].map(tag => (
                    <Chip
                      size="small"
                      className={classes.chips}
                      name={tag}
                      label={
                        tag.Attribute == "" || tag.IsDynamic == false ? tag.TagName : tag.Attribute + ": " + tag.TagName
                      }
                      onDelete={handleDelete.bind(this, { tag })}
                      //color="primary"
                      // variant="outlined"
                    />
                  ))}
                </Paper>
              ))}
          </div>
        )}
      </Paper>
      <Grid container justify="center">
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          disabled={tagState.pushNotesButtonState}
          className={classes.tagButton}
          endIcon={<SendIcon />}
          onClick={clickTags}
        >
          PUSH TO RMS
        </Button>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          disabled={tagState.pushNotesButtonState}
          className={classes.tagButton}
          endIcon={<DeleteForeverIcon />}
          onClick={deleteNote}
        >
          DELETE FROM RMS
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Tags;
