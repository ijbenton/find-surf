import { createSelector } from 'reselect';

const selectDestinations = state => state.destinations;

export const selectDestinationsPreview = createSelector(
  [selectDestinations],
  destinations =>
    destinations.destinationsPreview
      ? destinations.destinationsPreview.data
      : null
);

export const selectAllDestinations = createSelector(
  [selectDestinations],
  destinations => (destinations.destinations ? destinations.destinations : null)
);

export const selectDestinationById = destinationIdParam =>
  createSelector([selectAllDestinations], destinationsData =>
    destinationsData
      ? destinationsData.find(
          destination => destination._id === destinationIdParam
        )
      : null
  );

export const selectSingleDestination = createSelector(
  [selectDestinations],
  destinations =>
    destinations.singleDestination ? destinations.singleDestination.data : null
);
