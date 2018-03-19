import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import Button from 'material-ui/Button';

import { Field, reduxForm } from 'redux-form';
import { renderTextField } from '../../../Common/helpers';
import { integer } from '../../../Common/validations';
import { Translate } from '../../../Setup/Translate';

class UsersFilter extends Component {
  render() {
    const { handleSubmit, submitting, valid, pristine } = this.props;

    return (
      <form onSubmit={handleSubmit} autoComplete="off">
        <Row align="start">
          <Col align="start" xs={12} md={4}>
            <Field name="name" component={renderTextField} label={Translate("Name")} />
          </Col>
          <Col align="start" xs={12} md={4}>
            <Field
              name="phone"
              component={renderTextField}
              label={Translate("Phone")}
              validate={[integer]}
            />
          </Col>
          <Col align="start" style={{ paddingTop: 12 }} xs={12} md={4}>
            <Button
              raised
              type="submit"
              disabled={pristine || submitting || !valid}
              label={Translate("Search")}
              color="primary"
              fullWidth
            >
              {Translate('Search')}
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

const form = reduxForm({
  form: 'findUser'
})(UsersFilter);

export default form;
