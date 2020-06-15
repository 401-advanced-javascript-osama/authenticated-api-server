require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./lib/server');

mongoose.connect('mongodb+srv://osamamousa204:1234@cluster0-yxzpk.mongodb.net/test',{
  useNewUrlParser:true,
  useUnifiedTopology:true,
});
server.start(process.env.PORT);
