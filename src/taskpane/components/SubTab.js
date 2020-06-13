import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        padding: 8
    }
}));
const SubTabPanel = props => {
    const classes = useStyles();
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="subtabpanel"
            hidden={value !== index}
            id={`simple-subtabpanel-${index}`}
            aria-labelledby={`simple-subtab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className={classes.root} p={3}>
                    {children}
                </Box>
            )}
        </Typography>
    );
};

export default SubTabPanel;
