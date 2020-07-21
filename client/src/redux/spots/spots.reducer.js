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

import { findByIdAndUpdate } from './spots.utils';

const initialState = {
  spots: null,
  spotsPreview: null,
  singleSpot: null,
  isLoading: false,
  isUpdating: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SPOTS_LOADING:
      return {
        ...state,
        isLoading: true,
        spots: null
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
    case SINGLE_SPOT_LOADING:
      return {
        ...state,
        isLoading: true,
        singleSpot: null
      };
    case SINGLE_SPOT_LOADED:
      return {
        ...state,
        isLoading: false,
        singleSpot: action.payload
      };
    case SINGLE_SPOT_FAILURE:
      return {
        ...state,
        singleSpot: null,
        isLoading: false
      };
    case SPOTS_PREVIEW_LOADING:
      return {
        ...state,
        isLoading: true,
        spotsPreview: null
      };
    case SPOTS_PREVIEW_LOADED:
      return {
        ...state,
        isLoading: false,
        spotsPreview: action.payload
      };
    case SPOTS_PREVIEW_FAILURE:
      return {
        ...state,
        spotsPreview: null,
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
        singleSpot: action.payload
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
