import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import * as process from "process";
export async function verify(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [, token] = authorization.split(" ");

    if (!jwt.verify(token, process.env.JWT_SECRET)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  }
  catch (e) {
    res.status(401).json({ message: e.message });
  }
}