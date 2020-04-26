import * as React from "react";
import "date-fns";
import Autocomplete from "./Autocomplete";
import AutocompleteComponent from "./AutocompleteComponent";
import Template from "./Template";
import TextFields from "./TextFields";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TabPanel from "./Tab";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import { purple } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { Tabs, Tab } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
//import Progress from "./Progress";
/* global Button, Header, HeroList, HeroListItem, Progress */

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const themeObject = createMuiTheme({
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
  selectEmpty: {
    marginTop: theme.spacing(0.5)
  },
  button: {
    marginLeft: 88,
    marginRight: 88,
    marginTop: 8
  },
  tagButton: {
    marginLeft: 63,
    marginRight: 44,
    marginTop: 8
  },
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  datePicker: {
    color: purple[600],
    minWidth: 120,
    marginTop: theme.spacing(0.5)
  },
  textfield: {
    minWidth: 120,
    marginTop: theme.spacing(1)
  },
  container: {
    alignItems: "center"
  },
  checkbox: {
    fontSize: "0.8rem"
  }
}));
const App = props => {
  const [type, setType] = useState();
  const [value, setValue] = useState(0);
  const [noteType, setNoteType] = useState();
  const [contentObj, setContentObj] = useState({
    financialDate: {
      date: "",
      period: ""
    },
    companyName: "",
    mandatoryOutlines: {
      riskCommentary: true,
      marketCommentary: true
    }
  });
  const [tags, setTags] = useState({
    tagdata: []
  });

  function handleDateChange(date) {
    debugger;
    //setSelectedDate(value);
    console.log(selectedDate);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var myDate = month + "/" + day + "/" + year;
    var period = Math.floor((date.getMonth() + 3) / 3);
    var financialDateObj = { date: myDate, period: period };
    setContentObj(content => ({ ...content, financialDate: financialDateObj }));
  }
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
      tags.tagdata.forEach(function(entry) {
        tagString += "<p><B><I>" + entry.name + "</B></I></p>";
      });
      var table = "<p></p>";
      page.addOutline(520, 0, tagString);
    }).catch(function(error) {
      console.log("Error: " + error);
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  }
  async function click() {
    await OneNote.run(async context => {
      // Queue a command to add a page to the current section.
      var section = context.application.getActiveSection();
      var page = context.application.getActivePage();
      // var pageContents = context.application.getActivePageOrNull().contents;
      // var pageContent = pageContents.getItem(0);
      // if (pageContent.outline) {
      //   var paragraphs = pageContent.outline.paragraphs;
      // }
      //var firstParagraph = paragraphs.items[0];

      var date = contentObj.financialDate.date;
      var period = "Q" + contentObj.financialDate.period;
      if (!date) {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        date = month + "/" + day + "/" + year;
        period = "Q" + Math.floor((today.getMonth() + 3) / 3);
      }

      var companyName = contentObj.companyName;
      var riskCommentary = contentObj.mandatoryOutlines.riskCommentary;
      var marketCommentary = contentObj.mandatoryOutlines.marketCommentary;
      // var items = [
      //   ["Financial Date:", date],
      //   ["Period:", period]
      // ];
      // firstParagraph.insertTableAsSibling("Before", 2, 2, items);

      console.log(tags);
      page.addOutline(40, 70, "<p></p>");
      return context.sync().then(function() {
        var pageContents = page.contents;

        // Queue a command to load the pageContents to access its data.
        context.load(pageContents);
        // return context.sync().then(function() {
        //   if (pageContents.items.length != 0) {
        //     pageContents.items[0].delete();
        //   }
        //   context.load(pageContents);
        //   return context.sync().then(function() {
        //     if (pageContents.items.length == 0) {
        //       page.addOutline(40, 70, "<p></p>");
        //     }
        //     var newContent = page.contents;
        //     context.load(newContent);
        return context.sync().then(function() {
          if (pageContents.items.length != 0 && pageContents.items[0].type == "Outline") {
            // First item is an outline.
            var outline = pageContents.items[0].outline;

            // Queue a command to append a paragraph to the outline.
            //outline.appendHtml("<p>new paragraph</p>");

            if (type === "earningsUpdate") {
              outline.appendHtml(
                "<table border='border-collapse'> \
            <tr> \
              <td style='border: 1px solid black;'><B><I>##Financial Date: </I></B></td> \
              <td style='border: 1px solid black;'>" +
                  date +
                  "</td> \
            </tr> \
            <tr> \
              <td style='border: 1px solid black;'><B><I>##Period: </I></B></td> \
              <td style='border: 1px solid black;'>" +
                  period +
                  "</td> \
            </tr> \
            <tr> \
              <td style='border: 1px solid black;'><B><I>##Company: </I></B></td> \
              <td style='border: 1px solid black;'>" +
                  companyName +
                  "</td> \
            </tr> \
          </table>"
              );
              if (riskCommentary && marketCommentary) {
                page.addOutline(
                  40,
                  160,
                  "<table border='border-collapse'> \
              <tr> \
                  <td style='border: 1px solid black;'><B><I>##Risk Commentary: </I></B></td> \
                  <td style='border: 1px solid black;'></td> \
                </tr> \
                </table>"
                );
                page.addOutline(
                  40,
                  220,
                  "<table border='border-collapse'> \
                <tr> \
                <td style='border: 1px solid black;'><B><I>##Market Commentary: </I></B></td> \
                <td style='border: 1px solid black;'></td> \
              </tr> \
              </table>"
                );
              }
              if (riskCommentary && !marketCommentary) {
                page.addOutline(
                  40,
                  160,
                  "<table border='border-collapse'> \
              <tr> \
                  <td style='border: 1px solid black;'><B><I>##Risk Commentary: </I></B></td> \
                  <td style='border: 1px solid black;'></td> \
                </tr> \
              </table>"
                );
              }
              if (!riskCommentary && marketCommentary) {
                page.addOutline(
                  40,
                  160,
                  "<table border='border-collapse'> \
              <tr> \
                  <td style='border: 1px solid black;'><B><I>##Market Commentary: </I></B></td> \
                  <td style='border: 1px solid black;'></td> \
                </tr> \
              </table>"
                );
              }
            } else if (type === "managementCall") {
              outline.appendHtml(
                "<table border='border-collapse'> \
            <tr> \
                <td style='border: 1px solid black;'><B><I>##Company: </I></B></td> \
                <td style='border: 1px solid black;'>" +
                  companyName +
                  "</td> \
              </tr> \
            </table>"
              );
            } else {
              outline.appendHtml(
                "<table border='border-collapse'> \
            <tr> \
                <td style='border: 1px solid black;'><B><I>##Company: </I></B></td> \
                <td style='border: 1px solid black;'>" +
                  companyName +
                  "</td> \
              </tr> \
            </table>"
              );
            }

            return context.sync();
          }
          //   });
          // });
        });
      });
    }).catch(function(error) {
      console.log("Error: " + error);
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  }
  function handleChange(event) {
    setType(event.target.value);
    if (event.target.value === "earningsUpdate") {
      setNoteType(<Template contentObj={contentObj} />);
    } else if (event.target.value === "managementCall") {
      setNoteType(
        <TextField
          onChange={handleTextChange}
          className={classes.textfield}
          size="small"
          required
          id="text-management-call"
          label="Enter Agenda"
        />
      );
    } else {
      setNoteType(<TextFields contentObj={contentObj} />);
    }
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

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTextChange = event => {
    debugger;
    setContentObj(contentObj => ({ ...contentObj, companyName: event.target.value }));
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
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink id="noteTypeLabel">
                      Select Note Type*
                    </InputLabel>
                    <Select value={type} onChange={handleChange} displayEmpty className={classes.selectEmpty}>
                      <MenuItem value="earningsUpdate">Earnings Update</MenuItem>
                      <MenuItem value="generalNews">General News</MenuItem>
                      <MenuItem value="managementCall">Management Call</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>{noteType}</FormControl>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    endIcon={<AddIcon />}
                    onClick={click}
                  >
                    ADD
                  </Button>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <AutocompleteComponent tags={tags} />
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
