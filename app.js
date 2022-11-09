const express = require("express");
const app = express();
const port = 3000;
const databaseConnector = require("./config/connector");
const userRouter = require("./routes/user-route");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//Routes
app.use("/api", userRouter);

//Server Running
app.listen(port, async () => {
  console.log(`Server is Running at Port:${port}`);
  await databaseConnector();
});
