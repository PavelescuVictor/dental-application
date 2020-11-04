const http = require("http");
const fs = require("fs");
const httpPort = 8080;

http.createServer((req, res) => {
    let fileToLoad = "index.html";

    if (req.url !== "/" && fs.existsSync(`./${req.url}`)) {
        filetoRead = `./${req.url}`;
    }

    fs.readFile(filetoRead, "utf-8", (err, content) => {
        if (err) {
            console.log(`Unable to open ${filetoRead} file.`);
        }
        res.end(content);
    });
}).listen(httpPort);
