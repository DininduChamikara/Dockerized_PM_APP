const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()

const app = express();

const dbURL = process.env.DB_URL;

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

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT variable not defined");
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const data = `App running at PORT ${PORT}`;
  return res.send(data);
});

const userRouter = require("./routes/users");
app.use("/users", userRouter);

const projectRouter = require("./routes/projects");
app.use("/projects", projectRouter);

app.listen(PORT, () => console.log(`Server at ${PORT}`));
