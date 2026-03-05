'use strict';

require('dotenv').config();
const app  = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`FenTuRo Konfigurator Engine running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
});
