import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
    "& > * + *": {
      marginTop: theme.spacing(1)
    }
  },
  textfield: {}
}));

export const AutocompleteComponent = props => {
  const [tags, setTags] = useState();
  const classes = useStyles();
  debugger;
  props.tags.tagdata = tags;

  console.log(tags);

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="autocomplete-tags"
        size="small"
        options={labels}
        onChange={(event, newValue) => {
          setTags(newValue);
        }}
        getOptionLabel={option => option.name}
        renderInput={params => <TextField {...params} variant="outlined" label="Search Tags.." />}
      />
    </div>
  );
};

const labels = [
  {
    name: "#Security",
    color: "#7057ff",
    description: ""
  },
  {
    name: "#AssetType",
    color: "#008672",
    description: ""
  },
  {
    name: "#Industry",
    color: "#b60205",
    description: ""
  },
  {
    name: "#AAPL",
    color: "#d93f0b",
    description: ""
  },
  {
    name: "#JPN",
    color: "#0e8a16",
    description: ""
  },
  {
    name: "#BYN",
    color: "#fbca04",
    description: ""
  },
  {
    name: "#MSFT",
    color: "#fec1c1",
    description: ""
  },
  {
    name: "#AMZN",
    color: "#215cea",
    description: ""
  },
  {
    name: "#ConsumerGoods",
    color: "#cfd3d7",
    description: ""
  },
  {
    name: "#ConsumerElectronics",
    color: "#fef2c0",
    description: ""
  },
  {
    name: "InvestorReport",
    color: "#eeeeee",
    description: ""
  },
  {
    name: "CashProjection",
    color: "#d73a4a",
    description: "Cash related notes"
  },
  {
    name: "Sector",
    color: "#d4c5f9",
    description: "Sector Info"
  }
];

export default AutocompleteComponent;
