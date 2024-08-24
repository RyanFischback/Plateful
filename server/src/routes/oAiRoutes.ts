import { Router } from "express";
import { generateMealPlan } from "../controllers/oAiController";

const router = Router();

// Define the route for handling OpenAI requests
router.post("/generateMealPlan", generateMealPlan);

export default router;
