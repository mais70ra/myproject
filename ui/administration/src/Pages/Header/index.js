import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui-icons/Settings';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import Divider from 'material-ui/Divider';

import { ScreenClassRender } from 'react-grid-system';
import { LinearProgress } from 'material-ui/Progress';

import { changeRoute } from '../../Common/duck';
import { logout } from '../Login/duck';

const styles = ({ palette }) => ({
  contrast: {
    color: palette.primary.contrastText
  }
});


class Header extends Component {
  state = {
    openMenu: ''
  };

  componentWillMount = () => {
    // this.props.fetchDropdowns();
  };

  handleMenu = e =>
  this.setState({ anchorEl: e.currentTarget, open: e.currentTarget.id });

  handleClose = () => this.setState({ anchorEl: null, open: '' });

  changeRoute = route => {
    this.handleClose();
    this.props.changeRoute(route);
  };

  render() {
    const { anchorEl, open } = this.state;
    const { classes, t } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <ScreenClassRender
              render={screenClass => {
                if (screenClass === 'xs' || screenClass === 'sm') {
                  return (
                    <IconButton className={classes.contrast} id="user" onClick={this.handleMenu}>
                      <MenuIcon />
                    </IconButton>
                  );
                }

                return (
                  <Button className={classes.contrast} id="user" onClick={this.handleMenu}>
                    {t('Users')}
                  </Button>
                );
              }}
            />
            <Menu
              open={open === 'user'}
              onClose={this.handleClose}
              anchorEl={anchorEl}
            >
              <MenuItem
                onTouchTap={() => this.changeRoute('/user/create')}
              >
                {t('Create User')}
              </MenuItem>
              <Divider />
              <MenuItem onTouchTap={() => this.changeRoute('/user/list')}>
                {t('List Users')}
              </MenuItem>
            </Menu>
            <div style={{ flex: 1 }} />
            <IconButton className={classes.contrast} id="settings" onClick={this.handleMenu}>
              <SettingsIcon />
            </IconButton>
            <Menu
              open={open === 'settings'}
              onClose={this.handleClose}
              anchorEl={anchorEl}
            >
              <MenuItem onTouchTap={() => this.changeRoute('/settings')}>
              {t('Settings')}
              </MenuItem>
              <Divider />
              <MenuItem onTouchTap={this.props.logout}>{t('Logout')}</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <LinearProgress
          style={{
            backgroundColor: 'inherit',
            visibility: this.props.requests > 0 ? 'inherit' : 'hidden'
          }}
          color="secondary"
        />
      </div>
    );
  }
}

Header.propTypes = {
  changeRoute: PropTypes.func,
  logout: PropTypes.func
};

export default translate()(connect(
  state => ({
    requests: state.online.requests
  }),
  { changeRoute, logout }
)(withStyles(styles)(Header)));
