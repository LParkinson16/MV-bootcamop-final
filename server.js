const express = require('express');
const path = require("path");
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const Tasks = require('./src/task');
const Project = require('./src/project');
const User = require('./src/user');
const { sequelize } = require('./db');
const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

const app = express();
const port = 4000;

sequelize.sync();

app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    const projects = await Project.findAll({
        include: [
            {
                model: User, as: 'users',
            }
        ],
        nest: true
    })
    res.render('home', {projects})
});

app.get('/newproject', async (req, res) => {
    res.render('newproject')
})

app.post("/newproject", async (req, res) => {
    await Project.create(req.body);
    res.redirect("/");
  });

app.get("/add", async (req, res) => {
    res.render("add");
  });

app.post("/add", async (req, res) => {
    console.log(req.body);
    await Tasks.create(req.body);
    res.redirect("/add");
  });
  
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

