import express from "express";
import { upload } from "../controllers/file.controller";
import { verify } from "../middleware/auth";
import { register, auth } from "../controllers/auth.controller";
import { getTask, getTasks } from "../controllers/task.controller";
const router = express.Router();

router.post("/upload", verify, upload);
router.post("/register", register);
router.post("/auth", auth);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTask);

export default router;