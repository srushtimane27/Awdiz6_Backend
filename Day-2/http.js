const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req, "req");

    if(req.method === "GET" && req.url === "/animal"){
        res.end("Lion");
    } else if(req.method === "GET" && req.url === "/welcome"){
        res.end("Welcome");
    } else if(req.method === "GET" && req.url === "/bye"){
        res.end("bye");
    } else {
        res.end("undefined url");
    }
});

server.listen(3001, () => {
    console.log("Server Listening on port 3001");
})