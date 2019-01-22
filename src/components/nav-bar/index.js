import React, { Component } from "react";
import ChatRooms from "./chat-rooms";

export const UserInfo = ({ user, time }) => (
  <div className="user">
    <div className="name">{user}</div>
    <div className="time">
      {`Online for ${time} ${time === 1 ? "minute" : "minutes"}`}
    </div>
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
