import TaskModel from "../models/task.model";

export async function getTask(req, res) {
  try {
    const { id } = req.params;
    const task = await TaskModel.findOne({ _id: id });
    if (!task) {
      return res.status(404).send("Task not found");
    }

    return res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

export async function getTasks(req, res) {
  try {
    const { skip = 0, limit = 10 } = req.params;
    const tasks = await TaskModel.find().skip(skip).limit(limit);

    return res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}