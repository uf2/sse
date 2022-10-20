const ws = require("ws");
const {Server} = ws;

const getRandomInt = max => Math.floor(Math.random() * max);

const wss = new Server({port: 8000});

wss.on("connection", (ws) => {
  setInterval(() => {
    const data = getRandomInt(100);
    ws.send(data);
  }, 1000);
})

