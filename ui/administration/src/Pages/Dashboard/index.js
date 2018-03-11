import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeRoute } from '../../Common/duck';
import { Container, Row, Col } from 'react-grid-system';
import { grey500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

class Dashboard extends Component {
  render() {
    return (
      <Container>
        <Row style={{ marginBottom: 15 }} align="center">
          <Col align="center" xs={12}>
            <h1 style={{ color: grey500 }}>
              Welcome. Please select one from below.
            </h1>
          </Col>
        </Row>
        <Row style={{ marginBottom: 15 }} align="center">
          <Col align="center" xs={12}>
            <RaisedButton
              label="Register New User"
              onClick={() => this.props.changeRoute('/user/create')}
              fullWidth
              primary
            />
          </Col>
        </Row>
        <Row align="center">
          <Col align="center" xs={12}>
            <RaisedButton
              label="List users"
              onClick={() => this.props.changeRoute('/user.list')}
              fullWidth
              primary
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(state => ({}), { changeRoute })(Dashboard);
