import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';

import { loadUser } from './actions/authActions';

import './App.scss';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navbar />
        </div>
      </Provider>
    );
  }
}

export default App;
