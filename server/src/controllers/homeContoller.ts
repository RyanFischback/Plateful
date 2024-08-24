import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to generate a unique session ID or token
const generateSessionToken = (): string => {
  return uuidv4();
};

// Controller function for the home route
export const home = (req: Request, res: Response) => {
  if (!req.cookies || !req.cookies.sessionToken) {
    const sessionToken = generateSessionToken();

    res.cookie("sessionToken", sessionToken, {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res
      .status(200)
      .json({ message: "Welcome! Cookie has been set", sessionToken });
  }

  res
    .status(200)
    .json({ message: "Welcome back!", sessionToken: req.cookies.sessionToken });
};

export const sendEmail = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await transporter.sendMail({
      from: email, // The email address captured from the frontend
      to: process.env.EMAIL_USER, // Use the email address specified in .env
      subject: "Coverly Inquiry",
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    });

    res.status(200).json({ success: "Message sent successfully, Thank you!" });
  } catch (error: any) {
    if (error.status === 429) {
      res.status(429).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const health = (req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
};
