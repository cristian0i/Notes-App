import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import Task from "../models/task.model.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

//FOUND ALL TASKS OF USER
router.get("/tasks", authRequired, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate(
      "user",
      "username email"
    );
    if (!tasks) return res.status(404).json({ message: "Tasks not found" });
    res.json(tasks);
  } catch (error) {
    return res.status(404).json({ message: "Tasks not found" });
  }
});

//FOUND TASK
router.get("/tasks/:id", authRequired, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
});

//CREATE TASK
router.post(
  "/tasks",
  authRequired,
  validateSchema(createTaskSchema),
  async (req, res) => {
    try {
      const { tittle, description, date } = req.body;
      const newTask = new Task({
        tittle,
        description,
        date,
        user: req.user.id,
      });
      const taskSaved = await newTask.save();
      res.json(taskSaved);
    } catch (error) {
      return res.status(404).json({ message: "Somenthing went wrong" });
    }
  }
);

//EDIT TASK
router.put("/tasks/:id", authRequired, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
});

//DELETE TASK
router.delete("/tasks/:id", authRequired, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
});

export default router;
