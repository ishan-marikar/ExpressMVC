var options = {
  server: {
    port: 3000 || process.env.PORT
  },
  database: {
    mongodb: 'mongodb://localhost/energy-drink' || process.env.MONGODB
  }
};

module.exports = options;
