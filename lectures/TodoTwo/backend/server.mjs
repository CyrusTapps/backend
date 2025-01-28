import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Todo from "./models/Todo.mjs";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

//Routes//
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  if (!todos) {
    return res.status(404).json({ message: "No todos found" });
  }
  res.json(todos);
  console.log("Todos fetched successfully");
});

app.post("/api/todos", async (req, res) => {
  const newTodo = new Todo({ title: req.body.title });
  const savedTodo = await newTodo.save();
  if (!savedTodo) {
    return res.status(400).json({ message: "Failed to create todo" });
  }
  res.json(savedTodo);
  console.log("Todo created successfully");
});

app.delete("/api/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted successfully" });
  console.log("Todo deleted successfully");
});

app.put("/api/todos/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  if (!updatedTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  res.json(updatedTodo); //had to have an Easter egg....lol//
  console.log("Todo updated successfully");
});

// Add a tag to a todo
app.post("/api/todos/:id/tags", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const newTag = req.body.tag;
    if (!newTag) {
      return res.status(400).json({ message: "Tag is required" });
    }

    // Use $addToSet instead of $push to avoid duplicate tags
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { tags: newTag } },
      { new: true }
    );

    res.json(updatedTodo);
    console.log("Tag added successfully");
  } catch (error) {
    res.status(500).json({ message: "Error adding tag", error: error.message });
  }
});

// Remove a tag from a todo
app.delete("/api/todos/:id/tags/:tag", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $pull: { tags: req.params.tag } },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
    console.log("Tag removed successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing tag", error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
