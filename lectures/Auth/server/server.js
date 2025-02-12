const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
require("dotenv").config();

app.use(cors({ origin: "http://localhost:5173" }));

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: Number,
});
const Auth = mongoose.model("Auth", AuthSchema);

app.use(express.json());

app.post("/register", (req, res) => {
  console.log("Reg hit", req.body);

  Auth.findOne({ username: req.body.username })
    .then((found) => {
      console.log("found", found);
      if (!found) {
        console.log("Unique username");
        const hash = bcrypt.hashSync(req.body.password, 10);
        console.log("hash", hash);

        const newUser = new Auth({
          username: req.body.username,
          password: hash,
          created: Date.now(),
        });

        Auth.create(newUser)
          .then((created) => {
            console.log("created", created);
            res.status(201).json(created);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
          });
      } else {
        console.log("User already exists");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/login", (req, res) => {
  console.log("login", req.body);

  Auth.findOne({ username: req.body.username })
    .then((found) => {
      console.log("found", found);

      if (!found) {
        console.log("User not found");
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (bcrypt.compareSync(req.body.password, found.password)) {
        console.log("Login successful");
        res.status(200).json({ message: "good login", found });
      } else {
        console.log("Bad login");
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

const PORT = 3000;

app.listen(PORT, () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to Database");
  });
  console.log(`Server is running on port: ${PORT}`);
});
