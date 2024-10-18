'use client';
import React, { useEffect, useState } from 'react';
import WeatherSummary from './components/WeatherSummary';
import Alert from './components/alert';
import Visualization from './components/visualization';

interface WeatherData {
  temp: number;
  feels_like: number;
  main: string;
}

const HomePage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [dailyData, setDailyData] = useState({ minTemp: 0, maxTemp: 0, dominantCondition: '' });
  const [temperatures, setTemperatures] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const alertThreshold = 35; // Example threshold

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/weather?city=Delhi`);
      const data = await res.json();
      const { temp, feels_like, main } = data.main;

      setWeatherData({ temp, feels_like, main });

      // Add to history for visualization
      setTemperatures((prev) => [...prev, temp]);
      setLabels((prev) => [...prev, new Date().toLocaleTimeString()]);

      // Aggregate daily data (you can expand this logic)
      setDailyData((prev) => ({
        ...prev,
        minTemp: Math.min(prev.minTemp || temp, temp),
        maxTemp: Math.max(prev.maxTemp || temp, temp),
        dominantCondition: data.weather[0].main, // Just using the latest condition for simplicity
      }));
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 *1000); // Fetch every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Weather Monitoring System</h1>

      {weatherData && <WeatherSummary data={{ ...weatherData, ...dailyData }} />}
      {weatherData && <Alert temp={weatherData.temp} threshold={alertThreshold} />}
      <Visualization labels={labels} data={temperatures} />
    </div>
  );
};

export default HomePage;
