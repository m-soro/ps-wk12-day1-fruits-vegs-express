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
