const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/route', async (req, res) => {
  const { startLocation, endLocation } = req.body;

  // Validate that startLocation and endLocation are provided
  if (!startLocation || !endLocation) {
    return res.status(400).json({ error: 'Missing start or end location' });
  }

  try {
    // Fetch route from Google Maps Directions API
    const directionsResponse = await axios.get(
      'https://maps.googleapis.com/maps/api/directions/json',
      {
        params: {
          origin: startLocation,  // Can be an address or coordinates
          destination: endLocation,  // Can be an address or coordinates
          mode: 'walking',
          key: process.env.GOOGLE_MAPS_API_KEY,  // Make sure the key is valid
        },
      }
    );

    const route = directionsResponse.data.routes[0];

    if (!route) {
      return res.status(404).json({ error: 'No route found' });
    }

    res.json({ route });
  } catch (error) {
    console.error('Error fetching route data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch route data.' });
  }
});

module.exports = router;
