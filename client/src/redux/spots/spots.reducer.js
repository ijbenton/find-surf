import {
  SPOTS_FAILURE,
  SPOTS_LOADED,
  SPOTS_LOADING,
  UPDATE_SPOT_FAILURE,
  UPDATE_SPOT_START,
  UPDATE_SPOT_SUCCESS
} from './spots.types';

import { findByIdAndUpdate } from './spots.utils';

const initialState = {
  spots: null,
  isLoading: false,
  isUpdating: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SPOTS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SPOTS_LOADED:
      return {
        ...state,
        isLoading: false,
        spots: action.payload
      };
    case SPOTS_FAILURE:
      return {
        ...state,
        spots: null,
        isLoading: false
      };
    case UPDATE_SPOT_START:
      return {
        ...state,
        isUpdating: true
      };
    case UPDATE_SPOT_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        spots: findByIdAndUpdate(state.spots, action.payload)
      };
    case UPDATE_SPOT_FAILURE:
      return {
        ...state,
        isUpdating: false
      };
    default:
      return state;
  }
}
