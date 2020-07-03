import axios from 'axios';
import { returnErrors } from '../error/error.actions';

import { SEARCH_RESULTS_FAILURE, SEARCH_RESULTS_LOADING, SEARCH_RESULTS_SUCCESS } from './search.types';

export const getSearchResults = term => dispatch => {
    dispatch({ type: SEARCH_RESULTS_LOADING });

    axios.get(`/api/v1/search?term=${term}`).then(res => dispatch({
        type: SEARCH_RESULTS_SUCCESS,
        payload: res.data
    })).catch(err => {
        dispatch(returnErrors(err));
        dispatch({ type: SEARCH_RESULTS_FAILURE })
    })
}