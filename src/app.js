const express = require("express");
require("dotenv").config();
const cors = require("cors");

//Database
const DB = require("./connfig/config");

//Routers
const entryRoute = require("./routes/entry");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.use("/api/v1/diary", entryRoute);

DB.authenticate()
  .then(() => console.log(`DB connected successfully`))
  .catch((error) =>
    console.log("Error Connecting to Database " + error.message)
  );

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
