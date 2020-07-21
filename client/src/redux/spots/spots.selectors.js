import { createSelector } from 'reselect';

const selectSpots = state => state.spots;

export const selectSpotsPreview = createSelector([selectSpots], spots =>
  spots.spotsPreview ? spots.spotsPreview.data : null
);

export const selectAllSpots = createSelector([selectSpots], spots =>
  spots.spots ? spots.spots : null
);

export const selectSpotById = spotIdParam =>
  createSelector([selectAllSpots], spotsData =>
    spotsData ? spotsData.find(spot => spot._id === spotIdParam) : null
  );

export const selectSingleSpot = createSelector([selectSpots], spots =>
  spots.singleSpot ? spots.singleSpot.data : null
);
