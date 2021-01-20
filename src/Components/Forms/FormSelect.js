import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";

export const FormSelect = ({
  input,
  label,
  meta: { touched, error },
  options,
  defaultValue,
  variant,
  margin,
  ...custom
}) => {
  return (
    <FormControl
      error={touched && error}
      fullWidth
      variant={variant}
      margin={margin ? margin : ""}
    >
      <InputLabel id={input.name}>{label}</InputLabel>
      <Select
        labelId={input.name}
        value={input.value}
        onChange={input.onChange}
        inputProps={{
          name: input.name,
          id: input.name,
          onBlur: input.onBlur,
        }}
        label={label}
        {...custom}
      >
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
