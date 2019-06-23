const mongoose = require('mongoose');
const config = require('../config.js');
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', function (err) {
  console.log('database connection failed. '+err)
});

mongoose.connection.once('open', function () {
  console.log('database connection established');
});
