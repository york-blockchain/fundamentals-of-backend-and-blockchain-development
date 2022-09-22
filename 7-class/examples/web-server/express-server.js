const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.on("close", () => {
  console.log("\nclosing ports");
});

process.on("SIGINT", () => {
  server.close((err) => {
    if (err) {
      console.log("\nshutting down with error");
    } else {
      console.log("\ngracefully shutting down");
    }
  });
});
