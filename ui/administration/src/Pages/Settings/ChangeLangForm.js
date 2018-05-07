import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, getFormValues } from 'redux-form';
import { grey500, white } from 'material-ui/colors';
import { Container, Row, Col, ScreenClassRender } from 'react-grid-system';
import { contentBoxMapper } from '../../Common/helpers';
import { translate } from 'react-i18next';

import Button from 'material-ui/Button';
// import { fetchDropdownCascade, clearDropdown } from '../duck';
import { CircularProgress } from 'material-ui/Progress';
import { withTheme } from 'material-ui/styles';
import { routeBack } from '../../Common/duck';
import validations from './validations'
import { changeLanguage } from './duck';
import { fetchUserDropdowns } from '../User/duck';

class ChangeLangForm extends Component {
    componentWillMount() {}
    render() {
        const {
            pristine,
            valid,
            submitting,
            displayName,
            dropdowns,
            i18n,
            t,
            currentUser
        } = this.props;
        let handleSubmit = () => {
            this.props.changeLanguage({
                lang: this.props.formValues.lang
            })
            .then((r) => {
                currentUser.lang = this.props.formValues.lang;
                this.props.fetchUserDropdowns();
                i18n.changeLanguage(this.props.formValues.lang);
                return r;
            });
        }
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
                            <h2 style={{ color: grey500 }}>{t(displayName)}</h2>
                        </Col>
                    </Row>
                    <Row>
                        {contentBoxMapper([
                            {
                                colProps: {
                                    xs: 12,
                                },
                                boxProps: {
                                    title: t('Change language'),
                                    style: {
                                        marginBottom: 10,
                                    },
                                },
                                inputs: [
                                    {
                                        inputType: 'select',
                                        label: t('Language'),
                                        name: 'lang',
                                        show: true,
                                        options: dropdowns.languages,
                                        validate: validations.lang,
                                        defaultValue: currentUser.lang
                                    }
                                ]
                            }
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
            dropdowns: state.user.dropdowns            
        }),
        { routeBack, changeLanguage, fetchUserDropdowns } // fetchDropdownCascade, clearDropdown,
    )(withTheme()(ChangeLangForm))
));
