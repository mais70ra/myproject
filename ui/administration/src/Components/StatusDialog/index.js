import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { closeDialog } from '../../Common/duck';

class StatusDialog extends Component {
  render() {
    return (
      <Dialog
        actions={[
          <FlatButton
            label="Ok"
            primary={true}
            onClick={this.props.closeDialog}
          />
        ]}
        modal={false}
        open={!!this.props.message}
        onRequestClose={this.props.closeDialog}
      >
        {this.props.message}
      </Dialog>
    );
  }
}

StatusDialog.propTypes = {
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
