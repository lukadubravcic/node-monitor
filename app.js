const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;
const deltaTime = 250;

io.on("connection", socket => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(
        () => getApiAndEmit(socket),
        deltaTime
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
});

const getApiAndEmit = async socket => {
    try {
        const cpuUsage = Math.floor(Math.random() * 100);
        const memUsage = Math.floor(Math.random() * 100);
        // dohvati cpu/mem 
        socket.emit("FromAPI", {
            cpuUsage: cpuUsage,
            memUsage: memUsage,
        });
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};


server.listen(port, () => console.log(`Listening on port ${port}`));
