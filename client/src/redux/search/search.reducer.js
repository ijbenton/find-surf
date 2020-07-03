import { SEARCH_RESULTS_FAILURE, SEARCH_RESULTS_LOADING, SEARCH_RESULTS_SUCCESS } from './search.types';

const initialState = {
    results: null,
    isLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_RESULTS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                results: action.payload,
                isLoading: false
            }
        case SEARCH_RESULTS_FAILURE:
            return {
                ...state,
                results: null,
                isLoading: false
            }
        default:
            return state;
    }
}