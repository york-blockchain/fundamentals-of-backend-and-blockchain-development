const http = require("http");

const hostname = "127.0.0.1";
const port = 5001;

const server = http.createServer((req, res) => {
  console.log("request received");
  //    console.log(req);
  console.log(req.url);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

server.on("close", () => {
  console.log("\nclosing ports");
});

process.on("SIGINT", () => {
  server.close();
});
