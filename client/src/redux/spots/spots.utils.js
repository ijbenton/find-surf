export const findByIdAndUpdate = (spots, updatedSpot) => {
  let oldSpot = spots.data.findIndex(spot => spot._id == updatedSpot.data._id);
  console.log(updatedSpot.data);
  console.log(spots.data[oldSpot]);
  spots.data[oldSpot] = updatedSpot.data;
  console.log(spots.data[oldSpot]);
  return spots;
};
