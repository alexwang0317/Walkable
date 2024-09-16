import React, { useState } from 'react';
import InputForm from './components/InputForm';
import MapDisplay from './components/MapDisplay';
import SafetyIndicator from './components/SafetyIndicator';
import { getRouteData, getSafetyData } from './services/api';
import useLoadScript from './hooks/useLoadScript';

function App() {
  const [routeData, setRouteData] = useState(null);
  const [safetyData, setSafetyData] = useState(null);
  const [crimes, setCrimes] = useState([]);

  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=visualization`;

  const scriptLoaded = useLoadScript(scriptUrl);

  const handleFormSubmit = async ({ startLocation, endLocation }) => {
    try {
      // Fetch route data from the backend
      const route = await getRouteData(startLocation, endLocation);
      setRouteData(route);

      // Extract coordinates from the route for safety assessment
      const routeCoordinates = [];
      route.legs[0].steps.forEach((step) => {
        routeCoordinates.push({
          lat: step.start_location.lat,
          lng: step.start_location.lng,
        });
      });

      // Fetch safety data from the backend
      const safetyResponse = await getSafetyData(routeCoordinates);
      setSafetyData(safetyResponse.safetyData);
      setCrimes(safetyResponse.crimes);
    } catch (error) {
      alert('Failed to fetch route and safety data.');
      console.error(error);
    }
  };

  if (!scriptLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <div className="App">
      <h1>Walkable? To Uber or not to Uber</h1>
      <InputForm onSubmit={handleFormSubmit} />
      {routeData && <MapDisplay routeData={routeData} crimes={crimes} />}
      {safetyData && <SafetyIndicator safetyData={safetyData} />}
    </div>
  );
}

export default App;
