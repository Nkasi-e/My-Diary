const express = require("express");
require("dotenv").config();
const cors = require("cors");

//Routers
const userRoute = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.use("/api/v1/diary", userRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});
