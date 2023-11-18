const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require('crypto');

const port = 3002;

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "pongs.txt");

var rotatingstring;

function hashString(inputString) {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    const hashedString = hash.digest('hex');
    return hashedString;
}

const getString = () => {
    const date = new Date();
    const hash = hashString(date.toString());
    rotatingstring = date.toString() + " : " + hash;
    setTimeout(getString, 5000);
}

const server = http.createServer((req, res) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return res.end("Failed to read file");
        res.statusCode == 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(rotatingstring + "\n" + content);
    });
});

getString();
console.log("Server started in port " + port);
server.listen(port);