const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000;
const { projects } = require("./data/projectData.json");

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static("public"));

//set view to pug
app.set('view engine', 'pug')


//set route for home page
app.get("/", (req, res) => {
  res.render("index", { projects });
});

//set route for about page
app.get("/about", (req, res) => {
  res.render("about");
});

//set route for projects based on id
app.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = projects[id];
  res.render("project", { project });
});

//404 error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//General error handler
app.use((err, req, res, next) => {
    if (err) {
      console.log("Global error handler called", err);
    }
    if (err.status === 404) {
      res.status(404).render("page-not-found", { err });
    } else {
      err.status = res.statusCode === 200 ? 500 : res.statusCode;
      res.status(err.status).render("error", { err });
    }
});

app.listen(port, () => {
  console.log(`The application is running on port: ${port}`);
});
