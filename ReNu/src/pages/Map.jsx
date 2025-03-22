import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400%',
  height: '700px',
};

const center = {
  // Seattle Lat, Lng 
  lat: 47.608013,
  lng: -122.335167,
};

const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <div>
      <h2>Google Map Page</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >\
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Map


