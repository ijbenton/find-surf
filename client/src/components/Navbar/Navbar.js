import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import Logout from '../Logout/Logout';
import Searchbar from '../Searchbar/Searchbar';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';
import { ReactComponent as Logo } from '../../assets/wave.svg';

import './Navbar.scss';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchOpen: false
    };
  }

  closeSearch = () => {
    this.setState({
      isSearchOpen: false
    });
  };

  openSearch = () => {
    this.setState({
      isSearchOpen: true
    });
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <span>
          <strong>{user ? `Welcome ${user.name}` : ''}</strong>
        </span>
        <Logout />
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <LoginModal />
        <RegisterModal />
      </Fragment>
    );

    return (
      <nav>
        <div className="left">
          <Link to="/">
            <div className="logoContainer">
              <Logo></Logo>
              <span>FindSurf</span>
            </div>
          </Link>
          <OutsideAlerter
            isSearchOpen={this.state.isSearchOpen}
            closeSearch={this.closeSearch}
          >
            <Searchbar
              isSearchOpen={this.state.isSearchOpen}
              closeSearch={this.closeSearch}
              openSearch={this.openSearch}
            />
          </OutsideAlerter>
        </div>

        <div className="right">{isAuthenticated ? authLinks : guestLinks}</div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Navbar);
