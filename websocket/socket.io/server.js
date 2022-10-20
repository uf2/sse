const http = require('http')
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const getRandomInt = max => Math.floor(Math.random() * max);

const httpServer = http.createServer((req, res) => {
  const fileStream = fs.createReadStream(path.join(__dirname, "index.html"));
  fileStream.pipe(res);
});

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET"]
  }
})

httpServer.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

io.on("connection", (socket) => {
  setInterval(() => {
    const data = getRandomInt(100);
    socket.emit('message', data);
  }, 1000);
});
