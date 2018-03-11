import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import styles from './styles';
import textFieldStyles from '../TextField/styles';

class SelectWrapper extends Component {
  constructor(props) {
    super(props);

    const { customStyles = {}, floatingLabel } = props;

    this.FormControl = withStyles(
      customStyles.formControl || styles.formControl
    )(FormControl);

    this.Input = withStyles(
      customStyles.input || styles.input || textFieldStyles.input
    )(Input);

    this.InputLabel = withStyles(
      floatingLabel
        ? customStyles.floatingLabel ||
          styles.floatingLabel ||
          textFieldStyles.floatingLabel
        : customStyles.label ||
          styles.formControl.label ||
          textFieldStyles.label
    )(InputLabel);

    this.Select = withStyles(customStyles.select || styles.select(props))(
      Select
    );

    this.MenuItem = withStyles(customStyles.menuItem || styles.menuItem)(
      MenuItem
    );

    this.FormHelperText = withStyles(
      customStyles.helperText || styles.helperText
    )(FormHelperText);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.props.disabled) {
      const { customStyles = {} } = nextProps;
      this.Select = withStyles(customStyles.select || styles.select(nextProps))(
        Select
      );
    }
  }

  render() {
    const {
      error,
      options = [],
      defaultValue,
      defaultText,
      helperText,
      label,
      LabelProps,
      HelperTextProps,
      WrapperProps,
      InputProps,
      customStyles,
      value,
      floatingLabel,
      disabled,
      ...rest
    } = this.props;

    return (
      <this.FormControl error={!!error} disabled={disabled} {...WrapperProps}>
        {label && <this.InputLabel {...LabelProps}>{label}</this.InputLabel>}
        <this.Select
          input={<this.Input disableUnderline {...InputProps} />}
          value={value || ''}
          {...rest}
        >
          <this.MenuItem value={defaultValue || ''}>
            {defaultText || 'Select'}
          </this.MenuItem>
          {(options || []).map((x, idx) => (
            <this.MenuItem key={idx} value={x.key}>
              {x.value}
            </this.MenuItem>
          ))}
        </this.Select>
        {helperText && (
          <this.FormHelperText {...HelperTextProps}>
            {helperText}
          </this.FormHelperText>
        )}
      </this.FormControl>
    );
  }
}

export default SelectWrapper;
