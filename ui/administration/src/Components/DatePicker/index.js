import React, { Component } from 'react';
import { DatePicker } from 'material-ui-pickers';
import { withStyles } from 'material-ui/styles';
import { InputAdornment } from 'material-ui/Input';
import Event from 'material-ui-icons/Event';
import IconButton from 'material-ui/IconButton';
import styles from './styles';

class DatePickerWrapper extends Component {
  render() {
    const {
      classes,
      error,
      helperText,
      format = 'YYYY-MM-DD',
      label,
      clearable = true,
      autoOk = true,
      value,
      fullWidth = true,
      InputProps,
      InputLabelProps,
      FormHelperTextProps,
      floatingLabel,
      ...rest
    } = this.props;

    return (
      <DatePicker
        error={!!error}
        helperText={helperText}
        format={format}
        label={label}
        clearable={clearable}
        autoOk={autoOk}
        value={value || null}
        fullWidth={fullWidth}
        InputLabelProps={{
          classes: {
            root: floatingLabel ? classes.floatingLabelRoot : classes.labelRoot,
            shrink: floatingLabel
              ? classes.floatingLabelShrink
              : classes.labelShrink
          },
          ...InputLabelProps
        }}
        InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.inputRoot,
            underline: classes.inputUnderline,
            input: classes.inputInput
          },
          endAdornment: (
            <InputAdornment
              position="end"
              classes={{
                root: classes.endAdornmentRoot
              }}
            >
              <IconButton
                classes={{
                  root: classes.endAdornmentIconButtonRoot
                }}
              >
                <Event />
              </IconButton>
            </InputAdornment>
          ),
          ...InputProps
        }}
        {...rest}
      />
    );
  }
}

export default withStyles(styles)(DatePickerWrapper);
