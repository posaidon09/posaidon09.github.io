const express = require("express");
const ipfilter = require('express-ipfilter').IpFilter
const ip = require('ip').address();
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const app = express();
const cors = require("cors");
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: '*', // Allow requests from this origin
    methods: 'GET,POST', // Allow only GET and POST requests
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

app.get("/ping", (_, res) => {
    res.status(200).json({ message: "Pong!" });
})

io.on('connection', (socket) => {

    socket.on("download", (obj) => {
        console.log(obj);
    socket.emit("progress", 10);
    });
});

server.listen(process.env.BACKEND_PORT ?? 3333, () => console.log("[BACKEND]: Ready on port " + process.env.BACKEND_PORT ?? 3333));