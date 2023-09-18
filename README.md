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
```

```js
/*
 * views/index.js
 */
const React = require("react");

class Index extends React.Component {
  render() {
    const { fruits } = this.props;
    return (
      <div>
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
      </div>
    );
  }
}
module.exports = Index;
```

```js
/*
 * views/show.js
 */

const React = require("react");
class Show extends React.Component {
  render() {
    const fruit = this.props.fruit;
    return (
      <div>
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
