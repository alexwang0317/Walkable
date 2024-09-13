-- Table to store crime data
CREATE TABLE crime_data (
  id SERIAL PRIMARY KEY,
  incident_number VARCHAR(20),
  offense_code INTEGER,
  offense_description VARCHAR(255),
  occurred_on_date TIMESTAMP,
  lat DOUBLE PRECISION,
  lon DOUBLE PRECISION,
  location GEOGRAPHY(Point, 4326)
);

CREATE INDEX idx_crime_data_location ON crime_data USING GIST(location);
