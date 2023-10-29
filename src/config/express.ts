import * as bodyParser from "body-parser";
import express from "express";
const morgan = require("morgan");

import authenticate from "../middleware/authenticate";
import application from "../constants/application";
import indexRoute from "../routes/index.route";
import joiErrorHandler from "../middleware/joiErrorHandler";
import * as errorHandler from "../middleware/apiErrorHandler";
import IdentiFy from "../middleware/sessionHandler";
// import http from "http";
const http = require("http");
const WebSocket = require("ws");

const { Server } = require("socket.io");

const cors = require("cors");
const app = express();

const whitelist = [""];
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  exposedHeaders: ["set-cookie"],
  preflightContinue: false,
  allowedHeaders: [
    "Content-Type",
    "X-Requested-With",
    "X-HTTP-Method-Override",
    "Accept",
    "ats_cookie",
  ],
};

const corsOptions2 = {
  origin: ["*"],
  credentials: true,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  exposedHeaders: ["set-cookie"],
  preflightContinue: false,
  allowedHeaders: [
    "Content-Type",
    "X-Requested-With",
    "X-HTTP-Method-Override",
    "Accept",
    "ats_cookie",
  ],
};

require("dotenv").config();

app.use(cors(corsOptions));

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, ats_cookie"
  );
  next();
};

// app.use(allowCrossDomain);

app.use(bodyParser.json({ limit: "5mb" }));
// app.use(express.static(__dirname + '/public'));
app.use(morgan("dev"));

app.use(authenticate);

// Router
app.use(application.url.base, indexRoute);

// Joi Error Handler
app.use(joiErrorHandler);
// Error Handler
app.use(errorHandler.notFoundErrorHandler);

app.use(errorHandler.errorHandler);

const httpSocket = http.createServer(app);

const SOCKET_PORT = process.env.SOCKET_PORT || 5001;
const env = process.env.NODE_ENV;
let wsoption = {
  port: SOCKET_PORT,
};

if (env == "staging" || env == "production") {
  const fs = require("fs");
  wsoption["key"] = fs.readFileSync(process.env.KEY) || "";
  wsoption["cert"] = fs.readFileSync(process.env.CERT) || "";
}
const wss = new WebSocket.Server(wsoption);

const clients = new Set();
const clientConnections: any = {};

wss.on("connection", async (ws, req) => {
  if (req) {
  }

  ws.send("connection established");

  clients.add(ws);
  try {
    const user = await IdentiFy(req);
    // console.log("user", user);
    if (user) {
      clientConnections[user.id] = ws;
    }
  } catch (e) {
    console.log("wss error", e);
  }

  // Handle incoming messages from clients
  ws.on("message", (message) => {
    // console.log("Received message:", message);
    // Emit a custom event back to the client
    // ws.send("Server says hello!");
  });

  // Handle client disconnection
  ws.on("close", () => {
    // console.log("A client disconnected");

    // Remove the client from the set of connected clients
    clients.delete(ws);
  });
});

// console.log("clients", clients);

const SendMessageToClient = (user_id, event, message) => {
  const ws: any = clientConnections[user_id];
  // const ws: any = [...clients][0];
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(event, message);
  } else {
    // console.log(`connection is closed for user id ${user_id}`);
  }
};

// Send heartbeat messages to all connected clients every 30 seconds
setInterval(() => {
  clients.forEach((client: any) => {
    if (client.connected) {
      client.sendUTF("heartbeat");
    }
  });
}, 30000);

export { app, httpSocket, SendMessageToClient };
