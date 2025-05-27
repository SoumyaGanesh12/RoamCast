import { useState } from "react";
import StopCard from "./components/StopCard";
import "./App.css";

import { getCoordinates } from "./services/locationAPI";
import { getForecastByDate } from "./services/forecastAPI";
import { normalizePlaceName } from "./langchain/normalizePlacename";
import { summarizeForecast } from "./langchain/summarizeForecast";

function App() {
  const today = new Date();
  const maxDateObj = new Date();
  // Restrict to picking a date within 14 days to ensure weather forecast accuracy using WeatherAPI
  maxDateObj.setDate(today.getDate() + 14);
  // console.log(maxDateObj);
  const maxDate = maxDateObj.toISOString().split("T")[0];
  // console.log(maxDate);

  const [stops, setStops] = useState([{ city: "", date: "" }]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateStop = (i, upd) =>
    setStops((p) => p.map((s, idx) => (idx === i ? upd : s)));

  // Removes both the stop and its corresponding forecast entry
  const removeStop = (i) => {
    setStops((p) => p.filter((_, idx) => idx !== i));
    setEntries((p) => p.filter((_, idx) => idx !== i));
  };

  const addStop = () => {
    setStops((p) => [...p, { city: "", date: "" }]);
    setEntries((p) => [...p, null]);
  };

  const handleFetch = async () => {
    // Validation
    for (let { city, date } of stops) {
      if (!city.trim() || !date) {
        alert("Please fill in both city and date for every stop.");
        return;
      }
      if (city.includes("\n")) {
        alert("Please only enter one destination per card.");
        return;
      }
    }
    setLoading(true);

    // Parallel API calls for each stop
    const results = await Promise.all(
      stops.map(async ({ city, date }) => {
        const norm = await normalizePlaceName(city);
        const { lat, lon, country } = await getCoordinates(norm);
        const forecast = await getForecastByDate(norm, date);
        const summary = await summarizeForecast(forecast, norm, date);
        return { city: norm, date, lat, lon, country, forecast, summary };
      })
    );

    // console.log("Results array with forecast details -", results);

    setEntries(results);
    setLoading(false);
  };

  return (
    <div className="app-root">
      <header className="hero-banner">
        <h1>🌦️ RoamCast</h1>
        <p>Your personalized weather guide for every stop on your journey!</p><br/>
        <div className="button-row">
          <button
            className="btn-primary"
            onClick={handleFetch}
            disabled={loading}
          >
            {loading ? "Planning..." : "Get Forecasts"}
          </button>
        </div>

      </header>

      
      <section className="trip-form-section">
        <div className="stops-grid">
          {stops.map((stop, i) => (
            <StopCard
              key={i}
              stop={stop}
              forecastEntry={entries[i]}
              maxDate={maxDate}
              onChange={(upd) => updateStop(i, upd)}
              onRemove={() => removeStop(i)}
            />
          ))}

          <div className="stop-card add-stop-card" onClick={addStop}>
            ＋ Add Stop
          </div>
        </div>
      </section>

      <footer className="app-footer">
        📢 Please follow official weather alerts and local news before your
        trip. Stay safe and enjoy your journey!
      </footer>
    </div>
  );
}

export default App;
