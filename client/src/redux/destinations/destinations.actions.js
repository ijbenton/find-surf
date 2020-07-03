import axios from 'axios';
import { returnErrors } from '../error/error.actions';

import {
  DESTINATIONS_FAILURE,
  DESTINATIONS_LOADING,
  DESTINATIONS_LOADED,
  DESTINATIONS_PREVIEW_FAILURE,
  DESTINATIONS_PREVIEW_LOADING,
  DESTINATIONS_PREVIEW_LOADED
} from './destinations.types';

export const getDestinations = (pageNum) => dispatch => {
  dispatch({ type: DESTINATIONS_LOADING });

  axios
    .get(`/api/v1/destinations?page=${pageNum}`)
    .then(res =>
      dispatch({
        type: DESTINATIONS_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'DESTINATIONS_FAILURE'
        )
      );
      dispatch({
        type: DESTINATIONS_FAILURE
      });
    });
};

export const getDestinationsPreview = () => dispatch => {
  dispatch({ type: DESTINATIONS_PREVIEW_LOADING });

  axios
    .get(`/api/v1/destinations?limit=5`)
    .then(res =>
      dispatch({
        type: DESTINATIONS_PREVIEW_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'DESTINATIONS_FAILURE'
        )
      );
      dispatch({
        type: DESTINATIONS_PREVIEW_FAILURE
      });
    });
};
