import React from 'react';

interface WeatherSummaryProps {
  data: {
    temp: number;
    feels_like: number;
    main: string;
    minTemp: number;
    maxTemp: number;
    dominantCondition: string;
  };
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({ data }) => {
  return (
    <div className="weather-summary">
      <h2>Weather Summary</h2>
      <p>Current Temperature: {data.temp}°C</p>
      <p>Feels Like: {data.feels_like}°C</p>
      <p>Min Temperature: {data.minTemp}°C</p>
      <p>Max Temperature: {data.maxTemp}°C</p>
      <p>Dominant Condition: {data.dominantCondition}</p>
    </div>
  );
};

export default WeatherSummary;
