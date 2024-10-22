import { Server, Socket } from "socket.io";
// import { produceMessage } from "./helper.js";
import prisma from "./config/db.js";
interface CustomSocket extends Socket {
  room?: string;
}
export function setupSocket(io: Server) {
  io.use(async (socket: CustomSocket, next) => {
    const { room } = socket.handshake.auth;
    if (!room) {
      return next(new Error("Invalid room"));
    }
    socket.room = room;
    next();
  });
  
  io.on("connection", (socket: CustomSocket) => {
    // * Join the room
    socket.join(socket.room);

    socket.on("message", async (data) => {
      console.log("Message received:", data);
      await prisma.chats.create({
        data: data,
      });
      socket.to(socket.room).emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}