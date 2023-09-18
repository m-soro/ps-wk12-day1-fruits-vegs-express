const React = require("react");

class Index extends React.Component {
  render() {
    const { vegetables } = this.props;
    return (
      <div>
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
      </div>
    );
  }
}

module.exports = Index;
