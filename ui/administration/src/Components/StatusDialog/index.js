import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import styles from './styles';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';

import { closeDialog } from '../../Common/duck';
import MorphIcon from 'react-svg-buttons/lib/components/MorphIcon';

class StatusDialog extends Component {
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
        fullWidth
        open={!!this.props.message}
        onClose={this.props.closeDialog}
      >
        <this.DialogTitle>
          {this.props.title || (this.props.isError ? 'Error' : 'Success')}
        </this.DialogTitle>
        <this.DialogContent style={{ textAlign: 'center' }}>
          <MorphIcon
            size={80}
            color={this.props.isError ? 'red' : 'green'}
            type={this.props.isError ? 'cross' : 'check'}
          />
          <DialogContentText style={{ marginTop: 15 }}>
            {this.props.message}
          </DialogContentText>
        </this.DialogContent>
        <this.DialogActions style={{ paddingRight: 10, paddingLeft: 10 }}>
          <Button
            raised
            onClick={this.props.closeDialog}
            color="primary"
            autoFocus
            fullWidth
          >
            Ok
          </Button>
        </this.DialogActions>
      </Dialog>
    );
  }
}

StatusDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  isError: PropTypes.bool,
  closeDialog: PropTypes.func
};

export default connect(
  state => ({
    message: state.dialog.message,
    isError: state.dialog.isError
  }),
  { closeDialog }
)(StatusDialog);
