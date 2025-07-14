import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ city, onClick, onRemove, showRemoveButton = true }) => {
  // Add safety checks and default values
  if (!city || typeof city !== 'object') {
    console.warn('Invalid city data:', city);
    return (
      <div className="weather-card error-card">
        <div className="card-header">
          <h3 className="city-name">Invalid Data</h3>
        </div>
        <div className="card-body">
          <p>Unable to load weather data</p>
        </div>
      </div>
    );
  }

  const getWeatherIcon = (condition) => {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Snow': '❄️',
      'Thunderstorm': '⛈️',
      'Drizzle': '🌦️',
      'Mist': '🌫️',
      'Fog': '🌫️'
    };
    return icons[condition] || '☁️';
  };

  const handleCardClick = (e) => {
    if (e.target.closest('.remove-button')) {
      return;
    }
    if (onClick) {
      onClick(city);
    }
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    console.log('Remove button clicked for:', city);
    if (onRemove) {
      onRemove(city);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(e);
    }
  };

  const cityName = city.name && city.sys?.country 
    ? `${city.name}, ${city.sys.country}` 
    : city.city && city.sys?.country 
    ? `${city.city}, ${city.sys.country}`
    : city.name || city.city || 'Unknown City';
  
  const weatherCondition = city.weather?.[0]?.main || city.condition || 'Unknown';
  const weatherDescription = city.weather?.[0]?.description || city.description || 'No description';
  const temperature = city.main?.temp || city.temp || city.temperature || 0;
  const tempMin = city.main?.temp_min || city.temp_min || temperature;
  const tempMax = city.main?.temp_max || city.temp_max || temperature;
  const pressure = city.main?.pressure || city.pressure || 0;
  const humidity = city.main?.humidity || city.humidity || 0;
  const visibility = city.visibility || 0;
  const windSpeed = city.wind?.speed || city.wind_speed || 0;
  const windDeg = city.wind?.deg || city.wind_deg || 0;
  const sunrise = city.sys?.sunrise || city.sunrise || 0;
  const sunset = city.sys?.sunset || city.sunset || 0;

  // Format current time
  const now = new Date();
  const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <div
      className="modern-weather-card"
      onClick={handleCardClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`View detailed weather for ${cityName}`}
      style={{ cursor: 'pointer' }}
    >
      {showRemoveButton && (
        <button
          className="remove-button"
          onClick={handleRemoveClick}
          aria-label={`Remove ${cityName} from dashboard`}
          title={`Remove ${cityName}`}
        >
          ×
        </button>
      )}

      <div className="weather-header">
        <div className="location-info">
          <h2 className="city-title">{cityName}</h2>
          <p className="current-time">{currentTime}, {currentDate}</p>
        </div>
      </div>

      <div className="weather-main-section">
        <div className="weather-icon-section">
          <div className="weather-icon-large">
            {getWeatherIcon(weatherCondition)}
          </div>
          <p className="weather-description">{weatherDescription}</p>
        </div>

        <div className="temperature-section">
          <div className="main-temperature">{Math.round(temperature)}°C</div>
          <div className="temp-range">
            <p>Temp Min: {Math.round(tempMin)}°C</p>
            <p>Temp Max: {Math.round(tempMax)}°C</p>
          </div>
        </div>
      </div>

      <div className="weather-details-section">
        <div className="details-left">
          <div className="detail-row">
            <span className="detail-label">Pressure:</span>
            <span className="detail-value">{pressure}hPa</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Humidity:</span>
            <span className="detail-value">{humidity}%</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Visibility:</span>
            <span className="detail-value">{(visibility / 1000).toFixed(1)}km</span>
          </div>
        </div>

        <div className="details-center">
          <div className="wind-info">
            <div className="wind-icon">🧭</div>
            <div className="wind-details">
              <p>{windSpeed}m/s {windDeg} Degree</p>
            </div>
          </div>
        </div>

        <div className="details-right">
          <div className="sun-times">
            <div className="sun-item">
              <span className="sun-label">Sunrise:</span>
              <span className="sun-time">
                {sunrise ? new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
              </span>
            </div>
            <div className="sun-item">
              <span className="sun-label">Sunset:</span>
              <span className="sun-time">
                {sunset ? new Date(sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;