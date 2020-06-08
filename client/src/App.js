import React, { Component, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import Spinner from './components/Spinner/Spinner';

import { loadUser } from './redux/auth/auth.actions';

import './App.scss';

const Homepage = lazy(() => import('./pages/Homepage/Homepage'));
const SpotsPage = lazy(() => import('./pages/Spots/Spots'));
const DestinationsPage = lazy(() =>
  import('./pages/Destinations/Destinations')
);

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={Homepage} />
            <Route path="/spots" component={SpotsPage} />
            <Route path="/destinations" component={DestinationsPage} />
          </Suspense>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser())
});

export default connect(null, mapDispatchToProps)(App);
