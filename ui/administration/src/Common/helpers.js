import React from 'react';

import TextField from '../Components/TextField';
import Checkbox from 'material-ui/Checkbox';
import Select from '../Components/Select';
import DatePicker from '../Components/DatePicker';
import Radio from '../Components/Radio';
import { Field } from 'redux-form';
import ContentBox from '../Components/ContentBox';
import PhotoContainer from '../Components/PhotoContainer';
import { Row, Col, ScreenClassRender } from 'react-grid-system';

export const renderTextField = ({
  input,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    helperText={touched && error}
    error={!!(touched && error)}
    floatingLabel
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
  <Radio
    label={label}
    error={!!(touched && error)}
    helperText={touched && error}
    {...input}
    onChange={(e, value) => {
      input.onBlur(undefined, true);
      input.onChange(value);
    }}
    {...custom}
  />
);

export const renderCheckbox = ({ input, label }) =>
  null && (
    <Checkbox label={label} checked={!!input.value} onCheck={input.onChange} />
  );

export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  onCascade,
  ...custom
}) => {
  return (
    <Select
      label={label}
      helperText={touched && error}
      error={!!(touched && error)}
      floatingLabel
      {...input}
      onChange={e => {
        input.onChange(e.target.value);
        if (onCascade) {
          onCascade(e.target.value);
        }
      }}
      onBlur={() => input.onBlur(undefined, true)}
      value={input.value || custom.defaultValue || null}
      {...custom}
    />
  );
};

export const renderDateField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <DatePicker
    error={!!(touched && error)}
    helperText={touched && error}
    {...input}
    format="YYYY-MM-DD"
    label={label}
    clearable
    autoOk
    onChange={value => input.onChange(value)}
    onBlur={value => input.onBlur(undefined, true)}
    value={input.value || null}
    floatingLabel
    fullWidth
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

export const contentBoxMapper = (boxes, props) =>
  (boxes || [])
    .filter(
      box => box.inputs && box.inputs.length && box.inputs.some(x => x.show)
    )
    .map((box, idx) => (
      <Col key={idx} style={{ marginBottom: 15 }} {...box.colProps}>
        <ContentBox {...box.boxProps}>
          {(box.inputs || []).filter(x => x.show).map((x, idx) => {
            const {
              inputType,
              show,
              render,
              cascade,
              cascadeFetch,
              cascadeClear,
              ...rest
            } = x;
            const isLastElement = idx >= box.inputs.length - 1;
            if (cascade) {
              rest.onCascade = value => {
                for (const field of cascade) {
                  props.change(field, null);
                  if (cascadeClear) {
                    cascadeClear(field);
                  }
                }

                if (value && cascadeFetch) {
                  cascadeFetch(cascade[0], value);
                }
              };
            }

            return (
              <div key={idx}>
                <Row style={{ marginTop: 5, marginBottom: 5 }}>
                  <Col xs={12} {...x.colProps}>
                    {render ? (
                      render(x, idx, props)
                    ) : (
                      <Field
                        component={chooseFieldRenderer(inputType)}
                        {...rest}
                      />
                    )}
                  </Col>
                </Row>
              </div>
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

export const getAddressGeocode = data => {
  return Promise.resolve({});

  // if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
  //   return Promise.resolve({});
  // }

  // const address = [];
  // if (data.addressZone1) {
  //   address.push(data.addressZone1);
  // }
  // if (data.addressZone2) {
  //   address.push(data.addressZone2);
  // }
  // if (data.addressZone3) {
  //   address.push(data.addressZone3);
  // }
  // if (data.addressZone4) {
  //   address.push(data.addressZone4);
  // }
  // if (data.address) {
  //   address.push(data.address);
  // }

  // const stringifiedAddress = address.length
  //   ? encodeURIComponent(address.join(','))
  //   : null;

  // const promise = stringifiedAddress
  //   ? fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${stringifiedAddress}&key=${
  //         process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  //       }`
  //     )
  //   : Promise.resolve({});

  // return promise
  //   .then(res => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.resolve({});
  //   })
  //   .then(
  //     res =>
  //       (res.results &&
  //         res.results[0] &&
  //         res.results[0].geometry &&
  //         res.results[0].geometry.location) ||
  //       {}
  //   )
  //   .catch(() => {});
};
