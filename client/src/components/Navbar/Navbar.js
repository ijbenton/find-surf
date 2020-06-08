import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import Logout from '../Logout/Logout';
import Searchbar from '../Searchbar/Searchbar';
import { ReactComponent as Logo } from '../../assets/wave.svg';

import './Navbar.scss';

class Navbar extends Component {
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
          <Searchbar />
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
