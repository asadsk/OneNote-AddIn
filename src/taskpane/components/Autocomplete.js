/* eslint-disable no-use-before-define */
import React from "react";
import { useTheme, fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Popper from "@material-ui/core/Popper";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ButtonBase from "@material-ui/core/ButtonBase";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles(theme => ({
  root: {
    width: 221,
    fontSize: 13
  },
  button: {
    fontSize: 13,
    width: "100%",
    textAlign: "left",
    paddingBottom: 8,
    color: "#586069",
    fontWeight: 600,
    "&:hover,&:focus": {
      color: "#0366d6"
    },
    "& span": {
      width: "100%"
    },
    "& svg": {
      width: 16,
      height: 16
    }
  },
  tag: {
    backgroundColor: theme.palette.primary,
    marginTop: 3,
    height: 30,
    padding: ".15em 4px",
    fontWeight: 600,
    lineHeight: "15px",
    borderRadius: 2,
    width: 65,
    display: "inline-flex",
    marginRight: 5,
    fontSize: "0.8rem"
  },
  popper: {
    border: "1px solid rgba(27,31,35,.15)",
    boxShadow: "0 3px 12px rgba(27,31,35,.15)",
    borderRadius: 3,
    width: 300,
    zIndex: 1,
    fontSize: 13,
    color: "#586069",
    backgroundColor: "#f6f8fa"
  },
  header: {
    borderBottom: "1px solid #e1e4e8",
    padding: "8px 10px",
    fontWeight: 600
  },
  inputBase: {
    padding: 10,
    width: "100%",
    borderBottom: "1px solid #dfe2e5",
    "& input": {
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      padding: 8,
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      border: "1px solid #ced4da",
      fontSize: 14,
      "&:focus": {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main
      }
    }
  },
  paper: {
    boxShadow: "none",
    margin: 0,
    color: "#586069",
    fontSize: 13
  },
  option: {
    minHeight: "auto",
    alignItems: "flex-start",
    padding: 8,
    '&[aria-selected="true"]': {
      backgroundColor: "transparent"
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover
    }
  },
  popperDisablePortal: {
    position: "relative"
  },
  iconSelected: {
    width: 17,
    height: 17,
    marginRight: 5,
    marginLeft: -2
  },
  color: {
    width: 14,
    height: 14,
    flexShrink: 0,
    borderRadius: 3,
    marginRight: 8,
    marginTop: 2
  },
  text: {
    flexGrow: 1
  },
  close: {
    opacity: 0.6,
    width: 18,
    height: 18
  },
  container: {
    display: "inline-grid"
  }
}));

export default function GitHubLabel() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState([]);
  const [pendingValue, setPendingValue] = React.useState([]);
  const theme = useTheme();

  const handleClick = event => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event, reason) => {
    if (reason === "toggleInput") {
      return;
    }
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "github-label" : undefined;

  return (
    <React.Fragment>
      <div className={classes.root}>
        {/* <ButtonBase disableRipple className={classes.button} aria-describedby={id} onClick={handleClick}>
          <span>Labels</span>
          <SettingsIcon />
        </ButtonBase> */}
      </div>
      {/* <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" className={classes.popper}>
        <div className={classes.header}>Apply labels to this pull request</div> */}
      <Autocomplete
        openOnFocus={false}
        onClose={handleClose}
        multiple
        classes={{
          paper: classes.paper,
          option: classes.option,
          popperDisablePortal: classes.popperDisablePortal
        }}
        value={pendingValue}
        onChange={(event, newValue) => {
          setPendingValue(newValue);
        }}
        disableCloseOnSelect
        disablePortal
        renderTags={() => null}
        noOptionsText="No labels"
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <DoneIcon className={classes.iconSelected} style={{ visibility: selected ? "visible" : "hidden" }} />
            <div className={classes.text}>
              {option.name}
              <br />
              {option.description}
            </div>
            <CloseIcon className={classes.close} style={{ visibility: selected ? "visible" : "hidden" }} />
          </React.Fragment>
        )}
        options={[...labels].sort((a, b) => {
          // Display the selected labels first.
          let ai = value.indexOf(a);
          ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
          let bi = value.indexOf(b);
          bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
          return ai - bi;
        })}
        getOptionLabel={option => option.name}
        renderInput={params => (
          <InputBase
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            autoFocus
            className={classes.inputBase}
          />
        )}
      />
      <div className={classes.container}>
        {value.map(label => (
          <div key={label.name} className={classes.tag}>
            <div
              style={{
                backgroundColor: theme.palette.secondary
              }}
            >
              {label.name}
            </div>
          </div>
        ))}
      </div>
      {/* </Popper> */}
    </React.Fragment>
  );
}

// From https://github.com/abdonrd/github-labels
const labels = [
  {
    name: "#Security",
    color: "#7057ff",
    description: ""
  },
  {
    name: "#AsseType",
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
