require('dotenv').config();
require('app-module-path').addPath(__dirname + '/app');
const App = require('./app/server');

new App(process.env.PORT, process.env.MONGO_DB_URL);