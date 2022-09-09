const express = require("express");
require("dotenv").config();

//Routers
const userRoute = require("./routes/user");

const app = express();

app.use(express.json());

const port = process.env.PORT;

app.use("/api/diary", userRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
