import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, getFormValues } from 'redux-form';
import { grey500, white } from 'material-ui/colors';
import { Container, Row, Col, ScreenClassRender } from 'react-grid-system';
import { contentBoxMapper } from '../../../Common/helpers';
import {
    required,
    integer,
    alphanumeric,
    length,
    email,
    matchesField
} from '../../../Common/validations';
import Button from 'material-ui/Button';
// import { fetchDropdownCascade, clearDropdown } from '../duck';
import { CircularProgress } from 'material-ui/Progress';
import { withTheme } from 'material-ui/styles';
import { routeBack } from '../../../Common/duck';

const validations = {
    firstName: [
        required,
        length(1, 60, 'First name should be between 1 and 60 symbols long'),
    ],
    middleName: [
        required,
        length(1, 60, 'Middle name should be between 1 and 60 symbols long'),
    ],
    lastName: [
        required,
        length(1, 60, 'Last name should be between 1 and 60 symbols long'),
    ],
    phone: [
        required,
        integer,
        length(1, 20, 'Phone number should be between 1 and 20 numbers long'),
    ],
    email: [
        required,
        email,
        length(5, 20, 'Email should be between 5 and 20 symbols long'),
    ],
    username: [
        required,
        length(1, 60, 'Username name should be between 1 and 60 symbols long'),
    ],
    password: [
        required,
        length(1, 60, 'Password name should be between 1 and 60 symbols long'),
    ],
    repassword: [
        matchesField('password', 'The password does not match')
    ],
};

class UserForm extends Component {
    componentWillMount() {}
    render() {
        const {
            handleSubmit,
            pristine,
            valid,
            submitting,
            displayName,
            dropdown,
            formValues,
            change,
            disabledFields = {},
        } = this.props;

        return (
            <form onSubmit={handleSubmit} autoComplete="off">
                <Container
                    fluid
                    style={{
                        marginTop: 15,
                        marginBottom: 15,
                        background: white,
                        padding: '15px 30px 15px 30px',
                        borderRadius: 4,
                    }}
                >
                    <Row align="center">
                        <Col align="center" xs={12}>
                            <h2 style={{ color: grey500 }}>{displayName}</h2>
                        </Col>
                    </Row>
                    <Row>
                        {contentBoxMapper([
                            {
                                colProps: {
                                    xs: 12,
                                },
                                boxProps: {
                                    title: 'General info',
                                    style: {
                                        marginBottom: 10,
                                    },
                                },
                                inputs: [
                                    {
                                        inputType: 'text',
                                        label: 'First name',
                                        name: 'firstName',
                                        show: true,
                                        disabled: disabledFields.firstName,
                                        validate: validations.firstName,
                                    },
                                    {
                                        inputType: 'text',
                                        label: 'Middle Name',
                                        name: 'middleName',
                                        show: true,
                                        disabled: disabledFields.middleName,
                                        validate: validations.middleName,
                                    },
                                    {
                                        inputType: 'text',
                                        label: 'Last Name',
                                        name: 'lastName',
                                        show: true,
                                        disabled: disabledFields.lastName,
                                        validate: validations.lastName,
                                    },
                                ],
                            },
                            {
                                colProps: {
                                    xs: 12,
                                    md: 6,
                                },
                                boxProps: {
                                    title: 'Phone and Email',
                                },
                                inputs: [
                                    {
                                        inputType: 'text',
                                        label: 'Phone',
                                        name: 'phone',
                                        show: true,
                                        disabled: disabledFields.phone,
                                        validate: validations.phone,
                                    },
                                    {
                                        inputType: 'text',
                                        label: 'Email',
                                        name: 'email',
                                        show: true,
                                        disabled: disabledFields.email,
                                        validate: validations.email,
                                    },
                                ],
                            },
                            {
                                colProps: {
                                    xs: 12,
                                    md: 6,
                                },
                                boxProps: {
                                    title: 'Credentials',
                                },
                                inputs: [
                                    {
                                        inputType: 'text',
                                        label: 'Username',
                                        name: 'username',
                                        show: true,
                                        disabled: disabledFields.username,
                                        validate: validations.username,
                                    },
                                    {
                                        inputType: 'text',
                                        label: 'Password',
                                        name: 'password',
                                        type: 'password',
                                        show: true,
                                        disabled: disabledFields.password,
                                        validate: validations.password,
                                    },
                                    {
                                        inputType: 'text',
                                        label: 'Confirm Password',
                                        name: 'repassword',
                                        type: 'password',
                                        show: true,
                                        disabled: disabledFields.repassword,
                                        validate: validations.repassword,
                                        onChange: (e, value) => {
                                            if (!value) {
                                                change('productId', null);
                                            }
                                        },
                                    },
                                ],
                            },
                        ])}
                    </Row>
                    <Row>
                        <ScreenClassRender
                            style={screenClass => {
                                if (
                                    screenClass === 'xs' ||
                                    screenClass === 'sm'
                                ) {
                                    return { marginBottom: 10 };
                                }
                                return {};
                            }}
                        >
                            <Col align="start" xs={12} md={4}>
                                <Button
                                    fullWidth
                                    raised
                                    label="Cancel"
                                    color="secondary"
                                    onTouchTap={this.props.routeBack}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                            width: '100%',
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: white,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Cancel
                                        </span>
                                    </div>
                                </Button>
                            </Col>
                        </ScreenClassRender>
                        <Col align="end" offset={{ md: 4 }} xs={12} md={4}>
                            <Button
                                fullWidth
                                raised
                                color="primary"
                                onClick={handleSubmit}
                                disabled={pristine || !valid || submitting}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100%',
                                        width: '100%',
                                    }}
                                >
                                    {submitting ? (
                                        <CircularProgress
                                            color="secondary"
                                            size={24}
                                        />
                                    ) : (
                                        <span
                                            style={{
                                                color: white,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Save
                                        </span>
                                    )}
                                </div>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </form>
        );
    }
}

export default compose(
    connect((state, props) => ({
        form: props.formName,
    })),
    reduxForm({ touchOnChange: true })
)(
    connect(
        (state, { formName }) => ({
            formValues: getFormValues(formName)(state) || {},
            // ,dropdown: state.users.dropdown.local
        }),
        { routeBack } // fetchDropdownCascade, clearDropdown,
    )(withTheme()(UserForm))
);
