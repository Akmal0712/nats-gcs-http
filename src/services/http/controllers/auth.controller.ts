import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function auth(req: Request, res: Response) {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).send("Bad Request");
    }

    const user = await UserModel.findOne({ login });
    console.log(!bcrypt.compareSync(password, user.password));

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, type: "jwt" }, process.env.JWT_SECRET, { expiresIn: "24h" });

    return res.json({ token: `Bearer ${token}` });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { login, password } = req.body;

    const user = await UserModel.findOne({ login });

    if (user) {
      return res.status(401).json({ message: "User with this login is exist" });
    }

    const [newUser] = await UserModel.insertMany([{ login, password: bcrypt.hashSync(password, 10) }]);

    res.json({ ...newUser, password: null });
  }
  catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}