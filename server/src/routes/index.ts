import { Router } from "express";

import { login } from "../controller/auth.js"; // Directly importing the login function
import authMiddleware from "../middleware/authmiddleware.js";
import { index, show, create, update ,destroy} from "../controller/chatgroup.js";
import { groupindex, groupstore } from "../controller/chatgroupuser.js";
import { chatIndex } from "../controller/chat.js";
const router = Router();

// Auth Routes
router.post("/auth/login", login); // Use the login function directly
router.get("/chat-group", authMiddleware, index);
router.get("/chat-group/:id", show);
router.post("/chat-group", authMiddleware, create);
router.put("/chat-group/:id", authMiddleware, update);
router.delete("/chat-group/:id", authMiddleware, destroy);

router.get("/chat-group-user", groupindex);
router.post("/chat-group-user", groupstore);


router.get("/chats/:groupId", chatIndex);
export default router;
