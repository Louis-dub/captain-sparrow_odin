const http = require("http");
const fs = require("fs");
const path = require("path");

const types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".ico": "image/x-icon",
};

const server = http.createServer((request, response) => {
    let filePath = "";
    
    if (request.url === "/")
        filePath = path.join(__dirname, "index.html");
    else if (request.url === "/about")
        filePath = path.join(__dirname, "about.html");
    else if (request.url === "/contact-me")
        filePath = path.join(__dirname, "contact.html");
    else if (request.url.startsWith("/public"))
        filePath = path.join(__dirname, request.url);
    else
        filePath = path.join(__dirname, "404.html");

    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.statusCode = 404;
            response.setHeader('Content-Type', types[ext] || "application/octet-stream");
            response.end("404 Not Found");
            return;
        }
        response.statusCode = 200;
        const ext = path.extname(filePath).toLowerCase();
        response.setHeader('Content-Type', types[ext] || "application/octet-stream");
        response.end(data);
    });
        
});

server.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
