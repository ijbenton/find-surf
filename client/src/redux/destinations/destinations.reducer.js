import {
  DESTINATIONS_FAILURE,
  DESTINATIONS_LOADED,
  DESTINATIONS_LOADING,
  SINGLE_DESTINATION_FAILURE,
  SINGLE_DESTINATION_LOADED,
  SINGLE_DESTINATION_LOADING,
  DESTINATIONS_PREVIEW_FAILURE,
  DESTINATIONS_PREVIEW_LOADED,
  DESTINATIONS_PREVIEW_LOADING
} from './destinations.types';

const initialState = {
  destinations: null,
  destinationsPreview: null,
  singleDestination: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DESTINATIONS_LOADING:
      return {
        ...state,
        isLoading: true,
        destinations: null
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
    case SINGLE_DESTINATION_LOADING:
      return {
        ...state,
        isLoading: true,
        singleDestination: null
      };
    case SINGLE_DESTINATION_LOADED:
      return {
        ...state,
        isLoading: false,
        singleDestination: action.payload
      };
    case SINGLE_DESTINATION_FAILURE:
      return {
        ...state,
        singleDestination: null,
        isLoading: false
      };
    case DESTINATIONS_PREVIEW_LOADING:
      return {
        ...state,
        isLoading: true,
        destinationsPreview: null
      };
    case DESTINATIONS_PREVIEW_LOADED:
      return {
        ...state,
        isLoading: false,
        destinationsPreview: action.payload
      };
    case DESTINATIONS_PREVIEW_FAILURE:
      return {
        ...state,
        destinationsPreview: null,
        isLoading: false
      };
    default:
      return state;
  }
}
