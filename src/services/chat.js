const BASE_URL = "http://localhost:8080/api";
const ChatService = {
  async fetch() {
    const response = await fetch(`${BASE_URL}/rooms`);
    return response.json();
  },

  async fetchMessages(id) {
    const response = await fetch(`${BASE_URL}/rooms/${id}/messages`);
    return response.json();
  },

  async fetchRoomDetails(id) {
    const response = await fetch(`${BASE_URL}/rooms/${id}`);
    return response.json();
  },

  async postMessage(roomId, message, user) {
    const response = await fetch(`${BASE_URL}/rooms/${roomId}/messages`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify({ name: user, message })
    });
    return response.json();
  }
};

export default ChatService;
