import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { renderTextField } from '../../Common/helpers';
import { required, matchesField } from '../../Common/validations';

import ContentBox from '../../Components/ContentBox';
import { Row, Col } from 'react-grid-system';
import muiThemeable from 'material-ui/styles/muiThemeable';

class LoginForm extends Component {
  componentWillMount() {
    this.props.reset();
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <ContentBox
          title='System Login'
        >
          <Row align="center">
            <Col style={{ marginTop: 15 }} align="center" xs={12}>
              {this.props.requests > 0 && (
                <CircularProgress
                  color={this.props.muiTheme.palette.accent1Color}
                  size={40}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Field
                name="username"
                component={renderTextField}
                label="Username"
                validate={[required]}
              />
            </Col>
            <Col xs={12}>
              <Field
                name="password"
                type="password"
                component={renderTextField}
                label="Password"
                validate={[required]}
              />
            </Col>
          </Row>
          <Row>
            <Col style={{ marginBottom: 15 }} align="center" xs={12}>
              <RaisedButton
                label="Submit"
                type="submit"
                primary
                disabled={pristine || submitting}
                style={{ marginTop: '1em' }}
              />
            </Col>
          </Row>
        </ContentBox>
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
)(muiThemeable()(form));
