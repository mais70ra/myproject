import React, { Component } from 'react';
import Radio, { RadioGroup } from 'material-ui/Radio';
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form';

class RadioWrapper extends Component {
  render() {
    const {
      label,
      options,
      helperText,
      error,
      FormControlProps,
      FormLabelProps,
      FormHelperTextProps,
      ...rest
    } = this.props;

    return (
      <FormControl error={!!error} {...FormControlProps}>
        <FormLabel {...FormLabelProps}>{label}</FormLabel>
        <RadioGroup row {...rest}>
          {(options || []).map((x, idx) => {
            const { key, value, ...restOptions } = x;
            return (
              <FormControlLabel
                key={idx}
                value={key}
                label={value}
                control={<Radio />}
                {...restOptions}
              />
            );
          })}
        </RadioGroup>
        {helperText && (
          <FormHelperText {...FormHelperTextProps}>{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
}

export default RadioWrapper;
