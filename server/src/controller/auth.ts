import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

interface LoginPayloadType {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image: string;
}

export const login = async (req: Request, res: Response) => {
  try {
    const body: LoginPayloadType = req.body;

    let user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          oauth_id: body.oauth_id,
          provider: body.provider,
          image: body.image,
        },
      });
    }

    const JWTPayload = {
      name: body.name,
      email: body.email,
      id: user.id,
    };

    const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    return res.json({
      message: "Logged in successfully!",
      user: {
        ...user,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again!",
    });
  }
};
