const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = 3000;
const homeRoute = require('./routes/home')
const aboutRoute = require('./routes/about')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static("public"));


app.set('view engine', 'pug')

app.use(homeRoute);
app.use(aboutRoute);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error", err);
});

app.listen(port, () => {
  console.log(`The application is running on port: ${port}`);
});
