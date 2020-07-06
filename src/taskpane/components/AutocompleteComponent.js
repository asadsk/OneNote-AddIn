import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useState, useEffect } from "react";
import { constants } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../actions";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    //width: 230,
    //marginLeft: 16,
    marginTop: 8,
    fontSize: 12,
    "& > * + *": {
      marginTop: theme.spacing(1)
    },
    groupLabel: {
      fontSize: 30,
      minHeight: 20
    }
  },
  typography: {
    subtitle1: {
      fontSize: 12
    }
  },
  option: {
    fontSize: 12,
    minHeight: 20,
    "& > span": {}
  }
}));

export const AutocompleteComponent = props => {
  const [tags, setTags] = useState();
  const [staticTags, setStaticTags] = useState();
  const [assetTags, setAssetTags] = useState();
  const [issuerTags, setIssuerTags] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();
  const tagState = useSelector(state => state.tags);
  let loadedAssetTags;
  let loadedIssuerTags;
  let loadedStaticTags;
  if (tagState) {
    loadedAssetTags = tagState.assetTags && tagState.assetTags;

    loadedIssuerTags = tagState.issuerTags && tagState.issuerTags;

    loadedStaticTags = tagState.staticTags && tagState.staticTags;
    // const temp = loadedStaticTags && [...loadedStaticTags].splice(1, 100);
    // setStaticTags(temp);
  }
  const theme = useTheme();
  props.tags.tagdata = tags;
  //setTagData(props.tagData);
  //let tagData = props.tagData;
  const subTab = props.subTab;
  //if (!subtab) { subtab == "Static" }
  let autocomplete;

  Array.prototype.unique = function() {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) a.splice(j--, 1);
      }
    }

    return a;
  };

  if (subTab) {
    if (subTab == constants.ASSET_TAB) {
      autocomplete = (
        <Autocomplete
          multiple
          id="autocomplete-asset-tags"
          size="small"
          renderTags={() => null}
          options={assetTags ? assetTags : [...loadedAssetTags].splice(1, 100)}
          classes={{
            option: classes.option
          }}
          onInputChange={(event, value) => {
            if (value.length > 2) {
              const tags =
                loadedAssetTags &&
                loadedAssetTags.filter(tag => tag.TagName.toLowerCase().includes(value.toLowerCase()));
              setAssetTags(tags);
            }
          }}
          onChange={(event, newValue) => {
            setTags(newValue);
            const selectedTags = tagState.savedTags ? newValue.concat(tagState.savedTags).unique() : newValue;
            dispatch(userActions.storeSavedTags(selectedTags));
            newValue.splice(0, newValue.length);
            setAssetTags(null);
          }}
          getOptionLabel={option => option.TagName}
          groupBy={option => option.UniqueIdentifier}
          renderInput={params => <TextField {...params} variant="outlined" label="Search Tags.." />}
        />
      );
    } else if (subTab == constants.ISSUER_TAB) {
      autocomplete = (
        <Autocomplete
          multiple
          id="autocomplete-issuer-tags"
          size="small"
          renderTags={() => null}
          options={issuerTags ? issuerTags : [...loadedIssuerTags].splice(1, 100)}
          classes={{
            option: classes.option
          }}
          onInputChange={(event, value) => {
            if (value.length > 2) {
              const tags =
                loadedIssuerTags &&
                loadedIssuerTags.filter(tag => tag.TagName.toLowerCase().includes(value.toLowerCase()));
              setIssuerTags(tags);
            }
          }}
          onChange={(event, newValue) => {
            setTags(newValue);
            const selectedTags = tagState.savedTags ? newValue.concat(tagState.savedTags).unique() : newValue;
            dispatch(userActions.storeSavedTags(selectedTags));
            newValue.splice(0, newValue.length);
            setIssuerTags(null);
          }}
          getOptionLabel={option => option.TagName}
          groupBy={option => option.UniqueIdentifier}
          renderInput={params => <TextField {...params} variant="outlined" label="Search Tags.." />}
        />
      );
    } else {
      autocomplete = loadedStaticTags && (
        <Autocomplete
          multiple
          id="autocomplete-static-tags"
          size="small"
          renderTags={() => null}
          options={staticTags ? staticTags : loadedStaticTags}
          classes={{
            option: classes.option
          }}
          onInputChange={(event, value) => {
            if (value.length > 2) {
              const tags =
                loadedStaticTags &&
                loadedStaticTags.filter(tag => tag.TagName.toLowerCase().includes(value.toLowerCase()));
              setStaticTags(tags);
            }
          }}
          onChange={(event, newValue) => {
            setTags(newValue);
            const selectedTags = tagState.savedTags ? newValue.concat(tagState.savedTags).unique() : newValue;
            dispatch(userActions.storeSavedTags(selectedTags));
            newValue.splice(0, newValue.length);
            setStaticTags(null);
          }}
          getOptionLabel={option => option.TagName}
          groupBy={option => option.UniqueIdentifier}
          renderInput={params => <TextField {...params} variant="outlined" label="Search Tags.." />}
        />
      );
    }
  }
  const renderGroup = params => [
    <ListSubheader key={params.key} component="div">
      {params.key}
    </ListSubheader>,
    params.children
  ];

  return (
    <React.Fragment>
      <div className={classes.root}>{autocomplete}</div>
    </React.Fragment>
  );
};

export default AutocompleteComponent;
