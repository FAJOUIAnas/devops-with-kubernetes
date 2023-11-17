const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "log.txt");
const crypto = require('crypto');

function hashString(inputString) {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    const hashedString = hash.digest('hex');
    return hashedString;
}

const server = http.createServer((req, res) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return console.log("Failed to read file", "--------", err);
        const hash = hashString(content);
        res.statusCode == 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(hash + " : " + content);
    });
});

console.log("Server started in port " + port);
server.listen(port);