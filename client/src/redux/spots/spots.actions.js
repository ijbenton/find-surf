import axios from 'axios';
import { returnErrors } from '../error/error.actions';

import {
  SPOTS_FAILURE,
  SPOTS_LOADED,
  SPOTS_LOADING,
  SINGLE_SPOT_FAILURE,
  SINGLE_SPOT_LOADED,
  SINGLE_SPOT_LOADING,
  SPOTS_PREVIEW_FAILURE,
  SPOTS_PREVIEW_LOADED,
  SPOTS_PREVIEW_LOADING,
  UPDATE_SPOT_FAILURE,
  UPDATE_SPOT_START,
  UPDATE_SPOT_SUCCESS
} from './spots.types';

export const getSpots = pageNum => dispatch => {
  dispatch({ type: SPOTS_LOADING });

  axios
    .get(`/api/v1/spots?page=${pageNum}`)
    .then(res =>
      dispatch({
        type: SPOTS_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'SPOTS_FAILURE')
      );
      dispatch({
        type: SPOTS_FAILURE
      });
    });
};

export const getSingleSpot = spotSlug => dispatch => {
  dispatch({ type: SINGLE_SPOT_LOADING });

  axios
    .get(`/api/v1/spots/${spotSlug}`)
    .then(res =>
      dispatch({
        type: SINGLE_SPOT_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'SINGLE_SPOT_FAILURE'
        )
      );
      dispatch({
        type: SINGLE_SPOT_FAILURE
      });
    });
};
export const getSpotsPreview = () => dispatch => {
  dispatch({ type: SPOTS_PREVIEW_LOADING });

  axios
    .get('/api/v1/spots?limit=5')
    .then(res =>
      dispatch({
        type: SPOTS_PREVIEW_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'SPOTS_PREVIEW_FAILURE'
        )
      );
      dispatch({
        type: SPOTS_PREVIEW_FAILURE
      });
    });
};

export const updateSpot = (spotSlug, formData) => dispatch => {
  dispatch({ type: UPDATE_SPOT_START });
  axios
    .put(`/api/v1/spots/${spotSlug}`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res =>
      dispatch({
        type: UPDATE_SPOT_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'UPDATE_SPOT_FAILURE'
        )
      );
      dispatch({
        type: UPDATE_SPOT_FAILURE
      });
    });
};
