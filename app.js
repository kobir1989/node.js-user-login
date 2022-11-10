const express = require("express");
const app = express();
const port = 3000;
const databaseConnector = require("./config/connector");
const userRouter = require("./routes/user-route");
const loginRoute = require("./routes/login-router");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//Routes
app.use("/api", userRouter);
app.use("/api", loginRoute);

//Server Running
app.listen(port, async () => {
  console.log(`Server is Running at Port:${port}`);
  await databaseConnector();
});
