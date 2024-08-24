import { Router } from "express";
import rateLimit from "express-rate-limit";

// Configure rate limiter
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 5 requests per windowMs
  message: "Too many requests, please try again later.",
});

// Apply rate limiter to specific routes
export const applyRateLimiter = (router: Router) => {
  router.use(rateLimiter);
};
