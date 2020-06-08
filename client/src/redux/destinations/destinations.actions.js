import axios from 'axios';
import { returnErrors } from '../error/error.actions';

import {
  DESTINATIONS_FAILURE,
  DESTINATIONS_LOADING,
  DESTINATIONS_LOADED
} from './destinations.types';

export const getDestinations = () => dispatch => {
  dispatch({ type: DESTINATIONS_LOADING });

  axios
    .get(`/api/v1/destinations?limit=1000`)
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
