import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataTable from '../../../Components/DataTable';
import { Container, ScreenClassRender, Row, Col } from 'react-grid-system';

import { fetchUsers, selectUser, changeFilters } from './duck';
import { changeRoute } from '../../../Common/duck';
import { grey } from 'material-ui/colors';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import update from 'immutability-helper';
import get from 'lodash.get';
import Filters from './filters';
import { translate } from 'react-i18next';

class UserList extends Component {
    submit = values => {
        this.props.changeFilters(
            update(this.props.filters, {
                name: { $set: values.name },
                phone: { $set: values.phone },
                paging: {
                    pageNumber: { $set: 1 },
                    total: { $set: null },
                },
            })
        );
    };

    componentWillMount() {
        this.props.fetchUsers({});
    }

    render() {
        const {
            changeFilters,
            filters,
            changeRoute,
            selectUser,
            selected,
            t
        } = this.props;
        return (
            <div>
                <Container
                    style={{
                        marginTop: 15,
                    }}
                    fluid
                >
                    <Row align="center">
                        <Paper
                            style={{ width: '100%', padding: 15 }}
                            elevation={0}
                        >
                            <Col align="center" xs={12}>
                                <h2 style={{ color: grey[500] }}>{t('List Users')}</h2>
                            </Col>
                            <Filters onSubmit={this.submit} />
                        </Paper>
                    </Row>
                </Container>
                <ScreenClassRender
                    render={screenClass => {
                        const columns = [
                            {
                                header: t('First Name'),
                                key: 'firstName',
                            },
                            {
                                header: t('Last Name'),
                                key: 'lastName',
                            },
                            {
                                header: t('Phone'),
                                key: 'phone',
                            },
                        ];

                        const isSmallScreen =
                            screenClass === 'xs' || screenClass === 'sm';

                        if (!isSmallScreen) {
                            columns.push({
                                width: 70,
                                render: (col, idx, row) => (
                                    <Button
                                        color="primary"
                                        onTouchTap={() =>
                                            changeRoute(
                                                `/user/edit/${row.actorId}`
                                            )
                                        }
                                    >
                                        {t('Edit')}
                                    </Button>
                                ),
                            });
                        }

                        return (
                            <DataTable
                                idProp="id"
                                data={this.props.data}
                                emptyMessage={t("No data to display")}
                                columns={columns}
                                onRowClick={
                                    isSmallScreen &&
                                    (row => changeRoute(`/user/edit/${row.id}`))
                                }
                                onSelect={!isSmallScreen && selectUser}
                                selected={selected}
                                paging={get(filters, ['paging'])}
                                onPageChange={e =>
                                    changeFilters(
                                        update(filters, {
                                            paging: { pageNumber: { $set: e } },
                                        })
                                    )
                                }
                                onPageSizeChange={e =>
                                    changeFilters(
                                        update(filters, {
                                            paging: { pageSize: { $set: e } },
                                        })
                                    )
                                }
                                showCheckboxes={!isSmallScreen}
                                enableSelectAll
                            />
                        );
                    }}
                />
            </div>
        );
    }
}

export default translate()(connect(
    state => ({
        data: state.user.userList.data,
        selected: state.user.userList.selected,
        filters: state.user.userList.filters,
    }),
    { fetchUsers, selectUser, changeRoute, changeFilters }
)(UserList));
