import React from 'react';

import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import { Field } from 'redux-form';
import ContentBox from '../Components/ContentBox';
import PhotoContainer from '../Components/PhotoContainer';
import { Row, Col, ScreenClassRender } from 'react-grid-system';
import { grey400, grey300, red500 } from 'material-ui/styles/colors';

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    fullWidth
    {...input}
    {...custom}
  />
);

export const renderRadioButtons = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        flexWrap: 'wrap',
        marginTop: 10,
        width: '100%',
        borderBottom: touched && error ? '1.5px solid' : '1px solid',
        borderBottomColor: touched && error ? red500 : grey300
      }}
    >
      <span style={{ color: grey400 }}>{label}</span>
      <RadioButtonGroup
        fullWidth
        {...input}
        valueSelected={input.value || undefined}
        onChange={(e, value) => {
          input.onBlur(undefined, true);
          input.onChange(value);
        }}
        style={{
          display: 'flex',
          marginTop: 10,
          marginBottom: 10,
          justifyContent: 'start',
          flexWrap: 'wrap',
          width: '100%'
        }}
        {...custom}
      >
        {(custom.options || []).map((x, idx) => {
          const { key, value, ...rest } = x;
          return (
            <RadioButton
              key={idx}
              value={key}
              label={value}
              style={{ display: 'inline-block' }}
              labelStyle={{ color: grey400 }}
              iconStyle={{ fill: grey400 }}
              {...rest}
            />
          );
        })}
      </RadioButtonGroup>
    </div>
    {touched &&
      error && (
        <div style={{ marginTop: 5 }}>
          <span style={{ color: red500, fontSize: 12 }}>{error}</span>
        </div>
      )}
  </div>
);

export const renderCheckbox = ({ input, label }) => (
  <Checkbox label={label} checked={!!input.value} onCheck={input.onChange} />
);

export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onBlur={() => input.onBlur(undefined, true)}
    value={input.value || custom.defaultValue || null}
    onChange={(event, target, value) => {
      input.onChange(value);
      input.onBlur(undefined, true);
    }}
    fullWidth
    {...custom}
  >
    <MenuItem
      value={custom.defaultValue || null}
      primaryText={custom.defaultText}
    />
    {(custom.options || []).map((x, idx) => (
      <MenuItem key={idx} value={x.key} primaryText={x.value} />
    ))}
  </SelectField>
);

export const renderDateField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <DatePicker
    {...input}
    floatingLabelText={label}
    onChange={(e, date) => input.onChange(formatDate(date))}
    value={input.value ? new Date(input.value) : null}
    fullWidth
    errorText={touched && error}
    textFieldStyle={{ cursor: 'pointer' }}
    {...custom}
  />
);

export const renderPhotoField = ({
  input,
  label,
  missingPhotoMessage,
  meta: { touched, error },
  ...custom
}) => (
  <div style={{ marginTop: 10, marginBottom: 10 }}>
    <ScreenClassRender
      render={screenClass => {
        let buttonText = '';
        switch (screenClass) {
          case 'xs':
            buttonText = (custom.buttonText || {}).xs || 'Take Photo';
            break;
          case 'sm':
            buttonText = (custom.buttonText || {}).sm || 'Take Photo';
            break;
          case 'md':
            buttonText = (custom.buttonText || {}).md || 'Upload Photo';
            break;
          case 'lg':
            buttonText = (custom.buttonText || {}).lg || 'Upload Photo';
            break;
          case 'xl':
            buttonText = (custom.buttonText || {}).xl || 'Upload Photo';
            break;
          default:
            buttonText = 'Upload Photo';
            break;
        }

        return (
          <PhotoContainer
            input={input}
            label={label}
            missingPhotoMessage={missingPhotoMessage}
            buttonText={buttonText}
            {...custom}
          />
        );
      }}
    />
  </div>
);

const chooseFieldRenderer = type => {
  switch (type) {
    case 'select':
      return renderSelectField;
    case 'checkbox':
      return renderCheckbox;
    case 'date':
      return renderDateField;
    case 'radio':
      return renderRadioButtons;
    case 'photo':
      return renderPhotoField;
    default:
      return renderTextField;
  }
};

export const contentBoxMapper = boxes =>
  (boxes || [])
    .filter(
      box => box.inputs && box.inputs.length && box.inputs.some(x => x.show)
    )
    .map((box, idx) => (
      <Col key={idx} style={{ marginBottom: 15 }} {...box.colProps}>
        <ContentBox {...box.boxProps}>
          {(box.inputs || []).filter(x => x.show).map((x, idx) => {
            const { inputType, show, render, ...rest } = x;
            return (
              <Row key={idx}>
                <Col xs={12} {...x.colProps}>
                  {render ? (
                    render(x)
                  ) : (
                    <Field
                      component={chooseFieldRenderer(inputType)}
                      {...rest}
                    />
                  )}
                </Col>
              </Row>
            );
          })}
        </ContentBox>
      </Col>
    ));

export const base64ToBlob = base64 => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (base64.split(',')[0].indexOf('base64') >= 0) {
    byteString = window.atob(base64.split(',')[1]);
  } else {
    byteString = unescape(base64.split(',')[1]);
  }
  // separate out the mime component
  const mimeString = base64
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

export const formatDate = date => {
  if (!date) {
    return date;
  }

  const d = date instanceof Date ? date : new Date(date);
  const year = String(d.getFullYear());
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${year}-${month}-${day}`;
};
