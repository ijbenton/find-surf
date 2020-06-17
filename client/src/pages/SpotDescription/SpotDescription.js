import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Map from '../../components/Map/Map';
import AdminControls from '../../components/AdminControls/AdminControls';

import { selectSpotById } from '../../redux/spots/spots.selectors';
import { selectUser } from '../../redux/auth/auth.selectors';

import { getSpots } from '../../redux/spots/spots.actions';

import './SpotDescription.scss';

const SpotDescriptionPage = ({ spot, user, getSpots }) => {
  const match = useRouteMatch();
  if (!spot) {
    getSpots();
  }
  return (
    <div className="spot-page">
      {spot ? (
        <div className="spot-container">
          <div className="img-container">
            <h3 className="spot-name">{spot.spotName}</h3>
            <h6 className="spot-region">{`${spot.area1}, ${spot.region}`}</h6>
            <img
              src={require(`../../../src/assets/uploads/${spot.photos[0]}`)}
              alt=""
              className="spot-img"
            />
            <h4>Best Conditions</h4>
            <h6>
              Swell Direction: <span>{spot.swellDirection}</span>
            </h6>
            <h6>
              Wave Height: <span>{spot.bestSize}</span>
            </h6>
            <h6>
              Tide: <span>{spot.bestTide}</span>
            </h6>
            <h6>
              Wind: <span>{spot.bestWind}</span>
            </h6>
          </div>
          <Map location={spot.location} spotName={spot.spotName} />
        </div>
      ) : null}
      <p className="spot-description">
        {spot && spot.description ? spot.description : 'No Spot Description'}
      </p>
      {user && user.role === 'admin' ? <AdminControls /> : null}
    </div>
  );
};

const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    spot: selectSpotById(ownProps.match.params.spotId),
    user: selectUser
  });

const mapDispatchToProps = dispatch => ({
  getSpots: () => dispatch(getSpots())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotDescriptionPage);
