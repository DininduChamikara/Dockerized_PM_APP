const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const Project = require("./models/project");

const app = express();

const dbURL =
  "mongodb+srv://dininduchamikara99:MD2uWQ4UEuVF1eH5@cluster0.umvjphq.mongodb.net/projectManagementDb?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dbURL, connectionParams)
  .then(() => {
    console.log("CONNECTED TO THE DB");
  })
  .catch((e) => {
    console.log("ERROR: ", e);
  });

// const PORT = process.env.PORT;
const PORT = 1515;

if (!PORT) {
  throw new Error("PORT variable not defined");
}

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected :${socket.id}`);

  socket.on("join_project", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} join project: ${data}`);
  });

  socket.on("send_project", async (data) => {
    try {
      const existingProject = await Project.findById(data._id);
      if (existingProject) {
        existingProject.tasks = data.tasks;
        existingProject.save().then(() => {
          socket.to(data._id).emit("receive_project", data);
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(4000, () => console.log("listening on *:4000"));