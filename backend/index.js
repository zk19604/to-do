const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
const task = require("./models/task");
const users = require("./models/users");
app.use(express.json());
const port = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/todolist")
  .then(() =>
    app.listen(port, () => {
      console.log(`running on ${port}`);
    })
  )
  .catch(() => console.log("error in connection"));

app.post("/users", async (req, res) => {
  try {
    const users = await users.create(req.body);
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failure" });
  }
});

app.get ("/task/:user", async(req, res) => {
    try {
        const tasks = await task.find({userid : req.params.user});
        res.status (200).json(tasks);
    }
    catch (err)
    {
        res.status(500).json({error : 'Failed'})
    }
})
app.post("/task", async (req, res) => {
  try {
    const tasks = await task.create(req.body);
    res.status(201).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failure" });
  }
});

app.patch("/task/:id", async (req, res) => {
  try {
    const tasks = await task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failure" });
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const deletedTask = await task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});
