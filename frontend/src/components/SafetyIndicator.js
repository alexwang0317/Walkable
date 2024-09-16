import React from 'react';

const SafetyIndicator = ({ safetyData }) => {
  return (
    <div>
      <h2>Safety Score: {safetyData.score}/10</h2>
      <p>{safetyData.details}</p>
    </div>
  );
};

export default SafetyIndicator;
