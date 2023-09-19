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
