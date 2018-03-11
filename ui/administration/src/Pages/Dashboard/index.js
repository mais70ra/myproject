import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeRoute } from '../../Common/duck';
import { Container, Row, Col } from 'react-grid-system';
import { grey } from 'material-ui/colors';
import Button from 'material-ui/Button';

class Dashboard extends Component {
  render() {
    return (
      <Container>
        <Row style={{ marginBottom: 15 }} align="center">
          <Col align="center" xs={12}>
            <h1 style={{ color: grey[500] }}>
              Welcome. Please select one from below.
            </h1>
          </Col>
        </Row>
        <Row style={{ marginBottom: 15 }} align="center">
          <Col align="center" xs={12}>
            <Button
              raised
              onClick={() => this.props.changeRoute('/user/create')}
              fullWidth
              color="primary"
            >
              Register New User
            </Button>
          </Col>
        </Row>
        <Row align="center">
          <Col align="center" xs={12}>
            <Button
              raised
              onClick={() => this.props.changeRoute('/user/list')}
              fullWidth
              color="primary"
            >
              List Users
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(state => ({}), { changeRoute })(Dashboard);
