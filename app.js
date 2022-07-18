const express = require("express");

//defining routes
const problemRouter = require("./routes/problemRoutes");
const dataRouter = require("./routes/dataRoutes");
const baseRouter = require("./routes/baseRoutes");

const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/problems", problemRouter);
app.use("/data", dataRouter);
app.use("/", baseRouter);
module.exports = app;
