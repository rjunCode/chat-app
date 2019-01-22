import React, { Component } from "react";
import ChatService from "../services/chat";

export const ChatContext = React.createContext();

export class ChatContextProvider extends Component {
  state = {
    rooms: [],
    messageMap: {},
    roomDetails: {}
  };

  fetchChatRooms = async () => {
    const rooms = await ChatService.fetch();
    this.setState({ rooms });
  };

  setSelectedRoom = selectedRoom => {
    this.setState({
      selectedRoom
    });
  };

  fetchMessages = async id => {
    const messages = await ChatService.fetchMessages(id);
    this.setState({
      messageMap: {
        ...this.state.messageMap,
        [id]: messages
      }
    });
  };

  fetchRoomDetails = async id => {
    const details = await ChatService.fetchRoomDetails(id);
    this.setState({
      roomDetails: {
        ...this.state.roomDetails,
        [id]: details
      }
    });
  };

  updateRoomDetails(user, roomId) {
    const roomDetails = this.state.roomDetails[roomId] || {};
    if (!roomDetails.users.find(name => user === name)) {
      this.fetchRoomDetails(roomId);
    }
  }

  postMessage = async (roomId, user, message) => {
    const postedMessage = await ChatService.postMessage(roomId, message, user);
    if (!postedMessage.error) {
      const { messageMap } = this.state;
      this.setState(
        {
          messageMap: {
            ...messageMap,
            [roomId]: [...(messageMap[roomId] || []), postedMessage]
          }
        },
        () => this.updateRoomDetails(user, roomId)
      );
    }

    return postedMessage;
  };

  render() {
    return (
      <ChatContext.Provider
        value={{
          ...this.state,
          fetchChatRooms: this.fetchChatRooms,
          setSelectedRoom: this.setSelectedRoom,
          fetchMessages: this.fetchMessages,
          postMessage: this.postMessage,
          fetchRoomDetails: this.fetchRoomDetails
        }}
      >
        {this.props.children}
      </ChatContext.Provider>
    );
  }
}
