const express = require("express");
const path = require("path");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const Tasks = require("./src/task");
const Project = require("./src/project");
const User = require("./src/user");
const { sequelize } = require("./db");
const handlebars = expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

const app = express();
const port = 4000;

sequelize.sync();

app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  const projects = await Project.findAll({
    include: [User],
  });
  res.render("home", { projects });
});

app.get("/projects/new", async (req, res) => {
  res.render("newProject");
});

app.post("/project", async (req, res) => {
  await Project.create(req.body);
  res.redirect("/");
});

app.get("/tasks/new", async (req, res) => {
  res.render("newTask");
});

app.post("/tasks", async (req, res) => {
  await Task.create(req.body);
  res.redirect("newTask");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
