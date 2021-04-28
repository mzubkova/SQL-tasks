const express = require("express");
const { Router } = require("express");
const { databaseRequest } = require("./database");
const dbRouter = Router();
const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

dbRouter.get("/", (req, res) => {
  console.log("Request received...");
  databaseRequest(res);
});
app.use("/", dbRouter);
app.listen(port, () => console.log(`Server is running on port ${port}!`));
