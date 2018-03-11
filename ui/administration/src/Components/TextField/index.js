import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import styles from './styles';
import debounce from 'debounce';

class TextFieldWrapper extends Component {
  constructor(props) {
    super(props);

    const { customStyles = {}, floatingLabel } = props;

    this.FormControl = withStyles(
      customStyles.formControl || styles.formControl
    )(FormControl);

    this.Input = withStyles(customStyles.input || styles.input)(Input);

    this.InputLabel = withStyles(
      customStyles.label ||
        (floatingLabel ? styles.floatingLabel : styles.label)
    )(InputLabel);

    this.FormHelperText = withStyles(
      customStyles.helperText || styles.helperText
    )(FormHelperText);

    this.state = { value: props.value };
    this.lastPropValue = props.value;

    this.debouncedOnChange = debounce(event => {
      props.onChange(event.target.value);
    }, 200);

    this.handleChange = event => {
      event.persist();
      this.setState({ value: event.target.value });
      this.debouncedOnChange(event);
    };
  }

  getValue() {
    const value = this.props.value !== this.lastPropValue ?
      this.props.value :
      this.state.value

    this.lastPropValue = this.props.value

    return value
  }

  render() {
    const {
      LabelProps,
      WrapperProps,
      HelperTextProps,
      label,
      error,
      helperText,
      customStyles,
      floatingLabel,
      onChange,
      value,
      ...rest
    } = this.props;

    return (
      <this.FormControl error={!!error} {...WrapperProps}>
        {label && <this.InputLabel {...LabelProps}>{label}</this.InputLabel>}
        <this.Input
          disableUnderline
          value={this.getValue()}
          onChange={this.handleChange}
          {...rest}
        />
        {helperText && (
          <this.FormHelperText {...HelperTextProps}>
            {helperText}
          </this.FormHelperText>
        )}
      </this.FormControl>
    );
  }
}

export default TextFieldWrapper;
