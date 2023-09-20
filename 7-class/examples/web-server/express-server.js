const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log("request received");
  console.log(req.url);
  res.send("Hello World!");
});

const server = app.listen(process.argv[2], () => {
  console.log(`Example app listening on port ${port}`);
});


// Handle graceful shutdown on SIGINT (Ctrl+C) or SIGTERM (e.g., from process manager)
process.on('SIGINT', () => {
  process.stdout.clearLine();
  // Move the cursor to the beginning of the line
  process.stdout.cursorTo(0);
  console.log('Closing server gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});