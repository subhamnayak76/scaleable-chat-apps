import { Request, Response } from "express";
import prisma from "../config/db.js";

export const index = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const chatGroups = await prisma.chatGroup.findMany({
      where: {
        user_id: Number(user.id),
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return res.json({ data: chatGroups });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong. Please try again!" });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id) {
      const chatGroup = await prisma.chatGroup.findUnique({
        where: {
          id: id,
        },
      });
      if (chatGroup) {
        return res.json({ data: chatGroup });
      }
      return res.status(404).json({ message: "No group found" });
    }
    return res.status(404).json({ message: "No group ID provided" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong. Please try again!" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const user = req.user;
    await prisma.chatGroup.create({
      data: {
        title: body.title,
        passcode: body.passcode,
        user_id: Number(user.id),
      },
    });
    return res.json({ message: "Chat group created successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong. Please try again!" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    if (id) {
      await prisma.chatGroup.update({
        data: body,
        where: {
          id: id,
        },
      });
      return res.json({ message: "Group updated successfully!" });
    }
    return res.status(404).json({ message: "No group ID provided" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong. Please try again!" });
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id) {
      await prisma.chatGroup.delete({
        where: {
          id: id,
        },
      });
      return res.json({ message: "Group deleted successfully!" });
    }
    return res.status(404).json({ message: "No group ID provided" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong. Please try again!" });
  }
};
