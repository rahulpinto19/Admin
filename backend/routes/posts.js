const express = require("express");
const app = express();
const router = express.Router();
const Mainposts = require("../models/mainposts");
const queuedposts = require("../models/update");
app.use(express.json());
const cors = require("cors");
app.use(cors());
router.post("/accept", async (req, res) => {
  try {
    const id = req.body.e;

    // console.log(req.body.e);
    const data = await queuedposts.findOne({ _id: id });
    await queuedposts.findByIdAndDelete(id);
    const { authorid, eventname, typeofevent, link, date } = data;

    console.log(data);
    const post = await Mainposts.create({
      authorid: authorid,
      eventname: eventname,
      typeofevent: typeofevent,
      link: link,
      date: date,
    });
    if (post) {
      res.send({ post: post, message: "updated successfully" });
    } else {
      res.status(500).send("no post to update");
    }
  } catch (err) {
    res.status(501).send(err);
    // res.send("internal server issue");
  }
});
router.delete("/deletepost", async (req, res) => {
  try {
    const idToDelete = req.body.e;
    console.log(req.body.e);
    const result = await queuedposts.findByIdAndDelete(idToDelete);
    if (result) {
      console.log("post deleted");
      res.send("deleted");
    } else {
      console.log("no post to delete");
      res.send("no post to delete");
    }
  } catch (err) {
    console.log("internal issue");
    res.send("internal server issue");
  }
});
router.post("/getallposts", async (req, res) => {
  try {
    const post = await queuedposts.find();
    res.send(post);
  } catch (err) {
    res.send("internal server issue");
  }
});

module.exports = router;
