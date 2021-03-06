import React from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from '../Marker/Marker';

const Map = ({ location, spotName }) => {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  let coordinates = {
    center: {
      lat: location.coordinates[1],
      lng: location.coordinates[0]
    },
    zoom: 11
  };

  const getMapOptions = maps => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        }
      ]
    };
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDDlEf5_EQ20BqGalNUQEF6KlwKbqfpRPw' }}
        defaultCenter={defaultProps.center}
        center={coordinates.center}
        defaultZoom={defaultProps.zoom}
        options={getMapOptions}
      >
        <Marker
          lat={location.coordinates[1]}
          lng={location.coordinates[0]}
          text={spotName}
          color="red"
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
