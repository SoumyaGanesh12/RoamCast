import PropTypes from "prop-types";

export default function StopCard({
  stop,
  forecastEntry,
  maxDate,
  onChange,
  onRemove,
}) {
  const { city, date } = stop;
  const hasForecast = !!forecastEntry; // Explicit check of truthiness

  // format date header
  const headerText = hasForecast
    ? new Date(date).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).toUpperCase()
    : "DESTINATION";

  const handleField = (field) => (e) =>
    onChange({ ...stop, [field]: e.target.value });

  return (
    <div className="stop-card">
      <button
        className="btn-remove"
        onClick={onRemove}
        aria-label="Remove stop"
      >
        ✕
      </button>

      <div className="card-header">{headerText}</div>

      {hasForecast ? (
        <>
          <div className="card-city">{city}</div>
          <img
            className="card-icon"
            src={`https:${forecastEntry.forecast.icon}`}
            alt={forecastEntry.forecast.condition}
          />
          <div className="card-temp">
            {Math.round(forecastEntry.forecast.temp)}°
          </div>
          <div className="card-range">
            H {Math.round(forecastEntry.forecast.maxTemp)}° / L{" "}
            {Math.round(forecastEntry.forecast.minTemp)}°
          </div>
          <div className="card-summary">{forecastEntry.summary}</div>
        </>
      ) : (
        <>
          <label>
            📍 City, Country
            <input
              type="text"
              placeholder="e.g. Rome, Italy"
              value={city}
              onChange={handleField("city")}
              required
            />
          </label>
          <label>
            📅 Travel Date
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              max={maxDate}
              onChange={handleField("date")}
              required
            />
          </label>
        </>
      )}
    </div>
  );
}

// propTypes - Validates that required props are passed in with correct shapes
StopCard.propTypes = {
  stop: PropTypes.shape({
    city: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  forecastEntry: PropTypes.shape({
    forecast: PropTypes.object,
    summary: PropTypes.string,
  }),
  maxDate: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
