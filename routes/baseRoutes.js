const express = require("express");
const catchAsync = require("./../utilities/catchAsync");
const router = express.Router();

const basefunction = catchAsync(async (req, res, next) => {
  res.redirect("/problems");
});

router.route("/").get(basefunction);
module.exports = router;
