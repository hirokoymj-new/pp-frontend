import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";

export const FormRadioGroup = ({
  input: { onChange, onBlur, value, name },
  meta: { touched, invalid, error },
  options,
  row,
  label,
  margin,
}) => {
  return (
    <FormControl error={touched && invalid} margin={margin ? margin : ""}>
      <FormLabel component="legend">{label}</FormLabel>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
      <RadioGroup
        aria-label={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        row={row}>
        {options.map(({ label, value }, index) => (
          <span key={index}>
            <FormControlLabel
              key={label}
              value={value}
              control={<Radio color="secondary" />}
              label={label}
            />
          </span>
        ))}
      </RadioGroup>
    </FormControl>
  );
};
