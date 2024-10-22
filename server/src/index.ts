import cors from "cors";
import express, { Request, Response } from "express";
import router from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";;
import  redis from "./config/redis.js";
// import { instrument } from "@socket.io/admin-ui";
const app = express();
const PORT = process.env.PORT || 8000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
  adapter: createAdapter(redis),

});

// instrument(io, {
//   auth: false,
//   mode: "development",
// });

setupSocket(io);
export { io }
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Test route
app.get("/", (req: Request, res: Response) => {
    return res.send("It's working 🚀");
});

// API routes

app.use('/api',router)

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));