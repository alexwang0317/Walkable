import React, { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ startLocation, endLocation });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Start Location"
        value={startLocation}
        onChange={(e) => setStartLocation(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="End Location"
        value={endLocation}
        onChange={(e) => setEndLocation(e.target.value)}
        required
      />
      <button type="submit">Find Route</button>
    </form>
  );
};

export default InputForm;
