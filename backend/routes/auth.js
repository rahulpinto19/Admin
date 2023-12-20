const express = require("express");
const app = express();
const router = express.Router();
const jwt = require("jsonwebtoken");
app.use(express.json());
const cors = require("cors");
const AdminUser = require("../models/user");
app.use(cors());
const JWT_SECRET = "secretekey";
router.post("/signin", async (req, res) => {
  const id = await req.body.id;
  const password = await req.body.password;
  console.log({ id, password });
  try {
    const GetAdmin = await AdminUser.findOne({ id: id });
    if (GetAdmin && password === GetAdmin.password) {
      const data = { id, password };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res
        .status(200)
        .send({ message: "successfully logged in", authtoken: authtoken });
      return;
    } else {
      res.status(500).send("Invalid credentials");
      return;
    }
  } catch (err) {
    res.send("internal server issue");
  }
});
router.post("/createAdmin", async (req, res) => {
  const { name, password } = req.body;
  const newAdmin = new AdminUser({ name: name, password: password });
  newAdmin
    .save()
    .then(() => {
      res.status(200).send("Admincreated");
    })
    .catch((err) => {
      res.status(201).send("unable to create admin");
    });
});
router.get("/getallAdmin", async (req, res) => {
  try {
    const data = await AdminUser.find();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
module.exports = router;
