import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useState, useEffect } from "react";
import { constants } from "../../constants";
const useStyles = makeStyles(theme => ({
  root: {
    width: 230,
    marginLeft: 16,
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
  },
  typography: {
    subtitle1: {
      fontSize: 12,
    }
  }
}));

export const AutocompleteComponent = props => {
  const [tags, setTags] = useState();
  //const [tagData, setTagData] = useState();
  const classes = useStyles();
  const theme = useTheme();
  debugger;
  props.tags.tagdata = tags;
  //setTagData(props.tagData);
  let tagData = props.tagData;
  const subTab = props.subTab
  let autocomplete;
  if (!tagData) {
    tagData = dummy;
  }
  if (subTab) {
    if (subTab == constants.ASSET_TAB) {
      autocomplete = <Autocomplete
        className={classes.autocomplte}
        id="autocomplete-tags"
        size="small"
        options={tagData}
        onChange={(event, newValue) => {
          setTags(newValue);
        }}
        getOptionLabel={option => option.PrimaryIdentifier}
        groupBy={option => option.PrimaryIdentifier}
        renderInput={params => <TextField {...params} variant="outlined" label="Search Tags.." />}
        renderGroup={params => <TextField {...params} />}
      // renderOption={(option, { inputValue }) => {
      //   const matches = match(option.title, inputValue);
      //   const parts = parse(option.title, matches);
      //   return (
      //     <div>
      //       {parts.map((part, index) => (
      //         <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
      //           {part.text}
      //         </span>
      //       ))}
      //     </div>
      //   );
      // }}
      />
    }
    else if (subTab == constants.ISSUER_TAB) {
      autocomplete = <Autocomplete
        className={classes.autocomplte}
        multiple
        id="autocomplete-tags"
        size="small"
        options={tagData}
        onChange={(event, newValue) => {
          setTags(newValue);
        }}
        getOptionLabel={option => option.IssuerName}
        groupBy={option => option.IssuerName}
        renderInput={params => <TextField {...params} variant="outlined" label="Search Tags.." />}
      />
    }
    else {
      autocomplete = <Autocomplete
        className={classes.autocomplte}
        multiple
        id="autocomplete-tags"
        size="small"
        options={dummy}
        onChange={(event, newValue) => {
          setTags(newValue);
        }}
        getOptionLabel={option => option.PrimaryIdentifier}
        groupBy={option => option.PrimaryIdentifier}
        renderInput={params => <TextField {...params} variant="outlined" label="Search Tags.." />}
      />
    }
  }
  else {
    autocomplete = <Autocomplete
      className={classes.autocomplte}
      multiple
      id="autocomplete-tags"
      size="small"
      options={dummy}
      onChange={(event, newValue) => {
        setTags(newValue);
      }}
      getOptionLabel={option => option.PrimaryIdentifier}
      groupBy={option => option.PrimaryIdentifier}
      renderInput={params => <TextField {...params} variant="outlined" label="Search Tags.." />}
    />
  }

  console.log(tags);
  const renderGroup = params => [
    <ListSubheader key={params.key} component="div">
      {params.key}
    </ListSubheader>,
    params.children
  ];

  return (
    <React.Fragment>
      <div className={classes.root}>
        {autocomplete}
      </div>

    </React.Fragment >
  );
};

// const options = labels.map(option => {
//   const firstLetter = option.title[0].toUpperCase();
//   return {
//     firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
//     ...option
//   };
// });
const dummy = [
  {
    PrimaryIdentifier: "BL1229162",
    Description: "description"
  }
]


export default AutocompleteComponent;
