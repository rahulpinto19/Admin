const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
router.post("/savestudentsData", async (req, res) => {
  let resSend = false;
  const { year, dataarray } = req.body;
  try {
    if (dataarray.length === 0) {
      resSend = true;
      resSend = true;
      console.log("size of the dataarray is zero");
      return res.send({message:"size of array is zero"})
    }
    const arrayOfObjects =  JSON.parse(dataarray)
    const collectionName = `${year}`;
    const collections = await mongoose.connection.db
    .listCollections()
    .toArray();
    // checks whether the file is existing or not
    if (!resSend) {
      collections.map((ele) => {
        if (ele.name === collectionName) {
          console.log("the data has been already stored");
          resSend = true;
          return res.send({message:"the data has been already stored"})
          return;
        }
      });
    }
    if (!resSend && arrayOfObjects.length !== 0) {
      const DynamicModel = mongoose.model(collectionName, studentSchema);
      arrayOfObjects.map(e => 
      {
        const data = new DynamicModel({
          firstname: e.firstname,
          lastname: e.lastname,
          rollno: e.rollno,
          email: e.email,
        });
        data
          .save()
          .then(() => {
          })
          .catch((err) => {
            console.log(err);
          });
      });

      if (!resSend) {
        resSend = true;
        console.log("data savd");
        res.send({ message: "Data saved successfully" });
      }
      else
      {
        console.log("internal server issue");
        res.send({ message: "internal server issue" });
        
      }
    }
  } catch (err) {
    console.log(err);
    if (!resSend) {
      res.send({ message: "internal server issue" });
    }
  }
});
module.exports = router;
