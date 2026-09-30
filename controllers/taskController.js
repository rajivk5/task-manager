const fs = require("fs");

const createTask = (req, res) => {
  const { title, description, completed } = req.body;

  try {
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof completed !== "boolean"
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const fileData = fs.readFileSync("task.json", "utf8");
    const data = JSON.parse(fileData);

    const ids = data.tasks.map((task) => task.id);
    const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

    const newTask = {
      id: newId,
      title,
      description,
      completed,
    };

    data.tasks.push(newTask);

    fs.writeFileSync("task.json", JSON.stringify(data, null, 2));

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTasks = (req, res) => {
  try {
    const fileData = fs.readFileSync("task.json", "utf8");
    const data = JSON.parse(fileData);
    res.json(data.tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTaskById = (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const fileData = fs.readFileSync("task.json", "utf8");
    const data = JSON.parse(fileData);
    const task = data.tasks.find((t) => t.id === taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTask = (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const { title, description, completed } = req.body;

    console.log("taskId:", taskId);

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof completed !== "boolean"
    ) {
      return res.status(400).json({ error: "Invalid task data" });
    }

    const data = JSON.parse(fs.readFileSync("task.json", "utf8"));
    console.log("tasks:", data.tasks);

    const task = data.tasks.find((task) => task.id === taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.title = title;
    task.description = description;
    task.completed = completed;

    fs.writeFileSync("task.json", JSON.stringify(data, null, 2));

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTask = (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const fileData = fs.readFileSync("task.json", "utf8");
    const data = JSON.parse(fileData);
    const taskIndex = data.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }
    data.tasks.splice(taskIndex, 1);
    fs.writeFileSync("task.json", JSON.stringify(data, null, 2));
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
