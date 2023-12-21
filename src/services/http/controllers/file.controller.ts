import { Request, Response } from "express";
import TaskModel from "../models/task.model";
import { gcs, messageQueue } from "../singletones";

export async function upload(req: Request, res: Response) {
  try {
    if (!req.files.file) {
      return res.status(400).send("No file uploaded.");
    }

    const task = await TaskModel.insertMany([{ status: "pending" }]);
    await gcs.upload(req.files.file, task[0]._id.toString());
    await messageQueue.publish("tasks", task[0]._id.toString());

    return res.json({ message: "File uploaded." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
}
