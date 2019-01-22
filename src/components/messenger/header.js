import React, { Component } from "react";
import classnames from "classnames";

const Name = ({ name, isLast, isCurrentUser }) => {
  const classes = classnames({ current: isCurrentUser });
  return (
    <span className="member">
      <span className={classes}>{name}</span>
      {!isLast && <span>,&nbsp;</span>}
    </span>
  );
};

class Header extends Component {
  componentDidMount() {
    const { selectedRoom, fetchRoomDetails } = this.props;
    if (selectedRoom !== undefined) {
      fetchRoomDetails(selectedRoom);
    }
  }

  render() {
    const { roomDetails, selectedRoom, user } = this.props;
    const details = roomDetails[selectedRoom] || {};
    return (
      <div className="header">
        <div className="room-name">{details.name}</div>
        <div className="members">
          {(details.users || []).map((name, index, arr) => (
            <Name
              key={index}
              name={name}
              isLast={arr.length - 1 === index}
              isCurrentUser={name === user}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Header;
