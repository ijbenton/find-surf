import axios from 'axios';
import { search } from './search.utils';
import { returnErrors } from '../error/error.actions';

import {
  SEARCH_RESULTS_FAILURE,
  SEARCH_RESULTS_LOADING,
  SEARCH_RESULTS_SUCCESS
} from './search.types';

export const getSearchResults = (term, type) => dispatch => {
  dispatch({ type: SEARCH_RESULTS_LOADING });

  search(`/api/v1/search?term=${term}&type=${type}`)
    .then(res =>
      dispatch({
        type: SEARCH_RESULTS_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err));
      dispatch({ type: SEARCH_RESULTS_FAILURE });
    });
};
