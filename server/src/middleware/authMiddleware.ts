import { Request, Response, NextFunction } from "express";

// Middleware to check if user is authenticated
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check for a session or token in cookies or headers
  if (req.cookies && req.cookies.sessionToken) {
    // Perform token validation logic (e.g., check validity)
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};
