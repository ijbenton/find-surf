export const findByIdAndUpdate = (singleSpot, updatedSpot) => {
  let oldSpot = singleSpot.data.findIndex(
    spot => spot.slug == updatedSpot.data.slug
  );
  singleSpot.data[oldSpot] = updatedSpot.data;
  return singleSpot;
};
