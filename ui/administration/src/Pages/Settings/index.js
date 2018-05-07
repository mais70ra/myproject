import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { grey500, white } from 'material-ui/colors';
import { Container, Row, Col, ScreenClassRender } from 'react-grid-system';
import { contentBoxMapper } from '../../Common/helpers';
import ChangeLangForm from './ChangeLangForm';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import { translate } from 'react-i18next';
import validations from './validations'

class Settings extends Component {
    componentWillMount() {
      
    }
    render() {
        const t = this.props.t;
        return (
            <ChangeLangForm
                formName="ChangeLangForm"
                displayName={t("Settings")}
                currentUser={this.props.currentUser}
            />
        );
    }
}

export default translate()(
    connect(state => ({
        dropdowns: state.user.dropdowns,
        currentUser: state.auth.currentUser
    }), {
        // changeLanguage
    })(Settings)
);
