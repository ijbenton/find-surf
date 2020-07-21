import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SpotItem from '../../components/SpotItem/SpotItem';

import { selectSingleDestination } from '../../redux/destinations/destinations.selectors';
import { getSingleDestination } from '../../redux/destinations/destinations.actions';

import './DestinationDescription.scss';

const DestinationDescriptionPage = ({ destination, getSingleDestination }) => {
  const match = useRouteMatch();
  useEffect(() => {
    getSingleDestination(match.params.destinationSlug);
  }, [match.params.destinationSlug]);
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
    destination: selectSingleDestination
  });

const mapDispatchToProps = dispatch => ({
  getSingleDestination: destinationSlug =>
    dispatch(getSingleDestination(destinationSlug))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DestinationDescriptionPage);
