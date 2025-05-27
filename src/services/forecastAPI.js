const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

export async function getForecastByDate(city, date) {
  // Fetches a single day’s forecast for a given city and date
  // console.log(date);
  const formattedDate = new Date(date).toISOString().split("T")[0]; // YYYY-MM-DD

  const url = `${BASE_URL}?key=${import.meta.env.VITE_WEATHERAPI_KEY}&q=${encodeURIComponent(
    city
  )}&dt=${formattedDate}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.forecast && data.forecast.forecastday.length > 0) {
      const forecast = data.forecast.forecastday[0].day;
      return {
        dt: formattedDate,
        temp: forecast.avgtemp_c, // average temperature (°C)
        condition: forecast.condition.text,
        icon: forecast.condition.icon,
        maxTemp: forecast.maxtemp_c,
        minTemp: forecast.mintemp_c,
      };
    }

    return null;
  } catch (error) {
    console.error("WeatherAPI forecast fetch failed:", error);
    return null;
  }
}
