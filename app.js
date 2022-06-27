// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// default value for title local
const capitalized = require('./utils/capitalized')
const projectName = 'pet-hub'
app.locals.appTitle = `${capitalized(projectName)} `


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
const { isAuthenticated } = require('./middlewares/jwt.middleware')



// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const allRoutes = require("./routes/index.routes");
app.use("/", allRoutes);

const petsRoutes = require("./routes/pets.routes");
app.use("/api/pets", petsRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api/user", isAuthenticated, userRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
