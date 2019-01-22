const app = require("express")();
const request = require("request");
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(80);
const BASE_URL = "http://localhost:8080/api";

function updateAllChats({ roomId }) {
  request(
    `${BASE_URL}/rooms/${roomId}/messages`,
    { json: true },
    (err, res, body) => {
      if (!err) {
        io.emit("on-chat-update", { roomId, response: body });
      }
    }
  );
}

io.on("connection", function(socket) {
  socket.on("update-chat", updateAllChats);
});
