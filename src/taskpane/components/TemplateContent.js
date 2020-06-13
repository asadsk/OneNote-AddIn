import * as React from "react";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { purple } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles(theme => ({
  datePicker: {
    color: purple[600],
    minWidth: 120,
    marginTop: theme.spacing(0.5)
  },
  textfield: {
    minWidth: 120,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },
  checkbox: {
    fontSize: "0.8rem",
    lineHeight: 0.5
  },
  formLabel: {
    padding: theme.spacing(0.5)
  },
  paper: {
    padding: theme.spacing(0.5)
  }
}));
const TemplateContent = props => {
  const classes = useStyles();
  const [checkedAState, setcheckedAState] = useState(true);
  const [checkedBState, setcheckedBState] = useState(true);
  const [checkedAllState, setcheckedAllState] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [textField, setTextField] = useState();
  function handleDateChange(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var myDate = month + "/" + day + "/" + year;
    var period = Math.floor((date.getMonth() + 3) / 3);
    var financialDateObj = { date: myDate, period: period };
    props.contentObj.financialDate = financialDateObj;
  }
  const handleChange = event => {
    setTextField(event.target.value);
    props.contentObj.companyName = event.target.value;
  };

  const handleCheckboxAChange = event => {
    setcheckedAState(event.target.checked);
    props.contentObj.mandatoryOutlines.riskCommentary = event.target.checked;
  };
  const handleCheckboxBChange = event => {
    setcheckedBState(event.target.checked);
    props.contentObj.mandatoryOutlines.marketCommentary = event.target.checked;
  };
  //   const handleCheckboxAllChange = event => {
  //     setcheckedAllState(event.target.checked);
  //     setcheckedAState(event.target.checked);
  //     setcheckedBState(event.target.checked);
  //   };
  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          required
          className={classes.datePicker}
          variant="inline"
          margin="normal"
          id="date-picker-dialog"
          label="Select Financial Date"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={setSelectedDate}
          onAccept={date => handleDateChange(date)}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
      <TextField
        className={classes.textfield}
        size="small"
        required
        id="text-earnings-update"
        label="Enter Company Ticker"
        onChange={handleChange}
      />
      <Divider />
      <FormLabel className={classes.formLabel} component="legend">
        Mandatory Outlines
      </FormLabel>
      {/* <FormControlLabel
        className={classes.checkbox}
        control={
          <Checkbox
            checked={checkedAllState}
            size="small"
            onChange={handleCheckboxAllChange}
            name="checkedAll"
            color="primary"
          />
        }
        label="Select All"
      /> */}

      <FormControlLabel
        className={classes.checkbox}
        control={
          <Checkbox
            checked={checkedAState}
            size="small"
            onChange={handleCheckboxAChange}
            name="checkedA"
            color="primary"
          />
        }
        label="Risk Commentary"
      />
      <FormControlLabel
        className={classes.checkbox}
        control={
          <Checkbox
            checked={checkedBState}
            size="small"
            onChange={handleCheckboxBChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Market Commentary"
      />
      <Divider />
    </React.Fragment>
  );
};

export default TemplateContent;
