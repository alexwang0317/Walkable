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
      const route = await getRouteData(startLocation, endLocation);
      setRouteData(route);

      const routeCoordinates = route.legs[0].steps.map((step) => ({
        lat: step.start_location.lat,
        lng: step.start_location.lng,
      }));

      const safetyResponse = await getSafetyData(routeCoordinates);
      setSafetyData(safetyResponse.safetyData);
      setCrimes(safetyResponse.crimes);
    } catch (error) {
      alert('Failed to fetch route and safety data.');
      console.error(error);
    }
  };

  if (!scriptLoaded) {
    return <div className="loading">Loading Google Maps...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Walkable?</h1>
        <p className="subtitle">To Uber or not to Uber</p>
      </header>
      <main className="app-main">
        <InputForm onSubmit={handleFormSubmit} />
        {routeData && <MapDisplay routeData={routeData} crimes={crimes} />}
        {safetyData && <SafetyIndicator safetyData={safetyData} />}
      </main>
    </div>
  );
}

export default App;