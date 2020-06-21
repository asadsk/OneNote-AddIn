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
        //margin: "auto",
        //margin: theme.spacing(1),
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
        width: "84%",
        minHeight: 150,
        padding: 5
    },
    selectedTagsPaper: {
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        width: "84%",
        marginTop: theme.spacing(1),
        maxHeight: 150,
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
        height: 20
    }
}));




const Tags = props => {

    const [value, setValue] = useState(0);
    const [subTabValue, setSubTabValue] = useState(0);
    const [subTabText, setSubTabText] = useState();
    const [tags, setTags] = useState({
        tagdata: []
    });

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
    }
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

    const handleDelete = (event) => {
        alert('delete');
    }

    const handleSubTabChange = (event, newValue) => {
        setSubTabValue(newValue);
        setSubTabText(event.target.textContent);
    }

    return (
        <React.Fragment>
            <Paper className={classes.searchTagsPaper} elevation={5}>
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
            <Paper className={classes.selectedTagsPaper} elevation={5}>
                <Typography variant="caption">Selected Tags: </Typography>
                <div className={classes.displayTags}>
                    {
                        tagState.savedTags && tagState.savedTags.map((tag) =>
                            <Chip size="small" label={tag.UniqueIdentifier + '-' + tag.TagName} onDelete={handleDelete} color="primary" variant="outlined" />
                        )
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