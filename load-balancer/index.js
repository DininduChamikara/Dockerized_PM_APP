const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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
