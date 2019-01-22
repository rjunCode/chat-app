import React, { Component } from "react";
import ChatService from "../services/chat";
import openSocket from "socket.io-client";

const BASE_SOCKET_URL = "http://localhost:80";
const socket = openSocket(BASE_SOCKET_URL);

export const ChatContext = React.createContext();

export class ChatContextProvider extends Component {
  state = {
    rooms: [],
    messageMap: {},
    roomDetails: {}
  };

  componentDidMount() {
    socket.on("on-chat-update", ({ roomId, response }) => {
      this.updateMap("messageMap", roomId, response);
    });
  }

  updateMap(mapName, key, data, cb = () => {}) {
    this.setState(
      {
        [mapName]: {
          ...this.state[mapName],
          [key]: data
        }
      },
      cb
    );
  }

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
    this.updateMap("messageMap", id, messages);
  };

  fetchRoomDetails = async id => {
    const details = await ChatService.fetchRoomDetails(id);
    this.updateMap("roomDetails", id, details);
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
      const messages = [
        ...(this.state.messageMap[roomId] || []),
        postedMessage
      ];

      this.updateMap("messageMap", roomId, messages, () => {
        socket.emit("update-chat", { roomId });
        this.updateRoomDetails(user, roomId);
      });
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
