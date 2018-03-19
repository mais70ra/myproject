import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

import { renderTextField } from '../../Common/helpers';
import { required } from '../../Common/validations';

import Paper from 'material-ui/Paper';
import { Container, Row, Col } from 'react-grid-system';
import { withTheme } from 'material-ui/styles';

class LoginForm extends Component {
  componentWillMount() {
    this.props.reset();
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const style = this.props.theme.custom.login;

    return (
      <form onSubmit={handleSubmit}>
        <Paper elevation={0}>
          <Container>
            <Row align="center">
              <Col align="center">
                <h2 style={style.title}>
                Login
                </h2>
              </Col>
            </Row>
            <Row align="center">
              <Col align="center" xs={12}>
                {this.props.requests > 0 && (
                  <CircularProgress color="primary" size={40} />
                )}
              </Col>
            </Row>
            <Row align="center">
              <Col align="center" offset={{ xs: 1 }} xs={10}>
                <Field
                  name="username"
                  component={renderTextField}
                  floatingLabel
                  label="Username"
                  validate={[required]}
                />
              </Col>
              <Col align="center" offset={{ xs: 1 }} xs={10}>
                <Field
                  name="password"
                  type="password"
                  component={renderTextField}
                  floatingLabel
                  label="Password"
                  validate={[required]}
                />
              </Col>
            </Row>
            <Row>
              <Col
                style={{ marginBottom: 15 }}
                offset={{ xs: 1 }}
                align="center"
                xs={10}
              >
                <Button
                  type="submit"
                  raised
                  fullWidth
                  color="primary"
                  disabled={pristine || submitting}
                  style={{ marginTop: '1em' }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Container>
        </Paper>
      </form>
    );

  }
}

LoginForm.propTypes = {
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func
};

const form = reduxForm({
  form: 'login'
})(LoginForm);

export default connect(
  state => ({
    requests: state.online.requests
  })
)(withTheme()(form));
