import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../../components/CollectionPreview/CollectionPreview';
import DestinationItem from '../../components/DestinationItem/DestinationItem';
import Spinner from '../../components/Spinner/Spinner';

import { getDestinationsPreview } from '../../redux/destinations/destinations.actions';
import { getSpotsPreview } from '../../redux/spots/spots.actions';
import { selectDestinationsPreview } from '../../redux/destinations/destinations.selectors';
import { selectSpotsPreview } from '../../redux/spots/spots.selectors';

import './Homepage.scss';

class Homepage extends Component {
  componentDidMount() {
    this.props.getDestinationsPreview();
    this.props.getSpotsPreview();
  }
  render() {
    return (
      <div className="homepage">
        {this.props.destinations ? (
          <CollectionPreview
            items={this.props.destinations}
            title="Destinations"
            destinations={true}
            routeName="destinations"
          />
        ) : (
          <Spinner />
        )}
        {this.props.spots ? (
          <CollectionPreview
            items={this.props.spots}
            title="Spots"
            spots={true}
            routeName="spots"
          />
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = state =>
  createStructuredSelector({
    destinations: selectDestinationsPreview,
    spots: selectSpotsPreview
  });

const mapDispatchToProps = dispatch => ({
  getDestinationsPreview: () => dispatch(getDestinationsPreview()),
  getSpotsPreview: () => dispatch(getSpotsPreview())
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
