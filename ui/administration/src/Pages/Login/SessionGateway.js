import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import { Container, Row, Col } from 'react-grid-system';
import { checkSession, checkSessionNoCookie } from './duck';
import cookies from 'js-cookie';

class SessionGateway extends Component {
  componentWillMount() {
    // meaning it can't be accessed
    this.props.checkSession();
    // if (cookies.get('Cookie')) {
    //   this.props.checkSession();
    // } else {
    //   this.props.checkSessionNoCookie();
    // }
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
  checkSession,
  checkSessionNoCookie
})(SessionGateway);
