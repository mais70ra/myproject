import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, getFormValues } from 'redux-form';
import { grey500, white } from 'material-ui/colors';
import { Container, Row, Col, ScreenClassRender } from 'react-grid-system';
import { contentBoxMapper } from '../../../Common/helpers';
import { translate } from 'react-i18next';

import Button from 'material-ui/Button';
// import { fetchDropdownCascade, clearDropdown } from '../duck';
import { CircularProgress } from 'material-ui/Progress';
import { withTheme } from 'material-ui/styles';
import { routeBack } from '../../../Common/duck';
import validations from './validations'

class UserForm extends Component {
    componentWillMount() {}
    render() {
        const {
            handleSubmit,
            pristine,
            valid,
            submitting,
            displayName,
            // dropdown,
            change,
            disabledFields = {},
            t
        } = this.props;
       // validations({t});
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
                                    title: t('General info'),
                                    style: {
                                        marginBottom: 10,
                                    },
                                },
                                inputs: [
                                    {
                                        inputType: 'text',
                                        label: t('First name'),
                                        name: 'firstName',
                                        show: true,
                                        disabled: disabledFields.firstName,
                                        validate: validations.firstName,
                                    },
                                    {
                                        inputType: 'text',
                                        label: t('Middle Name'),
                                        name: 'middleName',
                                        show: true,
                                        disabled: disabledFields.middleName,
                                        validate: validations.middleName,
                                    },
                                    {
                                        inputType: 'text',
                                        label: t('Last Name'),
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
                                    title: t('Phone and Email'),
                                },
                                inputs: [
                                    {
                                        inputType: 'text',
                                        label: t('Phone'),
                                        name: 'phone',
                                        show: true,
                                        disabled: disabledFields.phone,
                                        validate: validations.phone,
                                    },
                                    {
                                        inputType: 'text',
                                        label: t('Email'),
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
                                    title: t('Credentials'),
                                },
                                inputs: [
                                    {
                                        inputType: 'text',
                                        label: t('Username'),
                                        name: 'username',
                                        show: true,
                                        disabled: disabledFields.username,
                                        validate: validations.username,
                                    },
                                    {
                                        inputType: 'text',
                                        label: t('Password'),
                                        name: 'password',
                                        type: 'password',
                                        show: true,
                                        disabled: disabledFields.password,
                                        validate: validations.password,
                                    },
                                    {
                                        inputType: 'text',
                                        label: t('Confirm Password'),
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
                                    label={t("Cancel")}
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
                                            {t('Cancel')}
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
                                            {t('Save')}
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

export default translate()(compose(
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
));
