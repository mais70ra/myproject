import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import PhotoPreview from '../PhotoPreview';

export default class PhotoContainer extends Component {
  state = {
    previewOpen: false
  };

  render() {
    return (
      <div
        style={{
          textAlign: 'center',
          ...this.props.wrapperStyle
        }}
        {...this.props.wrapperProps}
      >
        <div style={{ marginBottom: 15 }}>
          <label>{this.props.label}</label>
        </div>
        <img
          style={{
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            cursor: 'pointer',
            marginBottom: 10,
            ...this.props.imageStyle
          }}
          onClick={() => this.setState({ previewOpen: true })}
          alt={this.props.missingPhotoMessage}
          src={this.props.input.value}
          {...this.props.imageProps}
        />
        <FlatButton
          containerElement="label"
          primary
          fullWidth
          label={this.props.buttonText || 'Upload Photo'}
          {...this.props.buttonProps}
        >
          <input
            onChange={e => {
              const file = e.target.files[0];
              if (file && window.FileReader) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = f => {
                  this.props.input.onBlur(undefined, true);
                  this.props.input.onChange(f.target.result);
                };
              } else {
                this.props.input.onBlur(undefined, true);
                this.props.input.onChange(null);
              }
            }}
            style={{ display: 'none', ...this.props.fileInputStyle }}
            type="file"
            capture="camera"
            accept="image/*"
            {...this.props.fileInputProps}
          />
        </FlatButton>
        <PhotoPreview
          missingPhotoMessage={this.props.missingPhotoMessage}
          title={this.props.label}
          src={this.props.input.value}
          onClose={() => this.setState({ previewOpen: false })}
          open={this.state.previewOpen}
        />
      </div>
    );
  }
}
