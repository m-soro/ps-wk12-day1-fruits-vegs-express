const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");

// DATA
const fruits = require("./models/fruits.js"); //NOTE: it must start with ./ if it's just a file, not an NPM package
const vegetables = require("./models/vegetables.js");

// ADD VIEW TEMPLATE - always above the routes
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

// view body of a post request
//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));

// To serve static files - like css
app.use(express.static("public"));

// MIDDLEWARE
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

// INDUCES - index, new, delete, update, create, edit, show

// INDEX
app.get("/fruits/", (req, res) => {
  // res.send(fruits);
  res.render("fruits/Index", { fruits: fruits });
});

// NEW - aka the FORM!
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

// DELETE

// UPDATE

// CREATE
app.post("/fruits", (req, res) => {
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true; //do some data correction
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false; //do some data correction
  }
  fruits.push(req.body);
  //send the user back to /fruits
  res.redirect("/fruits");
  console.log(fruits);
});

// EDIT

// SHOW ROUTE
app.get("/fruits/:indexOfFruitsArray", function (req, res) {
  res.render("fruits/Show", {
    //second param must be an object
    fruit: fruits[req.params.indexOfFruitsArray], //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
  });
});

/**
 * THE VEGETABLES ROUTE
 */

// INDEX
app.get("/vegetables/", (req, res) => {
  res.render("vegetables/Index", { vegetables: vegetables });
});

// NEW
app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

// DELETE

// UPDATE

// CREATE - this will receive the data from the form!
app.post("/vegetables", (req, res) => {
  console.log(req.body); // view the data sent back from the form
  // if ready to eat is on then true, else false
  if (req.body.readyToEat) {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  // push the form data to vegetables array
  vegetables.push(req.body);
  res.redirect("/vegetables");
  console.log(vegetables);
});

// EDIT

// SHOW
app.get("/vegetables/:veggieIndex", (req, res) => {
  res.render("vegetables/Show", {
    vegetable: vegetables[req.params.veggieIndex],
  });
});

app.listen(3000, () => {
  console.log("listening");
});
