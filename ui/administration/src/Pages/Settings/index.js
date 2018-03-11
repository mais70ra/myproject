import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';

// let fetchDropdowns = () => {

// };

class Settings extends Component {
  render() {
    return (
      <Container style={{ marginTop: 15 }}>

      </Container>
    );
  }
}

export default connect(state => ({}), {
  // fetchDropdowns
})(Settings);
