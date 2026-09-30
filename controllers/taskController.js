const tasks = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
  },
  {
    id: 2,
    title: "Learn JavaScript",
    description: "Learn JavaScript fundamentals",
    completed: false,
  },
  {
    id: 3,
    title: "Learn Node.js",
    description: "Learn Node.js fundamentals",
    completed: false,
  },
  {
    id: 4,
    title: "Learn Express.js",
    description: "Learn Express.js and routing",
    completed: false,
  },
  {
    id: 5,
    title: "Build REST API",
    description: "Create REST API using Express.js",
    completed: false,
  },
  {
    id: 6,
    title: "Learn Git",
    description: "Learn Git commands and GitHub",
    completed: false,
  },
  {
    id: 7,
    title: "Practice APIs",
    description: "Practice CRUD API operations",
    completed: false,
  },
  {
    id: 8,
    title: "Learn Testing",
    description: "Learn API testing with Supertest",
    completed: false,
  },
  {
    id: 9,
    title: "Write Documentation",
    description: "Write project documentation",
    completed: false,
  },
  {
    id: 10,
    title: "Review Code",
    description: "Review and improve the project code",
    completed: false,
  },
  {
    id: 11,
    title: "Test Endpoints",
    description: "Test all API endpoints",
    completed: false,
  },
  {
    id: 12,
    title: "Fix Bugs",
    description: "Find and fix application bugs",
    completed: false,
  },
  {
    id: 13,
    title: "Clean Code",
    description: "Improve code structure and readability",
    completed: false,
  },
  {
    id: 14,
    title: "Final Testing",
    description: "Run the complete test suite",
    completed: false,
  },
  {
    id: 15,
    title: "Submit Assignment",
    description: "Submit the completed task manager assignment",
    completed: false,
  },
];

const createTask = (req, res) => {
  const { title, description, completed } = req.body;

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const ids = tasks.map((task) => task.id);
  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  const newTask = {
    id: newId,
    title,
    description,
    completed,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

const getTasks = (req, res) => {
  res.status(200).json(tasks);
};

const getTaskById = (req, res) => {
  const taskId = Number(req.params.id);

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(task);
};

const updateTask = (req, res) => {
  const taskId = Number(req.params.id);
  const { title, description, completed } = req.body;

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({ error: "Invalid task data" });
  }

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.title = title;
  task.description = description;
  task.completed = completed;

  res.status(200).json(task);
};

const deleteTask = (req, res) => {
  const taskId = Number(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: "Task deleted successfully",
  });
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};