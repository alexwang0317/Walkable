import axios from 'axios';

export const getRouteData = async (startLocation, endLocation) => {
  try {
    const response = await axios.post('http://localhost:4000/api/route', {
      startLocation,
      endLocation,
    });
    return response.data.route;
  } catch (error) {
    console.error('Error fetching route data', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getSafetyData = async (routeCoordinates) => {
  try {
    const response = await axios.post('http://localhost:4000/api/safety', {
      routeCoordinates,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching safety data', error.response ? error.response.data : error.message);
    throw error;
  }
};

