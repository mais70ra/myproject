import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import styles from './styles';

class PhotoPreview extends Component {
  constructor(props) {
    super(props);

    const { customStyles = {} } = props;

    this.DialogTitle = withStyles(customStyles.title || styles.title)(
      DialogTitle
    );
    this.DialogContent = withStyles(customStyles.content || styles.content)(
      DialogContent
    );
    this.DialogActions = withStyles(customStyles.actions || styles.actions)(
      DialogActions
    );
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        title={this.props.title}
        aria-labelledby="photo-preview-title"
        onClose={this.props.onClose}
      >
        <this.DialogTitle id="photo-preview-title">
          {this.props.title}
        </this.DialogTitle>
        <this.DialogContent>
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
        </this.DialogContent>
        <this.DialogActions>
          <Button color="primary" autoFocus onClick={this.props.onClose}>
            Close
          </Button>
        </this.DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(PhotoPreview);
