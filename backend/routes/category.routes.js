import { Router } from "express";
import { createCategory, getUserCategories } from "../controller/category.controller.js";

const router = Router();

router.post("/", createCategory);

router.get("/", getUserCategories);

export default router;