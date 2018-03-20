import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-grid-system';
import Button from 'material-ui/Button';
import { translate } from 'react-i18next';
import { fetchUserDropdowns } from '../User/duck';

class Settings extends Component {
  componentWillMount() {}
  render() {
    const { t } = this.props;
    const fetchDropdowns = () => {
      this.props.fetchUserDropdowns();
    }
    return (
      <Container style={{ marginTop: 15 }}>
        <Row>
          <Col xs={12} md={6}>
            <Button
              fullWidth
              color="primary"
              raised
              onTouchTap={() => fetchDropdowns()}
            >{t('Download dropdowns')}</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default translate()(connect(state => ({}), {
  fetchUserDropdowns
})(Settings));
