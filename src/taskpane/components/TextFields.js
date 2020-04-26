import * as React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { useState, useEffect } from "react";
const useStyles = makeStyles(theme => ({
  textfield: {
    minWidth: 120,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  }
}));
const TextFields = props => {
  const classes = useStyles();
  const [textField, setTextField] = useState();
  const handleTextChange = event => {
    setTextField(event.target.value);
    props.contentObj.companyName = event.target.value;
  };
  return (
    <TextField
      onChange={handleTextChange}
      className={classes.textfield}
      size="small"
      required
      id="text-management-call"
      label="Enter Company Ticker"
    />
  );
};

export default TextFields;
