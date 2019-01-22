import React, { Component, Fragment } from "react";
import NavBar from "../nav-bar";
import Messenger from "../messenger";
import { ChatContext, ChatContextProvider } from "../../contexts/chat";

class ChatProvider extends Component {
  render() {
    return (
      <div className="chat-container">
        <ChatContextProvider>
          <ChatContext.Consumer>
            {({
              rooms,
              messageMap,
              roomDetails,
              fetchChatRooms,
              fetchMessages,
              selectedRoom,
              setSelectedRoom,
              postMessage,
              fetchRoomDetails
            }) => (
              <Fragment>
                <NavBar
                  user={this.props.user}
                  rooms={rooms}
                  time={this.props.time}
                  fetchChatRooms={fetchChatRooms}
                  setSelectedRoom={setSelectedRoom}
                  selectedRoom={selectedRoom}
                />
                {selectedRoom !== undefined ? (
                  <Messenger
                    key={selectedRoom}
                    roomDetails={roomDetails}
                    fetchRoomDetails={fetchRoomDetails}
                    fetchMessages={fetchMessages}
                    selectedRoom={selectedRoom}
                    messageMap={messageMap}
                    postMessage={postMessage}
                    user={this.props.user}
                  />
                ) : (
                  <div className="selection-placeholder">
                    Select a chat room to get started!
                  </div>
                )}
              </Fragment>
            )}
          </ChatContext.Consumer>
        </ChatContextProvider>
      </div>
    );
  }
}

export default ChatProvider;
