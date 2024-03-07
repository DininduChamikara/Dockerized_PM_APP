const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  creater: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  workers: {
    type: Array(),
    required: true,
  },
  tasks: {
    todo: {
      type: Array(),
      required: true,
    },
    inprogress: {
      type: Array(),
      required: true,
    },
    done: {
      type: Array(),
      required: true,
    },
  },
});

module.exports = mongoose.model("Project", projectSchema);
