import * as React from "react";
import "date-fns";
import Autocomplete from "./Autocomplete"; //Other autocomplete component
import AutocompleteComponent from "./AutocompleteComponent";
import SwipeableViews from 'react-swipeable-views';
import Typography from "@material-ui/core/Typography"
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TabPanel from "./Tab";
import SubTabPanel from "./SubTab";
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip';
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import { purple } from "@material-ui/core/colors";
import { Tabs, Tab, Divider } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { userService } from "../../services"
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { constants } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from '../../actions';
import $ from 'jquery';
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
        marginLeft: 56,
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
        height: 20,
        fontSize: 12
    }
}));




const Tags = props => {

    const [value, setValue] = useState(0);
    const [subTabValue, setSubTabValue] = useState(0);
    const [subTabText, setSubTabText] = useState();
    const [activePage, setActivePage] = useState();
    const [tags, setTags] = useState({
        tagdata: []
    });
    const [savedTags, setSavedTags] = useState([]);
    const [tagsSaved, setTagsSaved] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const tagState = useSelector(state => state.tags);
    const theme = useTheme();
    const chipBox = {
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        //marginTop: 2
        //style: { width: '5rem', height: '5rem' }
    }
    let loadedAssetTags;
    let loadedIssuerTags;
    let loadedStaticTags;
    const selectedTags = tagState.savedTags;

    const groupedTags = selectedTags && groupBy(selectedTags, 'UniqueIdentifier');
    console.log(groupedTags);
    function groupBy(array, key) {
        // Return the end result
        return array.reduce((result, currentValue) => {
            // If an array already present for key, push it to the array. Else create an array and push the object
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
            return result;
        }, {}); // empty object is the initial value for result object
    };
    /* Use Effect to update the active page state */
    useEffect(() => {
        console.log("Active Page: " + activePage);
    }, [OneNote.run(async context => {
        const page = context.application.getActivePage();
        const restApiId = page.getRestApiId();
        return context.sync().then(function () {
            setActivePage(restApiId.value)
            return restApiId.value;
        });
    }).catch(function (error) {
        console.log("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    })]);

    if (tagState && !tagsSaved) {
        if (tagState.assetTags) {
            loadedAssetTags = tagState.assetTags
        }
        else {
            loadedAssetTags = props.tags && props.tags[0];
        }
        if (tagState.issuerTags) {
            loadedIssuerTags = tagState.issuerTags
        }
        else {
            loadedIssuerTags = props.tags && props.tags[1];
        }
        if (tagState.staticTags) {
            loadedStaticTags = tagState.staticTags
        }
        else {
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
    }
    else {
        //selectedTags = savedTags;
    };

    async function clickTags() {
        let noteId;
        await OneNote.run(async context => {

            const page = context.application.getActivePage();
            const restApiId = page.getRestApiId();
            return context.sync().then(function () {
                noteId = restApiId.value;
            });
        }).catch(function (error) {
            console.log("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
        noteId = noteId.replace(/[{}]/g, "");
        selectedTags && selectedTags.forEach(x => x.NoteId = noteId);
        const savedNoteTags = await userService.saveTags(selectedTags);
        dispatch(userActions.storeSavedTags(savedNoteTags));
        setSavedTags(JSON.parse(savedNoteTags));
        setTagsSaved(true);
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

    const handleDelete = tag => {
        for (let index = 0; index < selectedTags.length; index++) {
            const element = selectedTags[index];
            if (element == tag.tag) {
                selectedTags.splice(index, 1);
            }
        };
        dispatch(userActions.storeSavedTags(selectedTags));
    }

    const handleSubTabChange = (event, newValue) => {
        setSubTabValue(newValue);
        setSubTabText(event.target.textContent);
    }

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
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
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
                <div className={classes.displayTags}>
                    {
                        // Object.keys(myObject).map(function (key, index) {
                        //     myObject[key] *= 2;
                        // });
                        groupedTags && Object.keys(groupedTags).map(function (key, index) {
                            <Box borderColor="primary.main" className={classes.chipBox} {...chipBox}>
                                <Typography variant="caption">{key}</Typography>
                                {
                                    // groupedTags[key].map((tag) =>

                                    //     <Chip size="small"
                                    //         className={classes.chips}
                                    //         name={tag}
                                    //         label={tag.Attribute + '-' + tag.TagName}
                                    //         onDelete={handleDelete.bind(this, { tag })}
                                    //         //color="primary"
                                    //         variant="outlined" />
                                    // )
                                }
                            </Box>
                        })
                    }
                </div>
            </Paper>
            <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.tagButton}
                endIcon={<AddIcon />}
                onClick={clickTags}
            >
                PUSH TO RMS
                  </Button>
        </React.Fragment >
    )


}

export default Tags;