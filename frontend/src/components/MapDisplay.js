import React, { useEffect, useRef } from 'react';

const MapDisplay = ({ routeData, crimes }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 14,
        center: routeData.legs[0].start_location,
      });

      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsRenderer.setDirections({
        routes: [routeData],
      });

      // Add crime markers
      crimes.forEach((crime) => {
        new window.google.maps.Marker({
          position: { lat: crime.lat, lng: crime.lon },
          map,
          title: crime.offense_description,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          },
        });
      });
    } else {
      console.error('Google Maps JavaScript API not loaded.');
    }
  }, [routeData, crimes]);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

export default MapDisplay;
