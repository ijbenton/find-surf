import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CollectionPreview from '../../components/CollectionPreview/CollectionPreview';
import DestinationItem from '../../components/DestinationItem/DestinationItem';

import { getDestinationsPreview } from '../../redux/destinations/destinations.actions';
import { getSpotsPreview } from '../../redux/spots/spots.actions';

import './Homepage.scss';

class Homepage extends Component {
  componentDidMount() {
    this.props.getDestinationsPreview();
    this.props.getSpotsPreview();
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
        {spots ? (
          <CollectionPreview
            items={spots.data}
            title="Spots"
            spots={true}
            routeName="spots"
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
  getDestinationsPreview: () => dispatch(getDestinationsPreview()),
  getSpotsPreview: () => dispatch(getSpotsPreview())
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
