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
  sequelize.sync({ force: true });
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
  const user1 = await User.create({
    name: "Shazeen",
    avatar: "www.image.com",
  });
  const user2 = await User.create({
    name: "Sophia",
    avatar: "www.image2.com",
  });

  await project1.addTasks([task1, task2, task4, task5]);
  await project2.addTask(task3);
}

seedData();