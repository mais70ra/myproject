import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import Button from 'material-ui/Button';

import { Field, reduxForm } from 'redux-form';
import { renderTextField } from '../../../Common/helpers';
import { integer } from '../../../Common/validations';
import { translate } from 'react-i18next';

class UsersFilter extends Component {
  render() {
    const { handleSubmit, submitting, valid, pristine, t } = this.props;

    return (
      <form onSubmit={handleSubmit} autoComplete="off">
        <Row align="start">
          <Col align="start" xs={12} md={4}>
            <Field name="name" component={renderTextField} label={t("Name")} />
          </Col>
          <Col align="start" xs={12} md={4}>
            <Field
              name="phone"
              component={renderTextField}
              label={t("Phone")}
              validate={[integer]}
            />
          </Col>
          <Col align="start" style={{ paddingTop: 12 }} xs={12} md={4}>
            <Button
              raised
              type="submit"
              disabled={pristine || submitting || !valid}
              label={t("Search")}
              color="primary"
              fullWidth
            >
              {t('Search')}
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

export default translate()(form);
