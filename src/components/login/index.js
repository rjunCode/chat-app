import React, { Component } from "react";
import Button from "../common/button";

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
          <Button
            type="submit"
            label="Join the DoorDash Chat!"
            view="primary"
          />
        </form>
      </div>
    );
  }
}

export default Login;
