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
