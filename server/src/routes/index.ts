import { Router } from "express";
import cookieParser from "cookie-parser";
import { health, home } from "../controllers/homeContoller";
import oAiRoutes from "./oAiRoutes";
import contactRoutes from "./contactRoutes";
import { errorHandler } from "../middleware/errorHandler";
import { logger } from "../middleware/loggerMiddleware";
import { rateLimiter } from "../middleware/rateLimiter";

const router = Router();

// Use middleware
router.use(cookieParser());
router.use(logger); // Log requests

// Apply rate limiter to all routes
router.use(rateLimiter);

router.get("/", home); // Define the home route

// Define the health check route
router.get("/health", health);

// Define the OpenAI routes
router.use("/openai", oAiRoutes);

// Define the contact routes
router.use("/contact", contactRoutes);

// Error handling middleware
router.use(errorHandler);

export default router;
