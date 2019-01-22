import React, { Component } from "react";
import classnames from "classnames";

const RoomItem = ({ name, onSelect, isSelectedRoom }) => {
  const classes = classnames("room-item", { selected: isSelectedRoom });
  return (
    <div className={classes} onClick={onSelect}>
      {name}
    </div>
  );
};

class ChatRooms extends Component {
  render() {
    const { rooms, setSelectedRoom, selectedRoom } = this.props;
    return (
      <div className="rooms">
        {(rooms || []).map(({ id, name }) => (
          <RoomItem
            key={id}
            name={name}
            isSelectedRoom={selectedRoom === id}
            onSelect={() => setSelectedRoom(id)}
          />
        ))}
      </div>
    );
  }
}

export default ChatRooms;
