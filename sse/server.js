const http = require("http");
const fs = require("fs");
const path = require("path");

const getRandomInt = max => Math.floor(Math.random() * max);

http.createServer((req, res) => {
  const url = new URL(`http://${req.headers.host}${req.url}`);

  if (url.pathname === "/stream") {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    setInterval(() => {
      const data = getRandomInt(100);
      res.write(`data: ${data}\n`);
      res.write("\n");
    }, 1000);
    return;
  }

  const fileStream = fs.createReadStream(path.join(__dirname, "index.html"));
  fileStream.pipe(res);
}).listen(8000, () => {
  console.log("Server started on 8000");
});
