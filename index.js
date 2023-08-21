require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ValidateToken = require("./Middleware/ValidateToken");
const jwt = require("jsonwebtoken");
const app = express();

const PORT = process.env.PORT || 3020;

app.use(cors());
app.get("/", ValidateToken, (req, res) =>
  res.json({
    type: "cluster",
  })
);

app.listen(PORT, () => {
  console.log("PM2 Cluster Server Is Running");
  console.log(
    "Token:",
    jwt.sign({}, process.env.TOKEN_KEY || "I AM DUMB", {
      expiresIn: process.env.TOKEN_EXPIRE || "30d",
    })
  );
});
