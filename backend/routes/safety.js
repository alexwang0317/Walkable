const express = require('express');
const router = express.Router();
const pool = require('../db/db'); // Ensure this path is correct
const turf = require('@turf/turf');

router.post('/', async (req, res) => {
  const { routeCoordinates } = req.body;

  if (!routeCoordinates) {
    return res.status(400).json({ error: 'Missing route coordinates' });
  }

  try {
    // Convert route coordinates to a LineString geometry
    const lineString = `LINESTRING(${routeCoordinates
      .map((coord) => `${coord.lng} ${coord.lat}`)
      .join(', ')})`;

    // Query crimes within a buffer distance from the route
    const query = `
      SELECT *
      FROM crime_data
      WHERE ST_DWithin(
        location::geography,
        ST_GeomFromText($1, 4326)::geography,
        $2
      )
    `;
    const values = [lineString, 100]; // 100 meters buffer

    const { rows: crimes } = await pool.query(query, values);

    // Calculate safety score
    const safetyScore = calculateSafetyScore(crimes);

    const safetyData = {
      score: safetyScore,
      details: `There are ${crimes.length} crime incidents along your route.`,
    };

    res.json({ safetyData, crimes });
  } catch (error) {
    console.error('Error calculating safety:', error);
    res.status(500).json({ error: 'Failed to calculate safety.' });
  }
});

// Safety score calculation function
function calculateSafetyScore(crimes) {
  let score = 10;
  const weights = {
    // Define weights for different crime types
    Assault: 2,
    'Larceny Theft': 1,
    Robbery: 3,
    // Add more as needed
  };

  crimes.forEach((crime) => {
    const weight = weights[crime.offense_description] || 1; // Default weight
    score -= weight * 0.1; // Adjust deduction as appropriate
  });

  return Math.max(score, 0).toFixed(1);
}

module.exports = router;
