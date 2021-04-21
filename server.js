const express = require("express");
const path = require("path");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const Task = require("./src/task");
const Project = require("./src/project");
const User = require("./src/user");
const { sequelize } = require("./src/db");
const handlebars = expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

async function seedData() {
  await sequelize.sync({ force: true });
  const project1 = await Project.create({
    name: "Test1",
    description: "description1",
  });
  const project2 = await Project.create({
    name: "Test2",
    description: "description2",
  });
  const project3 = await Project.create({
    name: "Test3",
    description: "description3",
  });

  const task1 = await Task.create({
    description: "Log some OTJ",
    state: "todo",
  });
  const task2 = await Task.create({
    description: "book my 1 to 1",
    state: "inProgress",
  });
  const task3 = await Task.create({
    description: "task3Description",
    state: "todo",
  });
  const task4 = await Task.create({
    description: "check my emails",
    state: "done",
  });
  const task5 = await Task.create({
    description: "brush teeth",
    state: "done",
  });

  await project1.addTasks([task1, task2, task4, task5]);
  await project2.addTask(task3);
}

seedData();

const app = express();
const port = 4000;

app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  const projects = await Project.findAll();
  res.render("home", { projects });
});

app.get("/projects/new", async (req, res) => {
  res.render("newProject");
});

app.post("/projects", async (req, res) => {
  await Project.create(req.body);
  res.redirect("/");
});

app.get("/users/new", async (req, res) => {
    res.render("newUser");
  });

app.post("/users", async (req, res) => {
    await User.create(req.body);
    res.redirect("/");
  });

app.get("/tasks/new", async (req, res) => {
  res.render("newTask");
});

app.post("/tasks", async (req, res) => {
  const task = await Task.create(req.body);
  console.log(task);
  res.render("project"); // ie project.handlebars
});

app.get("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  res.render("project");
});

app.get("/projects/:id", async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  const tasks = await project.getTasks();
  const columns = {
    todo: [],
    inProgress: [],
    done: []
  }
  for (const task of tasks) {
    columns[task.state].push(task);
  }
  res.render("project", { project, columns });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
