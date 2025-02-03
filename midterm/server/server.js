/*
                                   ,'\
    _.----.        ____         ,'  _\   ___    ___     ____
_,-'       `.     |    |  /`.   \,-'    |   \  /   |   |    \  |`.
\      __    \    '-.  | /   `.  ___    |    \/    |   '-.   \ |  |
 \.    \ \   |  __  |  |/    ,','_  `.  |          | __  |    \|  |
   \    \/   /,' _`.|      ,' / / / /   |          ,' _`.|     |  |
    \     ,-'/  /   \    ,'   | \/ / ,`.|         /  /   \  |     |
     \    \ |   \_/  |   `-.  \    `'  /|  |    ||   \_/  | |\    |
      \    \ \      /       `-.`.___,-' |  |\  /| \      /  | |   |
       \    \ `.__,'|  |`-._    `|      |__| \/ |  `.__,'|  | |   |
        \_.-'       |__|    `-._ |              '-.|     '-.| |   |
                                `'                            '-._|
                                
   ╔═══════════════════════════════════════════════════════════╗
   ║             Just for you Michael!                         ║
   ╚═══════════════════════════════════════════════════════════╝
*/

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const todoSchema = new mongoose.Schema({
  todo: String,
  created: { type: Number, default: Date.now },
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/gettodos", (req, res) => {
  console.log("GET /gettodos request received");
  Todo.find()
    .then((todos) => {
      console.log("Sending todos:", todos.length, "items found");
      res.json(todos);
    })
    .catch((err) => {
      console.error("Error getting todos:", err.message);
      res.status(500).json({ message: err.message });
    });
});

app.post("/create", (req, res) => {
  console.log("POST /create request received with data:", req.body);
  const newTodo = new Todo(req.body);
  newTodo
    .save()
    .then((savedTodo) => {
      console.log("Todo created successfully:", savedTodo);
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      console.error("Error creating todo:", err.message);
      res.status(400).json({ message: err.message });
    });
});

app.put("/edit/:id", (req, res) => {
  console.log("PUT /edit request received for id:", req.params.id);
  console.log("Update data:", req.body);
  Todo.findByIdAndUpdate(req.params.id, { todo: req.body.todo }, { new: true })
    .then((updatedTodo) => {
      console.log("Todo updated successfully:", updatedTodo);
      res.json(updatedTodo);
    })
    .catch((err) => {
      console.error("Error updating todo:", err.message);
      res.status(400).json({ message: err.message });
    });
});

app.delete("/delete/:id", (req, res) => {
  console.log("DELETE request received for id:", req.params.id);
  Todo.findByIdAndDelete(req.params.id)
    .then((deletedTodo) => {
      console.log("Todo deleted successfully:", deletedTodo);
      res.json(deletedTodo);
    })
    .catch((err) => {
      console.error("Error deleting todo:", err.message);
      res.status(400).json({ message: err.message });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
