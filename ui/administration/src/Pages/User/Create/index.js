import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userCreate } from './duck';
import UserForm from '../Form';
import { translate } from 'react-i18next';

class UserCreate extends Component {
    render() {
        const Translate = this.props.t;
        return (
            <UserForm
                formName="userCreate"
                displayName={Translate("User Details")}
                initialValues={{}}
                onSubmit={this.props.userCreate}
            />
        );
    }
}

export default translate()(connect(state => ({}), { userCreate })(UserCreate));
