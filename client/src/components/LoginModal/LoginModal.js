import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import './LoginModal.scss';

class LoginModal extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.error });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  handleClick = e => {
    console.log(e.target.className);
    if (e.target.className === 'lmodal-open') {
      this.toggle();
    }
  };

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    // Attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <div>
        <a href="#" onClick={this.toggle}>
          Login
        </a>

        <div
          className={this.state.modal ? 'lmodal-open' : 'lmodal-closed'}
          onMouseDown={this.handleClick}
        >
          <div className="lmodal-content">
            <div className="modal-header">
              <h3>Login</h3>
              <FontAwesomeIcon icon={faTimes} onClick={this.toggle} />
            </div>
            {this.state.msg ? (
              <span className="alert">{this.state.msg}</span>
            ) : null}
            <form onSubmit={this.onSubmit} className="modal-form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={this.onChange}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={this.onChange}
              />
              <button className="modal-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
