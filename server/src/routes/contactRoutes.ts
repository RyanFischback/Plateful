import { Router } from "express";
import { sendEmail } from "../controllers/homeContoller";

const router = Router();

router.post("/send", sendEmail);

export default router;
