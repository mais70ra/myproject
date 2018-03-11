import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { checkSessionNoCookie } from './duck';
import { CircularProgress } from 'material-ui/Progress';
import { Container, Row, Col } from 'react-grid-system';

class SessionGateway extends Component {
  componentWillMount() {
    // not checking ut5-cookie because its HttpOnly
    // meaning it can't be accessed
    this.props.checkSessionNoCookie();
  }

  render() {
    if (!this.props.checked) {
      const style = { width: '100%', height: '100%' };
      return (
        <Container fluid style={style}>
          <Row align="center" style={style}>
            <Col align="center">
              <CircularProgress color="primary" size={60} />
            </Col>
          </Row>
        </Container>
      );
    }

    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default connect(({ auth }) => ({ checked: auth.sessionChecked }), {
  checkSessionNoCookie
})(SessionGateway);
