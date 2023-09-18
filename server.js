const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");

// DATA
const fruits = require("./models/fruits.js"); //NOTE: it must start with ./ if it's just a file, not an NPM package
const vegetables = require("./models/vegetables.js");

// ADD VIEW TEMPLATE - always above the routes
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

// FRUIT ROUTES
app.get("/fruits/", (req, res) => {
  // res.send(fruits);
  res.render("fruits/Index", { fruits: fruits });
});

app.get("/fruits/:indexOfFruitsArray", function (req, res) {
  res.render("fruits/Show", {
    //second param must be an object
    fruit: fruits[req.params.indexOfFruitsArray], //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
  });
});

// VEGETABLES ROUTES
app.get("/vegetables/", (req, res) => {
  res.render("vegetables/Index", { vegetables: vegetables });
});

app.get("/vegetables/:veggieIndex", (req, res) => {
  res.render("vegetables/Show", {
    vegetable: vegetables[req.params.veggieIndex],
  });
});

app.listen(3000, () => {
  console.log("listening");
});