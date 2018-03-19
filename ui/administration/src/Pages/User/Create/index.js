import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userCreate } from './duck';
import UserForm from '../Form';
import { Translate } from '../../../Setup/Translate';

class UserCreate extends Component {
    render() {
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

export default connect(state => ({}), { userCreate })(UserCreate);
