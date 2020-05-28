import React, { Component } from 'react';
import { connect } from 'react-redux';

import CollectionPreview from '../../components/CollectionPreview/CollectionPreview';

import { getDestinations } from '../../redux/destinations/destinations.actions';

import './Homepage.scss';

class Homepage extends Component {
  componentDidMount() {
    this.props.getDestinations('');
  }
  render() {
    const { destinations } = this.props.destinations;

    return (
      <div className="homepage">
        {destinations ? (
          <CollectionPreview items={destinations.data} title="Destinations" />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  destinations: state.destinations
});

const mapDispatchToProps = dispatch => ({
  getDestinations: queryString => dispatch(getDestinations(queryString))
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
