import React from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { updateSpot } from '../../../redux/spots/spots.actions';

import './UpdateSpot.scss';
import { serialize } from '../../../utils/serializeForm';
const UpdateSpot = ({ updateSpot }) => {
  const match = useRouteMatch();

  const onSubmit = e => {
    e.preventDefault();
    let data = JSON.stringify(serialize(e.target));
    updateSpot(match.params.spotId, data);
  };
  return (
    <div className="update-spot">
      <form onSubmit={onSubmit} className="update-form">
        <label htmlFor="longitude">Longitude</label>
        <input type="text" name="longitude" id="longitude" />
        <label htmlFor="latitude">Latitude</label>
        <input type="text" name="latitude" id="latitude" />
        <label htmlFor="name">Spot Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="country">Country</label>
        <input type="text" name="country" id="country" />
        <label htmlFor="region">Region</label>
        <input type="text" name="region" id="region" />
        <label htmlFor="area1">Area1</label>
        <input type="text" name="area1" id="area1" />
        <label htmlFor="area2">Area2</label>
        <input type="text" name="area2" id="area2" />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="20"
          rows="5"
        ></textarea>
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateSpot: (spotId, formData) => dispatch(updateSpot(spotId, formData))
});

export default connect(null, mapDispatchToProps)(UpdateSpot);
