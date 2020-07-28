import * as React from "react";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import TemplateContent from "./TemplateContent";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { constants } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../actions";
import { userService } from "../../services";
import { Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles(theme => ({
  textfield: {
    minWidth: 120,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },
  formControl: {
    margin: theme.spacing(1),
    //marginLeft: theme.spacing(2),
    minWidth: 245,
    marginBottom: 0
  },
  button: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 16
  },
  templateContainer: {
    margin: theme.spacing(1)
  },

  selectEmpty: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },
  templateTypes: {
    height: 10,
    minHeight: 35
  },
  alert: {
    width: "100%"
  }
}));
const Template = props => {
  const classes = useStyles();
  const [type, setType] = useState();
  const [templates, setTemplates] = useState();
  const [templateFields, setTemplateFields] = useState();
  const [templateText, setTemplateText] = useState();
  const [alertState, setAlertState] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const tagState = useSelector(state => state.tags);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setAlertState(false);
  }

  async function handleChange(event) {
    if (event.target.value) {
      setDisabled(false);
    }
    const templateFields = await userService.getTemplateFields(event.target.value);
    setTemplateFields(templateFields);
    let templateTextFields = {};
    templateFields.forEach(element => {
      const templateName = element;
      templateTextFields[templateName] = "";
    });

    setTemplateText(templateTextFields);
    dispatch(userActions.saveTemplateFields(templateFields));
  }

  async function getAllTemplates() {
    const noteTemplates = await userService.getAllTemplates();
    setTemplates(noteTemplates);
    dispatch(userActions.loadAllNoteTemplates(noteTemplates));
  }

  const handleTextChange = event => {
    const textfield = event.target.id;
    const value = event.target.value;
    let text = [];
    text.push({ textfield: textfield, value: value });
    for (const field in templateText) {
      if (field == textfield) {
        templateText[field] = value;
      }
    }
    setTemplateText(templateText);
  };

  return (
    <div className={classes.templateContainer}>
      <Grid>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="noteTypeLabel">
            Select Note Type*
          </InputLabel>
          <Select
            value={type}
            onOpen={getAllTemplates}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
          >
            {templates &&
              templates.map(item => (
                <MenuItem className={classes.templateTypes} value={item.TemplateId}>
                  <Typography variant="body2">{item.TemplateName}</Typography>
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          {templateFields &&
            templateFields.map(field => (
              <React.Fragment>
                <TextField
                  onChange={handleTextChange}
                  className={classes.textfield}
                  size="small"
                  id={field}
                  helperText={"Enter " + field}
                />
              </React.Fragment>
            ))}
          {/* <Snackbar open={alertState} autoHideDuration={6000} onClose={handleClose}>
            <Alert className={classes.alert} onClose={handleClose} severity="error">
              Please fill all the required fields
            </Alert>
          </Snackbar> */}

          <Button
            disabled={disabled}
            type="submit"
            variant="outlined"
            color="primary"
            className={classes.button}
            //endIcon={<AddIcon />}
            onClick={click}
          >
            ADD TO NOTE
          </Button>
        </FormControl>
      </Grid>
    </div>
  );

  async function click() {
    await OneNote.run(async context => {
      // const textFieldEntries = Object.entries(templateText);
      // if (Object.keys(templateText).length > 0) {
      //   const values = Object.values(templateText);
      //   for (let index = 0; index < values.length; index++) {
      //     const element = values[index];
      //     // if (element == "") {
      //     //   setAlertState(true);
      //     //   return;
      //     // }
      //   }
      // }
      // Queue a command to add a page to the current section.
      var page = context.application.getActivePage();
      page.addOutline(40, 70, "<p></p>");
      return context.sync().then(function() {
        var pageContents = page.contents;

        // Queue a command to load the pageContents to access its data.
        context.load(pageContents);
        return context.sync().then(function() {
          if (pageContents.items.length != 0 && pageContents.items[0].type == "Outline") {
            // First item is an outline.
            var outline = pageContents.items[0].outline;
            Object.entries(templateText).map(field => {
              outline.appendHtml(
                "<table border='border-collapse'> \
                                    <tr> \
                                      <td style='border: 1px solid black;'><B><I> ##" +
                  field[0] +
                  ": </I></B></td> \
                                      <td style='border: 1px solid black;'>" +
                  field[1] +
                  "</td> \
                                    </tr> \
                                </table>"
              );
            });

            return context.sync();
          }
        });
      });
    }).catch(function(error) {
      console.log("Error: " + error);
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  }
};

export default Template;
