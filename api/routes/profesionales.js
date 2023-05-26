import express from "express";
import { loginP, logoutP, registerP } from "../controllers/profesional.js";

const router = express.Router();

router.post("/registro", registerP);
router.post("/login", loginP);
router.post("/logout", logoutP);

export default router;
