const BASE_URL = "https://api.openweathermap.org/geo/1.0/direct";

export async function getCoordinates(city) {
  // Fetches geographic coordinates (latitude, longitude) for the given city
  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&limit=1&appid=${import.meta.env.VITE_OW_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error(`No coordinates found for city: ${city}`);
    }

    // Return the first (and only) result’s coordinates and country
    return {
      city,               // The normalized city name
      lat: data[0].lat,   // Latitude
      lon: data[0].lon,   // Longitude
      country: data[0].country, // ISO country code
    };
  } catch (err) {
    console.error("Error in getCoordinates:", err);
    return null;
  }
}
