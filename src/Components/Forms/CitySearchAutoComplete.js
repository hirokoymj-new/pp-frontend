import React, { useState } from "react";
import { CITIES } from "Queries/City";
import { useLazyQuery } from "@apollo/react-hooks";
import TextField from "@material-ui/core/TextField";
import get from "lodash/get";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  flagImg: {
    marginRight: theme.spacing(2),
  },
}));

const filterOptions = createFilterOptions({
  limit: 15,
});

export const CitySearchAutoComplete = ({
  input,
  label,
  className,
  ...custom
}) => {
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [runQuery, { loading }] = useLazyQuery(CITIES, {
    onCompleted: (data) => {
      const cities = get(data, "cities", []);
      setOptions(cities);
    },
    onError: (e) => {
      console.error(e);
      console.log("Failed to get a city");
    },
  });

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue, reason) => {
        setValue(newValue);
        if (reason === "select-option") {
          setOptions([...options]);
        }
        input.onChange({
          myCity: newValue,
        });
      }}
      inputValue={inputValue}
      onInputChange={(e, newInputValue, reason) => {
        setInputValue(newInputValue);
        if (reason === "clear") setOptions([]);
        if (reason === "input" && inputValue.length > 3) {
          runQuery({ variables: { city: inputValue } });
        }
      }}
      loading={loading}
      id="city-search"
      options={options}
      getOptionSelected={(option, value) => {
        return option.id === value.id;
      }}
      getOptionLabel={(option) => option && option.name}
      filterOptions={filterOptions}
      style={{ width: "80%" }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            className={className}
            helperText="Japan and US only (ex. Los Angeles, Osaka)"
            InputProps={{
              ...params.InputProps,
              className: className,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            // {...input}
          />
        );
      }}
      renderOption={(option) => {
        const { name, country } = option;
        return (
          <Grid container alignItems="center">
            <Grid item>
              <img
                src={`https://openweathermap.org/images/flags/${country.toLowerCase()}.png`}
                alt="flag"
                className={classes.flagImg}
              />
              {name}
            </Grid>
          </Grid>
        );
      }}
    />
  );
};
