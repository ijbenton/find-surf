export function serialize(form) {
  let data = {
    location: {
      coordinates: [0, 0]
    }
  };
  if (!form || form.nodeName !== 'FORM') {
    return;
  }
  var i,
    j,
    q = [];
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    if (form.elements[i].value === '') {
      continue;
    }

    switch (form.elements[i].name) {
      case 'description':
        data.description = form.elements[i].value;
        break;
      case 'area2':
        data.area2 = form.elements[i].value;
        break;
      case 'area1':
        data.area1 = form.elements[i].value;
        break;
      case 'region':
        data.region = form.elements[i].value;
        break;
      case 'country':
        data.country = form.elements[i].value;
        break;
      case 'name':
        data.spotName = form.elements[i].value;
        break;
      case 'longitude':
        data.location.coordinates[0] = form.elements[i].value;
        break;
      case 'latitude':
        data.location.coordinates[1] = form.elements[i].value;
        break;
      default:
        break;
    }
  }
  if (
    data.location.coordinates[0] === 0 &&
    data.location.coordinates[1] === 0
  ) {
    delete data.location;
  }
  return data;
}
