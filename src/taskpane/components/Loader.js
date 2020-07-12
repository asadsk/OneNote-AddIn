import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  circular: {
    width: "100%",
    marginLeft: 110,
    marginTop: 35
    // '& > * + *': {
    //     marginTop: theme.spacing(2),
    // },
  },
  loaderMessage: {
    width: "100%",
    marginLeft: 100
  }
}));

export const Loader = props => {
  const classes = useStyles();

  let loader;
  if (props.type == "linear") {
    loader = <LinearProgress />;
  } else {
    loader = <CircularProgress className={classes.circular} color="primary" size="2rem" />;
  }

  return (
    <div>
      {loader}
      <Typography className={classes.loaderMessage} variant="caption">
        {" "}
        {props.loaderText}
      </Typography>
    </div>
  );
};

export default Loader;
