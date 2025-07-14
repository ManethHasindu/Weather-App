const axios = require('axios');

class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'http://api.openweathermap.org/data/2.5';
  }

  async getWeatherByGroup(cityIds) {
    try {
      const cityIdsString = Array.isArray(cityIds) ? cityIds.join(',') : cityIds;
      const url = `${this.baseUrl}/group?id=${cityIdsString}&units=metric&appid=${this.apiKey}`;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Weather API Error:', error.response?.data || error.message);
      throw new Error('Failed to fetch weather data from OpenWeatherMap');
    }
  }

  async getWeatherByCity(cityId) {
    try {
      const url = `${this.baseUrl}/weather?id=${cityId}&units=metric&appid=${this.apiKey}`;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Weather API Error:', error.response?.data || error.message);
      throw new Error('Failed to fetch weather data from OpenWeatherMap');
    }
  }
}

module.exports = WeatherService;

