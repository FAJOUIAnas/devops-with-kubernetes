const http = require("http");
var request = require("request");
const fs = require("fs");
const path = require("path");

const port = 3001;

const directory = path.join("files");
const filePath = path.join(directory, "date.txt");
const imagePath = path.join(directory, "image.png");

function downloadImage() {
    var url = "https://picsum.photos/1200";
    request.head(url, function(err, res, body) {
        request(url).pipe(fs.createWriteStream(imagePath)).on("close", function(){console.log("Image downloaded.")});
    });
}

function dateMaker(oldDate) {
    var newDate = new Date();
    var month = newDate.getUTCMonth() + 1;
    var day = newDate.getUTCDate();
    var year = newDate.getUTCFullYear();
    finalDate = day + "/" + month + "/" + year;
    return finalDate;
}

const server = http.createServer((req, res) => {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            return res.end("Failed to read file");
        }
        var currentDate = dateMaker(new Date());
        if (content == currentDate) {
            res.statusCode == 200;
            res.setHeader("Content-Type", "image/png");
            var img = fs.readFileSync(imagePath);
            res.end(img, "binary");
        } else {
            fs.writeFile(filePath, currentDate, err => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Something written to date file")
                }
            });
            downloadImage();
            res.statusCode == 200;
            res.setHeader("Content-Type", "image/png");
            var img = fs.readFileSync(imagePath);
            res.end(img, "binary");
        }  
    });
});

console.log("Server started in port " + port);
server.listen(port);