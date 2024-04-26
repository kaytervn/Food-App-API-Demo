import express from "express";
import {
  createFood,
  deleteFood,
  getFoods,
  getFood,
  searchFoods,
  searchFoodsLazyLoading,
} from "../controllers/foodsController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/", getFoods);

router.get("/:id", getFood);

router.post("/search", searchFoods);

router.post("/searchLazyLoading", searchFoodsLazyLoading);

router.post("/", upload.single("image"), createFood);

router.delete("/:id", deleteFood);

export { router as foodsRoutes };
