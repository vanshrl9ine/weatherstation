import { NextResponse } from 'next/server';
import { fetchWeather } from '@/lib/weatherService';
import { Client } from 'pg'; // Import PostgreSQL client

export async function GET(request: Request) {
    const city = request.url.split('?city=')[1] || 'Delhi'; // Default to Delhi
    const weatherData = await fetchWeather(city);

    // Step 1: Prepare data to be inserted
    const { name: cityName, main: { temp: temperature }, weather } = weatherData;
    const weatherCondition = weather[0].description;

    // Step 2: Insert fetched data into the database
    const client = new Client({
        connectionString: process.env.NEON_DB_CONNECTION_STRING, // Use your connection string
    });

    try {
        await client.connect();

        const query = `
            INSERT INTO weather_data (city, temperature, weather_condition)
            VALUES ($1, $2, $3)
        `;
        const values = [cityName, temperature, weatherCondition];

        await client.query(query, values);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await client.end();
    }

    return NextResponse.json(weatherData);
}
