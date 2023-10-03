const http = require("http");

const hostname = "127.0.0.1";

const server = http.createServer((req, res) => {
  console.log("request received");
  console.log(req.url);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(process.argv[2], hostname, () => {
  console.log(`Server running at http://${hostname}:${process.argv[2]}/`);
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