import express from "express";
import {
  loginUser,
  registerUser,
  updateUser,
  getUser,
} from "../controllers/usersController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/:id", getUser);

router.post("/", registerUser);

router.post("/login", loginUser);

router.put("/:id", upload.single("image"), updateUser);

export { router as usersRoutes };
