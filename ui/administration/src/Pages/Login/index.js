import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginForm from './Form';
import { Container, Row, Col } from 'react-grid-system';

import { login  } from './duck';
import BrowserDetection from 'react-browser-detection';

class Login extends Component {
  submit = values => {
    this.props.login(values);
  };

  componentWillMount() {
    
  }

  render() {
    const logosStyle = {
      objectFit: 'contain',
      maxWidth: '100%',
      maxHeight: '100%',
      width: 'auto',
      height: 'auto',
      marginBottom: 10
    };

    const content = style => (
      <Container fluid style={style}>
        <Row align="center" style={{ marginBottom: 20 }}>
          <Col align="center" xs={12}>
            <img alt="" style={logosStyle} src="/images/logo.png" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <LoginForm onSubmit={this.submit} />
          </Col>
        </Row>
      </Container>
    );

    return (
      <BrowserDetection>
        {{
          ie: () => (
            <div
              style={{
                display: 'table',
                height: '100%',
                width: '100%'
              }}
            >
              <div
                style={{
                  display: 'table-cell',
                  verticalAlign: 'middle',
                  horizontalAlign: 'middle'
                }}
              >
                {content({ width: '40%' })}
              </div>
            </div>
          ),
          default: browser => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%'
              }}
            >
              {content({})}
            </div>
          )
        }}
      </BrowserDetection>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func
};

export default connect(
  state => ({
    currentUser: state.auth.currentUser
  }),
  {
    login
  }
)(Login);
