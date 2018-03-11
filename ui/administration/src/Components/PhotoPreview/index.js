import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { grey50 } from 'material-ui/styles/colors';

export default class PhotoPreview extends Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        title={this.props.title}
        repositionOnUpdate
        autoDetectWindowHeight
        autoScrollBodyContent
        contentStyle={{
          width: '90%',
          height: '90%',
          maxWidth: '90% !important',
          maxHeight: '90% !important'
        }}
        titleStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: grey50
        }}
        actions={[
          <FlatButton
            label="Close"
            primary={true}
            onClick={this.props.onClose}
          />
        ]}
        onRequestClose={this.props.onClose}
      >
        <img
          src={this.props.src}
          alt={this.props.missingPhotoMessage}
          style={{
            objectFit: 'contain',
            maxWidth: '100%',
            width: '100%',
            height: 'auto',
            ...this.props.imageStyle
          }}
        />
      </Dialog>
    );
  }
}
