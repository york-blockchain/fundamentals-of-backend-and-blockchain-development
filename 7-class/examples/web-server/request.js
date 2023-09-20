var request = require("request");

request(`http://localhost:${process.argv[2]}`, function (error, response, body) {
console.log(body);
});
