const catchAsync = require("./../utilities/catchAsync");
const fs = require("fs");
const APIFeatures = require("./../utilities/apiFeatures");
const Problem = require("./../models/problemModel");

exports.getAllProblems = catchAsync(async (req, res, next) => {
  fs.readFile(`${__dirname}/../index.html`, (err, data) => {
    if (err) {
      res.send(`<h1>${err}</h1>`);
    } else {
      res.setHeader("content-type", "text/html");
      res.send(data);
    }
  });
});

exports.createNewProblem = catchAsync(async (req, res, next) => {
  const newProblem = await Problem.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      problem: newProblem,
    },
  });
});
