import * as React from "react";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import TemplateContent from "./TemplateContent";
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
import { userActions } from '../../actions';
import { userService } from "../../services";
import { Typography } from "@material-ui/core";
import { te } from "date-fns/locale";

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
        marginLeft: 88,
        marginRight: 88,
        marginTop: 8
    },
    templateContainer: {
        margin: theme.spacing(1)
    },

    selectEmpty: {
        marginTop: theme.spacing(0.5)
    },
    templateTypes: {
        height: 10,
        minHeight: 35
    }
}));
const Template = props => {
    const classes = useStyles();
    const [type, setType] = useState();
    const [noteType, setNoteType] = useState();
    const [templates, setTemplates] = useState();
    const [templateFields, setTemplateFields] = useState();
    const [templateText, setTemplateText] = useState();
    const [previousTemplate, setPreviousTemplate] = useState();
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
    const dispatch = useDispatch();
    const tagState = useSelector(state => state.tags);
    // useEffect(() => {
    //     debugger;
    //     const noteTemplates = tagState && tagState.noteTemplates;
    //     setTemplates(noteTemplates);
    // });
    async function handleChange(event) {
        const templateFields = await userService.getTemplateFields(event.target.value);
        setTemplateFields(templateFields);
        let templateTextFields = {};
        templateFields.forEach(element => {
            const templateName = element
            templateTextFields[templateName] = ""
        });
        console.log(templateTextFields);

        setTemplateText(templateTextFields);
        console.log(templateFields);
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
        let text = []
        text.push({ textfield: textfield, value: value });
        for (const field in templateText) {
            if (field == textfield) {
                templateText[field] = value;
            }
        }
        setTemplateText(templateText);
        // if (previousTemplate) {
        //     setTemplateText(templateText => ({ ...templateText, templateInfo: previousTemplate.concat(text) }));
        //     setPreviousTemplate(templateInfo.previousTemplate);
        // }
        // else {
        //     setTemplateText(templateText => ({ ...templateText, templateInfo: text }));
        //     setPreviousTemplate(templateInfo.previousTemplate);
        // }
        // console.log(templateText);
        //setContentObj(contentObj => ({ ...contentObj, companyName: event.target.value }));
    };

    return (
        <div className={classes.templateContainer}>
            <FormControl className={classes.formControl}>
                <InputLabel shrink id="noteTypeLabel">
                    Select Note Type*
                </InputLabel>
                <Select value={type} onOpen={getAllTemplates} onChange={handleChange} displayEmpty className={classes.selectEmpty}>
                    {templates && templates.map(item =>
                        <MenuItem className={classes.templateTypes} value={item.TemplateId}>
                            <Typography variant="body2">{item.TemplateName}</Typography>
                        </MenuItem>
                    )
                    }
                    {/* <MenuItem value="earningsUpdate">Earnings Update</MenuItem>
                    <MenuItem value="generalNews">General News</MenuItem>
                    <MenuItem value="managementCall">Management Call</MenuItem> */}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                {
                    templateFields && templateFields.map(field =>
                        <TextField
                            onChange={handleTextChange}
                            className={classes.textfield}
                            size="small"
                            required
                            id={field}
                            label={"Enter " + field}
                        />
                    )
                }
            </FormControl>
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
        </div>
    )


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
            // templateText.templateInfo.forEach(x => )
            // var date = contentObj.financialDate.date;
            // var period = "Q" + contentObj.financialDate.period;
            // if (!date) {
            //     var today = new Date();
            //     var day = today.getDate();
            //     var month = today.getMonth() + 1;
            //     var year = today.getFullYear();
            //     date = month + "/" + day + "/" + year;
            //     period = "Q" + Math.floor((today.getMonth() + 3) / 3);
            // }

            // var companyName = contentObj.companyName;
            // var riskCommentary = contentObj.mandatoryOutlines.riskCommentary;
            // var marketCommentary = contentObj.mandatoryOutlines.marketCommentary;
            // var items = [
            //   ["Financial Date:", date],
            //   ["Period:", period]
            // ];
            // firstParagraph.insertTableAsSibling("Before", 2, 2, items);

            //console.log(tags);
            page.addOutline(40, 70, "<p></p>");
            return context.sync().then(function () {
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
                return context.sync().then(function () {
                    if (pageContents.items.length != 0 && pageContents.items[0].type == "Outline") {
                        // First item is an outline.
                        var outline = pageContents.items[0].outline;

                        // Queue a command to append a paragraph to the outline.
                        //outline.appendHtml("<p>new paragraph</p>");
                        const entries = Object.entries(templateText);
                        for (const values in entries) {
                            outline.appendHtml(
                                "<table border='border-collapse'> \
            <tr> \
              <td style='border: 1px solid black;'><B><I> ##"+ values[0] + ": </I></B></td> \
              <td style='border: 1px solid black;'>" +
                                values[1] +
                                "</td> \
            </tr> \
            </table>"
                            );
                        }
                        //                 if (type === "earningsUpdate") {
                        //                     outline.appendHtml(
                        //                         "<table border='border-collapse'> \
                        //     <tr> \
                        //       <td style='border: 1px solid black;'><B><I>##Financial Date: </I></B></td> \
                        //       <td style='border: 1px solid black;'>" +
                        //                         date +
                        //                         "</td> \
                        //     </tr> \
                        //     <tr> \
                        //       <td style='border: 1px solid black;'><B><I>##Period: </I></B></td> \
                        //       <td style='border: 1px solid black;'>" +
                        //                         period +
                        //                         "</td> \
                        //     </tr> \
                        //     <tr> \
                        //       <td style='border: 1px solid black;'><B><I>##Company: </I></B></td> \
                        //       <td style='border: 1px solid black;'>" +
                        //                         companyName +
                        //                         "</td> \
                        //     </tr> \
                        //   </table>"
                        //                     );
                        //                     if (riskCommentary && marketCommentary) {
                        //                         page.addOutline(
                        //                             40,
                        //                             160,
                        //                             "<table border='border-collapse'> \
                        //       <tr> \
                        //           <td style='border: 1px solid black;'><B><I>##Risk Commentary: </I></B></td> \
                        //           <td style='border: 1px solid black;'></td> \
                        //         </tr> \
                        //         </table>"
                        //                         );
                        //                         page.addOutline(
                        //                             40,
                        //                             220,
                        //                             "<table border='border-collapse'> \
                        //         <tr> \
                        //         <td style='border: 1px solid black;'><B><I>##Market Commentary: </I></B></td> \
                        //         <td style='border: 1px solid black;'></td> \
                        //       </tr> \
                        //       </table>"
                        //                         );
                        //                     }
                        //                     if (riskCommentary && !marketCommentary) {
                        //                         page.addOutline(
                        //                             40,
                        //                             160,
                        //                             "<table border='border-collapse'> \
                        //       <tr> \
                        //           <td style='border: 1px solid black;'><B><I>##Risk Commentary: </I></B></td> \
                        //           <td style='border: 1px solid black;'></td> \
                        //         </tr> \
                        //       </table>"
                        //                         );
                        //                     }
                        //                     if (!riskCommentary && marketCommentary) {
                        //                         page.addOutline(
                        //                             40,
                        //                             160,
                        //                             "<table border='border-collapse'> \
                        //       <tr> \
                        //           <td style='border: 1px solid black;'><B><I>##Market Commentary: </I></B></td> \
                        //           <td style='border: 1px solid black;'></td> \
                        //         </tr> \
                        //       </table>"
                        //                         );
                        //                     }
                        //                 } else if (type === "managementCall") {
                        //                     outline.appendHtml(
                        //                         "<table border='border-collapse'> \
                        //     <tr> \
                        //         <td style='border: 1px solid black;'><B><I>##Company: </I></B></td> \
                        //         <td style='border: 1px solid black;'>" +
                        //                         companyName +
                        //                         "</td> \
                        //       </tr> \
                        //     </table>"
                        //                     );
                        //                 } else if(){
                        //                     outline.appendHtml(
                        //                         "<table border='border-collapse'> \
                        //     <tr> \
                        //         <td style='border: 1px solid black;'><B><I>##Company: </I></B></td> \
                        //         <td style='border: 1px solid black;'>" +
                        //                         companyName +
                        //                         "</td> \
                        //       </tr> \
                        //     </table>"
                        //                     );
                        //                 }

                        return context.sync();
                    }
                    //   });
                    // });
                });
            });
        }).catch(function (error) {
            console.log("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    }
}


export default Template;