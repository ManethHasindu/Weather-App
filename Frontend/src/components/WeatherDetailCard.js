import React from 'react';
import './WeatherDetailCard.css';

const WeatherDetailCard = ({ city, onBack }) => {
  if (!city) {
    return null;
  }

  const getWeatherIcon = (condition) => {
    // SVG cloud icon to match the design
    return (
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 10H16.74C16.38 8.37 15.1 7 13.5 7C11.9 7 10.62 8.37 10.26 10H9C7.34 10 6 11.34 6 13C6 14.66 7.34 16 9 16H18C19.66 16 21 14.66 21 13C21 11.34 19.66 10 18 10Z" 
              fill="white" 
              opacity="0.9"/>
      </svg>
    );
  };

  const getWindIcon = () => {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L16 6L12 10L8 6L12 2Z" fill="white"/>
        <path d="M12 10V22" stroke="white" strokeWidth="2"/>
      </svg>
    );
  };

  return (
    <div className="weather-detail-container">
      {/* Main Detail Card */}
      <div className="detail-weather-card">
        {/* Header with back button */}
        <div className="detail-card-header">
          <button className="detail-back-button" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="detail-location-info">
            <h2 className="detail-city-name">{city.name }</h2>
            <p className="detail-time">{city.time }</p>
          </div>
        </div>

        {/* Main weather display */}
        <div className="detail-weather-display">
          <div className="detail-weather-left">
            <div className="detail-weather-icon">
              {getWeatherIcon(city.condition)}
            </div>
            <p className="detail-weather-condition">{city.condition || 'Few Clouds'}</p>
          </div>
          
          <div className="detail-weather-right">
            <div className="detail-main-temp">{city.temperature || '27'}°C</div>
            <div className="detail-temp-range">
              <p>Temp Min: {city.tempMin || '25'}°C</p>
              <p>Temp Max: {city.tempMax || '28'}°C</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Grid */}
      <div className="detail-info-container">
        <div className="detail-info-row">
          <div className="detail-info-section">
            <div className="detail-info-item">
              <span className="info-label">Pressure:</span>
              <span className="info-value">{city.pressure || '1018'}hPa</span>
            </div>
            <div className="detail-info-item">
              <span className="info-label">Humidity:</span>
              <span className="info-value">{city.humidity || '78'}%</span>
            </div>
            <div className="detail-info-item">
              <span className="info-label">Visibility:</span>
              <span className="info-value">{city.visibility || '8.0'}km</span>
            </div>
          </div>

          <div className="detail-info-section wind-section">
            <div className="wind-display">
              <div className="wind-icon">
                {getWindIcon()}
              </div>
              <div className="wind-text">
                <p>{city.windSpeed || '4.0'}m/s {city.windDirection || '120'} Degree</p>
              </div>
            </div>
          </div>

          <div className="detail-info-section">
            <div className="detail-info-item">
              <span className="info-label">Sunrise:</span>
              <span className="info-value">{city.sunrise || '6:05am'}</span>
            </div>
            <div className="detail-info-item">
              <span className="info-label">Sunset:</span>
              <span className="info-value">{city.sunset || '6:05pm'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetailCard;