```js
/**
 * server.js
 */
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
```

```js
/**
 * FRUITS INDEX
 */

const React = require("react");

class Index extends React.Component {
  render() {
    const { fruits } = this.props;
    return (
      <div className="container">
        <link rel="stylesheet" type="text/css" href="/pico.min.css" />
        <h1>Fruits Index Page</h1>
        <ul>
          {fruits.map((fruit, i) => {
            return (
              <li>
                The <a href={`/fruits/${i}`}>{fruit.name}</a> is {fruit.color}{" "}
                <br></br>
                {fruit.readyToEat
                  ? `It is ready to eat`
                  : `It is not ready to eat`}
                <br />
              </li>
            );
          })}
        </ul>
        <nav>
          <a href="/fruits/new">Create a New Fruit</a>
        </nav>
      </div>
    );
  }
}
module.exports = Index;
```

```js
/**
 * FRUITS NEW
 */

const React = require("react");

class New extends React.Component {
  render() {
    return (
      <div className="container">
        <link rel="stylesheet" type="text/css" href="/pico.min.css" />
        <h1>New Fruit page</h1>
        {/* NOTE: action will be the route, method will be the HTTP verb */}
        <form action="/fruits" method="POST">
          Name: <input type="text" name="name" />
          <br />
          Color: <input type="text" name="color" />
          <br />
          Is Ready To Eat: <input type="checkbox" name="readyToEat" />
          <br />
          <input type="submit" name="" value="Create Fruit" />
        </form>
      </div>
    );
  }
}

module.exports = New;
```

```js
/**
 * FRUITS SHOW
 */

const React = require("react");
class Show extends React.Component {
  render() {
    const fruit = this.props.fruit;
    return (
      <div className="container">
        <link rel="stylesheet" type="text/css" href="/pico.min.css" />
        <h1> Show Page </h1>
        The {fruit.name} is {fruit.color}
        {fruit.readyToEat
          ? "Its is ready to eat"
          : "It is not ready to eat... Cant touch this"}
      </div>
    );
  }
}
module.exports = Show;
```

```js
/**
 * VEGGIE INDEX
 */

const React = require("react");

class Index extends React.Component {
  render() {
    const { vegetables } = this.props;
    return (
      <div className="container">
        <link rel="stylesheet" type="text/css" href="/pico.min.css" />
        <h1>Vegetable Index Page</h1>
        <ul>
          {vegetables.map((vegetable, index) => {
            return (
              <li>
                The <a href={`/vegetables/${index}`}>{vegetable.name}</a> is{" "}
                {vegetable.color}
                <br />
                {vegetable.readyToEat
                  ? "Its ready to eat"
                  : "Its not ready to eat"}
              </li>
            );
          })}
        </ul>
        <a href="/vegetables/new" role="button" className="outline">
          Create Veggie
        </a>
      </div>
    );
  }
}

module.exports = Index;
```

```js
/**
 * VEGGIE NEW
 */

const React = require("react");

class New extends React.Component {
  render() {
    return (
      <div className="container">
        <link rel="stylesheet" type="text/css" href="/pico.min.css" />
        <article>
          <h1>Add a new veggie!</h1>
          <form action="/vegetables" method="POST">
            Name: <input type="text" name="name" id="" />
            Color: <input type="text" name="color" />
            Is it ready to eat:{" "}
            <input
              type="checkbox"
              id="switch"
              name="readyToEat"
              role="switch"
            />
            <br />
            <input
              type="submit"
              name=""
              value="Create Veggie"
              className="outline"
              style={{ width: "auto" }}
            />
          </form>
        </article>
      </div>
    );
  }
}

module.exports = New;
```

```js
/**
 * VEGGIE SHOW
 */

const React = require("react");
class Show extends React.Component {
  render() {
    const vegetable = this.props.vegetable;
    return (
      <div className="container">
        <link rel="stylesheet" type="text/css" href="/pico.min.css" />
        <h1>Show Page</h1>
        The {vegetable.name} is {vegetable.color}
        {vegetable.readyToEat ? "Its ready to eat" : "Not yet ready to eat"}
      </div>
    );
  }
}

module.exports = Show;
```
