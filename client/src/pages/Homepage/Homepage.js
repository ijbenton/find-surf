import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CollectionPreview from '../../components/CollectionPreview/CollectionPreview';
import DestinationItem from '../../components/DestinationItem/DestinationItem';

import { getDestinations } from '../../redux/destinations/destinations.actions';
import { getSpots } from '../../redux/spots/spots.actions';

import './Homepage.scss';

class Homepage extends Component {
  componentDidMount() {
    if (!this.props.destinations.destinations || !this.props.spots.spots) {
      this.props.getDestinations();
      this.props.getSpots();
    }
  }
  render() {
    const { destinations } = this.props.destinations;
    const { spots } = this.props.spots;

    return (
      <div className="homepage">
        {destinations ? (
          <CollectionPreview
            items={destinations.data}
            title="Destinations"
            destinations={true}
            routeName="destinations"
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  destinations: state.destinations,
  spots: state.spots
});

const mapDispatchToProps = dispatch => ({
  getDestinations: () => dispatch(getDestinations()),
  getSpots: () => dispatch(getSpots())
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
