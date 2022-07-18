const catchAsync = require("./../utilities/catchAsync");
const Problem = require("./../models/problemModel");

// exports.getAllProblems = catchAsync(async (req, res, next) => {
//   res.status(200).json({
//     status: "success",
//     data: {
//       name: "anirudh",
//       age: 22,
//     },
//   });
// });

exports.getAllProblems = catchAsync(async (req, res, next) => {
  const problems = await Problem.find();
  res.status(200).json({
    status: "success",
    results: problems.length,
    data: { problems },
  });
});
