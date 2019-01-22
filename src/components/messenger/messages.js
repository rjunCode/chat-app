import React, { Component } from "react";
import classnames from "classnames";

export const MessageItem = ({
  name,
  message,
  isCurrentUser,
  isNextMessageBySameUser
}) => {
  const classes = classnames("message-item", {
    current: isCurrentUser,
    compact: isNextMessageBySameUser
  });
  return (
    <div className={classes}>
      <div className="text">{message}</div>
      {!isNextMessageBySameUser && <div className="text-by">{name}</div>}
    </div>
  );
};

class Messages extends Component {
  componentDidMount() {
    const { selectedRoom, fetchMessages } = this.props;
    if (selectedRoom !== undefined) {
      fetchMessages(selectedRoom);
    }
  }

  componentDidUpdate() {
    this.messages.scrollTo({
      top: this.messages.scrollHeight,
      behavior: "smooth"
    });
  }

  render() {
    const { messageMap, selectedRoom, user } = this.props;
    const messages = messageMap[selectedRoom] || [];

    return (
      <div
        className="messages"
        ref={div => {
          this.messages = div;
        }}
      >
        {messages.map(({ id, message, name }, index, arr) => (
          <MessageItem
            key={id}
            message={message}
            name={name}
            isCurrentUser={name === user}
            isNextMessageBySameUser={
              arr[index + 1] && arr[index + 1].name === name
            }
          />
        ))}
      </div>
    );
  }
}

export default Messages;
