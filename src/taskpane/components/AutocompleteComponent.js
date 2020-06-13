import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useState, useEffect } from "react";
const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
    marginLeft: 8,
    marginTop: 8,
    "& > * + *": {
      marginTop: theme.spacing(1)
    },
    groupLabel: {
      fontSize: 30
    }
  },
  autocomplete: {
    groupLabel: {
      fontSize: 30
    }
  }
}));

export const AutocompleteComponent = props => {
  const [tags, setTags] = useState();
  const classes = useStyles();
  debugger;
  props.tags.tagdata = tags;

  console.log(tags);
  const renderGroup = params => [
    <ListSubheader key={params.key} component="div">
      {params.key}
    </ListSubheader>,
    params.children
  ];

  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.autocomplte}
        multiple
        id="autocomplete-tags"
        size="small"
        options={labels}
        onChange={(event, newValue) => {
          setTags(newValue);
        }}
        getOptionLabel={option => option.name}
        groupBy={option => option.color}
        renderInput={params => <TextField {...params} variant="outlined" label="Search Tags.." />}
      />
    </div>
  );
};

// const options = labels.map(option => {
//   const firstLetter = option.title[0].toUpperCase();
//   return {
//     firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
//     ...option
//   };
// });

const labels = [
  {
    name: "Primary Identfier: BL1229162",
    color: "BL1229162",
    description: ""
  },
  {
    name: "Description: TL 1L EUR",
    color: "BL1229162",
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
