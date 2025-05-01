import { Server as WebSocketServer } from "ws";
import { Server as HttpServer } from "http";
import { startEthWebSocket } from "../services/ethSocket";

export const setupWebSocket = (server: HttpServer) => {
  const wss = new WebSocketServer({ server });

  // tokenListener(wss);
  startEthWebSocket(wss);

  wss.on("connection", ws => {
    console.log("Client connected to WebSocket");

    ws.on("close", () => {
      console.log("Client disconnected from WebSocket");
    });
  });
};
