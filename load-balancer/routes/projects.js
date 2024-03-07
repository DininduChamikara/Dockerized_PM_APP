const express = require("express");
const router = express.Router();
const Project = require("../models/project");

router.post("/create", async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      creater: req.body.creater,
      workers: req.body.workers,
      tasks: req.body.tasks,
    });
    const p = await project.save();
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/view", async (req, res) => {
  try {
    const email = req.body.email;
    const projects = await Project.find({ workers: { $in: [email] } });
    res.json(projects);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/byId/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    project.tasks = req.body.tasks;
    const p = await project.save();
    res.json(p);
  } catch (err) {
    res.send("Error " + err);
  }
});

module.exports = router;
