import React, { Component } from "react";
import classnames from "classnames";

export const UserInfo = ({ user, time }) => (
  <div className="user">
    <div className="name">{user}</div>
    <div className="time">
      {`Online for ${time} ${time === 1 ? "minute" : "minutes"}`}
    </div>
  </div>
);

export const RoomItem = ({ name, onSelect, isSelectedRoom }) => {
  const classes = classnames("room-item", { selected: isSelectedRoom });
  return (
    <div className={classes} onClick={onSelect}>
      {name}
    </div>
  );
};

export const ChatRooms = ({ rooms, setSelectedRoom, selectedRoom }) => (
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

class NavBar extends Component {
  componentDidMount() {
    this.props.fetchChatRooms();
  }

  render() {
    const { user, rooms, setSelectedRoom, selectedRoom, time } = this.props;
    return (
      <div className="nav-bar">
        <UserInfo user={user} time={time} />
        <ChatRooms
          rooms={rooms}
          setSelectedRoom={setSelectedRoom}
          selectedRoom={selectedRoom}
        />
      </div>
    );
  }
}

export default NavBar;
