import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { register } from '../../redux/auth/auth.actions';
import { clearErrors } from '../../redux/error/error.actions';

import './RegisterModal.scss';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
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
    if (e.target.className === 'rmodal-open') {
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

    const { name, email, password } = this.state;

    const user = {
      name,
      email,
      password
    };

    // Attempt to register
    this.props.register(user);
  };

  render() {
    return (
      <div>
        <a href="#" onClick={this.toggle}>
          Register
        </a>

        <div
          className={this.state.modal ? 'rmodal-open' : 'rmodal-closed'}
          onMouseDown={this.handleClick}
        >
          <div className="rmodal-content">
            <div className="modal-header">
              <h3>Register</h3>
              <FontAwesomeIcon icon={faTimes} onClick={this.toggle} />
            </div>
            {this.state.msg ? (
              <span className="alert">{this.state.msg}</span>
            ) : null}
            <form onSubmit={this.onSubmit} className="modal-form">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={this.onChange}
              />
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
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
