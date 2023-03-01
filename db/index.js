// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// for Heroku
require('dotenv').config();


// ℹ️ Sets the MongoDB URI for our app to have access to it.

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/pet-hub-server";


// for Heroku*
// *No longer using Heroku. Now using Railway App as a server. Dec 2022.
// *No longer using Railway App. Now using Fly.io as a server. Dec 2022.
  mongoose
  .connect(process.env.MONGODB_URI)
  .then(x => console.log(`Connected the Database: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));



