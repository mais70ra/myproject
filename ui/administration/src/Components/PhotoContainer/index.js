import React, { Component } from 'react';
import Button from 'material-ui/Button';
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
        {this.props.input.value && (
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
        )}
        <Button
          component="label"
          color="primary"
          fullWidth
          {...this.props.buttonProps}
        >
          {this.props.buttonText || 'Upload Photo'}
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
              }
            }}
            style={{ display: 'none', ...this.props.fileInputStyle }}
            type="file"
            capture="camera"
            accept="image/*"
            {...this.props.fileInputProps}
          />
        </Button>
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
