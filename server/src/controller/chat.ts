import { Request, Response } from "express";
import prisma from "../config/db.js";

// Fetch chats based on group_id
export const chatIndex = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const chats = await prisma.chats.findMany({
      where: {
        group_id: groupId,
      },
    });
    return res.json({ data: chats });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again!" });
  }
};

