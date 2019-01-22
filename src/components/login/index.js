import React, { Component } from "react";

class Login extends Component {
  state = {
    user: this.props.user || ""
  };

  handleChange(event) {
    this.setState({
      user: event.target.value
    });
  }

  handleSubmit() {
    this.props.setUser(this.state.user);
  }

  render() {
    return (
      <div className="login">
        <form className="form" onSubmit={() => this.handleSubmit()}>
          <input
            type="text"
            value={this.state.user}
            placeholder="Type your username..."
            onChange={e => this.handleChange(e)}
          />
          <button type="submit">Join the DoorDash Chat!</button>
        </form>
      </div>
    );
  }
}

export default Login;
