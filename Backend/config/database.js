// If you want to add database functionality later
const config = {
  development: {
    // Database configuration for development
    host: 'localhost',
    port: 5432,
    database: 'weather_app_dev',
    username: 'postgres',
    password: 'password',
    dialect: 'postgres'
  },
  production: {
    // Database configuration for production
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

module.exports = config;