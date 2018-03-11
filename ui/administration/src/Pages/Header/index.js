import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import WifiIcon from 'material-ui/svg-icons/notification/wifi';
import WifiOffIcon from 'material-ui/svg-icons/notification/network-check';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';
import { lightGreenA200, redA200, white } from 'material-ui/styles/colors';

import { changeRoute } from '../../Common/duck';
import { logout } from '../Login/duck';

import { ScreenClassRender } from 'react-grid-system';
import LinearProgress from 'material-ui/LinearProgress';
import muiThemeable from 'material-ui/styles/muiThemeable';
// let fetchDropdowns = () => {

// };


class Header extends Component {
  state = {
    openMenu: ''
  };

  componentWillMount = () => {
    // this.props.fetchDropdowns();
  };

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ScreenClassRender
              render={screenClass => {
                if (screenClass === 'xs' || screenClass === 'sm') {
                  return (
                    <IconMenu
                      iconButtonElement={
                        <IconButton
                          style={{ width: 56, height: 56, padding: 12 }}
                          iconStyle={{ width: 28, height: 28 }}
                        >
                          <MenuIcon color={white} />
                        </IconButton>
                      }
                      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                      targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <MenuItem
                        primaryText="Create user"
                        onTouchTap={() =>
                          this.props.changeRoute('/user/create')
                        }
                      />
                      <Divider />
                      <MenuItem
                        primaryText="List users"
                        onTouchTap={() => this.props.changeRoute('/user/list')}
                      />
                    </IconMenu>
                  );
                }

                return (
                  <IconMenu
                    open={this.state.openMenu === 'user'}
                    iconButtonElement={
                      <FlatButton
                        label="Users"
                        primary
                        labelStyle={{ color: white }}
                        style={{ height: 56 }}
                      />
                    }
                    onRequestChange={() =>
                      this.state.openMenu === 'user'
                        ? this.setState({ openMenu: '' })
                        : this.setState({ openMenu: 'user' })
                    }
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem
                      primaryText="Create user"
                      onTouchTap={() =>
                        this.props.changeRoute('/user/create')
                      }
                    />
                    <Divider />
                    <MenuItem
                      primaryText="List users"
                      onTouchTap={() => this.props.changeRoute('/user/list')}
                    />
                  </IconMenu>
                );
              }}
            />
          </ToolbarGroup>
          <ToolbarGroup>
            {this.props.isOnline ? (
              <WifiIcon style={{ color: lightGreenA200 }}>
                Online
              </WifiIcon>
            ) : (
              <WifiOffIcon style={{ color: redA200 }}>
                Offline
              </WifiOffIcon>
            )}
            <IconMenu
              iconButtonElement={
                <IconButton
                  style={{ width: 56, height: 56, padding: 12 }}
                  iconStyle={{ width: 28, height: 28 }}
                >
                  <SettingsIcon color={white} />
                </IconButton>
              }
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
              <MenuItem
                primaryText="Settings"
                onTouchTap={() => this.props.changeRoute('/settings')}
              />
              <Divider />
              <MenuItem primaryText="Logout" onTouchTap={this.props.logout} />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <LinearProgress
          style={{
            backgroundColor: 'inherit',
            visibility: this.props.requests > 0 ? 'inherit' : 'hidden'
          }}
          color={this.props.muiTheme.palette.accent1Color}
        />
      </div>
    );
  }
}

Header.propTypes = {
  changeRoute: PropTypes.func,
  logout: PropTypes.func
};

export default connect(
  state => ({
    isOnline: state.offline.online,
    requests: state.online.requests
  }),
  { changeRoute, logout } // , fetchDropdowns
)(muiThemeable()(Header));
