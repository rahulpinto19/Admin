const connectToMongo = require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const auth = require("./routes/auth");
const post = require("./routes/posts");
app.use(express.json());
app.use("/", auth);
app.use("/", post);
app.listen(5000, () => {
  console.log(" Backend Running at 5000");
});
