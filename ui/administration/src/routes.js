import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router';

import Header from './Pages/Header';
import { Container } from 'react-grid-system';
import StatusDialog from './Components/StatusDialog';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Settings from './Pages/Settings';
import UserList from './Pages/User/List';
import UserCreate from './Pages/User/Create';
// import UserEdit from './Pages/User/Edit';

class Routes extends Component {
  render() {
    if (!this.props.currentUser) {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <StatusDialog />
          <Route path="/" component={Login} />
        </div>
      );
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <StatusDialog />
        <Header />
        <Container>
          <Switch>
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/user/list" component={UserList} />
            <Route exact path="/user/create" component={UserCreate} />
            {/*<Route exact path="/user/edit/:id" component={UserEdit} />*/}
            <Route path="/" component={Dashboard} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({ currentUser: state.auth.currentUser }))(Routes)
);
