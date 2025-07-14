const fs = require('fs');
const path = require('path');

class CityDataManager {
  constructor() {
    this.citiesFile = path.join(__dirname, '../data/cities.json');
    this.cities = this.loadCities();
  }

  loadCities() {
    try {
      const data = fs.readFileSync(this.citiesFile, 'utf8');
      const parsed = JSON.parse(data);
      return parsed.List || [];
    } catch (error) {
      console.error('Error loading cities data:', error.message);
      return [];
    }
  }

  getCityCodes() {
    return this.cities.map(city => city.CityCode);
  }

  getCityByCode(code) {
    return this.cities.find(city => city.CityCode === code);
  }

  getAllCities() {
    return this.cities;
  }
}

module.exports = CityDataManager;