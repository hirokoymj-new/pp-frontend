import React, { useState, useEffect } from "react";
import { CITIES } from "Queries/City";
import { useLazyQuery } from "@apollo/react-hooks";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import get from "lodash/get";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Google Maps"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
      >
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}

const filterOptions = createFilterOptions({
  matchFrom: "start",
  // stringify: (option) => option.name,
  limit: 10,
});
export const ComboBox = () => {
  const [city, setCity] = useState("");
  const [options, setOptions] = useState([]);
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [runQuery, { loading, data, called }] = useLazyQuery(CITIES, {
    onCompleted: (data) => {
      console.log("called onCompleted");
      console.log(data);
      const cities = get(data, "cities", []);
      console.log(cities);
      setOptions(cities);
      // setOpen(true);
    },
  });

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const onClick = () => {
    runQuery({ variables: { city } });
  };

  return (
    <>
      {loading && called ? (
        "loading..."
      ) : (
        <Paper>
          {/* <TextField
            type="text"
            name="city"
            variant="outlined"
            label="City Search"
            value={city}
            onChange={handleCityChange}
            autoComplete="off"
          />
          <Button variant="contained" color="primary" onClick={onClick}>
            search
          </Button>

          {data &&
            data.cities &&
            data.cities.map((c, i) => <div key={i}>{c.name}</div>)} */}
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              if (inputValue.length > 3) {
                runQuery({ variables: { city: inputValue } });
              }
            }}
            open={inputValue.length > 3 ? true : false}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            loading={loading}
            id="combo-box-demo"
            options={options}
            getOptionLabel={(option) => option.name}
            filterOptions={filterOptions}
            style={{ width: 300 }}
            renderInput={(params) => (
              <>
                <TextField {...params} label="Combo box" variant="outlined" />
              </>
            )}
          />
        </Paper>
      )}
    </>
  );
};
