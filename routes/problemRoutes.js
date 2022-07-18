const express = require("express");
const router = express.Router();
const problemController = require("./../controllers/problemController");

router.route("/").get(problemController.getAllProblems);
module.exports = router;
