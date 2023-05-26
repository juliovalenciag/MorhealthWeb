import express from "express";
import { loginPro, logoutPro, registerPro, verifyProfesional } from "../controllers/profesional.js";


const router = express.Router();

router.post("/registerPro", registerPro);
router.post("/loginPro", loginPro);
router.post("/logoutPro", logoutPro);

router.get('/p', verifyProfesional)

export default router;
