import {
  DESTINATIONS_FAILURE,
  DESTINATIONS_LOADED,
  DESTINATIONS_LOADING,
  DESTINATIONS_PREVIEW_FAILURE,
  DESTINATIONS_PREVIEW_LOADED,
  DESTINATIONS_PREVIEW_LOADING
} from './destinations.types';

const initialState = {
  destinations: null,
  isLoading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DESTINATIONS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case DESTINATIONS_LOADED:
      return {
        ...state,
        isLoading: false,
        destinations: action.payload
      };
    case DESTINATIONS_FAILURE:
      return {
        ...state,
        destinations: null,
        isLoading: false
      };
    case DESTINATIONS_PREVIEW_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case DESTINATIONS_PREVIEW_LOADED:
      return {
        ...state,
        isLoading: false,
        destinations: action.payload
      };
    case DESTINATIONS_PREVIEW_FAILURE:
      return {
        ...state,
        destinations: null,
        isLoading: false
      };
    default:
      return state;
  }
}
