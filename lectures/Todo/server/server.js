<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
=======
const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const app = express()
>>>>>>> 70aa466026c52edda5d73c7d3028ca7dccfe51ed

app.use(cors());
app.use(express.json());

const PORT = 3000;

const Schema = mongoose.Schema;

<<<<<<< HEAD
const ToDoSchema = new Schema({
  todo: String,
  created: Date,
});
const ToDo = mongoose.model("ToDo", ToDoSchema);
=======
const Schema = mongoose.Schema

const ToDoSchema = new Schema(
    {

        todo:
        {
            type: String,
            required: true
        }
        ,
        created: Number

    }
)
const ToDo = mongoose.model('ToDo', ToDoSchema)
>>>>>>> 70aa466026c52edda5d73c7d3028ca7dccfe51ed



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
<<<<<<< HEAD
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
=======
    console.log("Create Route HIT", req.body)
    ToDo.create(req.body)
        .then(created => {
            console.log("created", created)
            res.json(created)
        })
})

app.delete("/delete/:id", (req, res) => {
    console.log("Delete Hit", req.params.id)
    ToDo.findByIdAndDelete(req.params.id)
        .then(deleted => {
            console.log("deleted", deleted)
            res.json(deleted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err.message })
        })
})

app.listen(PORT, () => {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to Database")
        })
        .catch(err => console.log(err))

    console.log(`Server is runnning on port ${PORT}`)
})
>>>>>>> 70aa466026c52edda5d73c7d3028ca7dccfe51ed
