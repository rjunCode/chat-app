import React from "react";
import Header from "./header";
import Messages from "./messages";
import MessageInput from "./message-input";

const Messenger = ({
  selectedRoom,
  messageMap,
  fetchMessages,
  user,
  postMessage,
  roomDetails,
  fetchRoomDetails
}) => (
  <div className="messenger">
    <Header
      selectedRoom={selectedRoom}
      roomDetails={roomDetails}
      fetchRoomDetails={fetchRoomDetails}
      user={user}
    />
    <Messages
      messageMap={messageMap}
      fetchMessages={fetchMessages}
      selectedRoom={selectedRoom}
      user={user}
    />
    <MessageInput
      user={user}
      postMessage={postMessage}
      selectedRoom={selectedRoom}
    />
  </div>
);

export default Messenger;
