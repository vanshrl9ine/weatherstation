import { NextResponse } from 'next/server';
import { fetchWeather } from '@/lib/weatherService';

export async function GET(request: Request) {
  const city = request.url.split('?city=')[1] || 'Delhi'; // Default to Delhi
  const weatherData = await fetchWeather(city);
  return NextResponse.json(weatherData);
}
