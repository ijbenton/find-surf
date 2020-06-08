import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SpotItem from '../../components/SpotItem/SpotItem';

import {
  selectDestinationById,
  selectDestinationsData
} from '../../redux/destinations/destinations.selectors';
import { getDestinations } from '../../redux/destinations/destinations.actions';

import './DestinationDescription.scss';

const DestinationDescriptionPage = ({
  destination,
  destinations,
  getDestinations
}) => {
  if (!destinations) {
    getDestinations();
  }
  const match = useRouteMatch();
  return (
    <div className="destination-page">
      {destination ? (
        <div className="destination-container">
          {destination.spots
            ? destination.spots.map(spot => (
                <SpotItem item={spot} key={spot._id} />
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    destination: selectDestinationById(ownProps.match.params.destinationId),
    destinations: selectDestinationsData
  });

const mapDispatchToProps = dispatch => ({
  getDestinations: () => dispatch(getDestinations())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DestinationDescriptionPage);
