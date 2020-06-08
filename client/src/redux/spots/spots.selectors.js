import { createSelector } from 'reselect';

const selectSpots = state => state.spots;

export const selectSpotsData = createSelector([selectSpots], spots =>
  spots.spots ? spots.spots.data : null
);

export const selectSpotById = spotIdParam =>
  createSelector([selectSpotsData], spotsData =>
    spotsData ? spotsData.find(spot => spot._id === spotIdParam) : null
  );
