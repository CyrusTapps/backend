const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const PORT = 3000;

const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
  todo: String,
  created: Date,
});
const ToDo = mongoose.model("ToDo", ToDoSchema);

app.get("/test", (req, res) => {
  console.log("Test route hit");
  res.json({ msg: "success" });
});

app.get("/getTodos", (req, res) => {
  console.log("getTodos HIT");
  ToDo.find().then((found) => {
    console.log("Found", found);
    res.json(found);
  });
});

app.post("/create", (req, res) => {
  console.log("Create Route HIT", req.body);
  ToDo.create(req.body).then((created) => {
    console.log("created", created);
    res.json(created);
  });
});

app.delete("/delete/:id", (req, res) => {
  console.log("Delete Route HIT", req.params.id);
  ToDo.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      console.log("deleted:", deleted);
      res.json(deleted);
    })
    .catch((err) => {
      console.log("Delete error:", err);
      res.status(500).json(err);
    });
});

app.put("/update/:id", (req, res) => {
  console.log("Update Route HIT", req.params.id, req.body);
  ToDo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updated) => {
      console.log("updated:", updated);
      res.json(updated);
    })
    .catch((err) => {
      console.log("Update error:", err);
      res.status(500).json(err);
    });
});

app.listen(PORT, () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to Database");
  });
  console.log(`Server is runnning on port ${PORT}`);
});
