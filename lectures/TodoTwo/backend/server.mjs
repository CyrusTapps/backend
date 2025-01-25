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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
