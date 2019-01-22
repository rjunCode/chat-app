import React, { Component } from "react";

class MessageInput extends Component {
  state = {
    message: ""
  };

  handleChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { selectedRoom, postMessage, user } = this.props;
    const message = await postMessage(selectedRoom, user, this.state.message);

    if (message.error) {
      this.setState({ error: message.error });
    } else {
      this.setState({ message: "" });
    }
  }

  render() {
    return (
      <form className="message-form" onSubmit={e => this.handleSubmit(e)}>
        <input
          type="text"
          className="message-input"
          value={this.state.message}
          placeholder="Type message..."
          onChange={e => this.handleChange(e)}
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

export default MessageInput;
