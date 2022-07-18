const mongoose = require("mongoose");
const slugify = require("slugify");

const problemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "a problem must have a name"],
    unique: true,
    maxlength: [20, "a problem must have less or equal then 20 characters"],
  },
  tags: {
    type: String,
    default: "NA",
  },
  difficulty: {
    type: String,
    required: [true, "A problem must have a difficulty"],
    enum: {
      values: ["easy", "medium", "hard"],
      message: "not possible value of difficulty",
    },
  },
  description: {
    type: String,
    required: [true, "A problem must have a description"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  creator: {
    type: String,
    default: "Anonymous",
    maxlength: [20, "a problem must have less or equal then 20 characters"],
  },
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
