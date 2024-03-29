console.log("Welcome NodeJS");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./models/DB");

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", require("./Router/index"));

connectDB();

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/api/`);
});
