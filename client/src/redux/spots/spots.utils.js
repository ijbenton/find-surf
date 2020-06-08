export const findByIdAndUpdate = (spots, updatedSpot) => {
  let oldSpot = spots.findIndex(spot => spot.id == updatedSpot.id);
  spots[oldSpot] = updatedSpot;
  return spots;
};
