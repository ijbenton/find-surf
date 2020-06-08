import { createSelector } from 'reselect';

const selectDestinations = state => state.destinations;

export const selectDestinationsData = createSelector(
  [selectDestinations],
  destinations =>
    destinations.destinations ? destinations.destinations.data : null
);

export const selectDestinationById = destinationIdParam =>
  createSelector([selectDestinationsData], destinationsData =>
    destinationsData
      ? destinationsData.find(
          destination => destination._id === destinationIdParam
        )
      : null
  );
