import express from 'express';
import { loginUser, registerUser,getUser } from '../controllers/userController.js';
import requireAuth from '../middleware/requireAuth.js';
const router = express.Router();

router.post("/login",loginUser);
router.post("/register",registerUser);
router.get("/getuser", requireAuth, getUser)
router.get("/test", (req, res) => {
    console.log("HIT USER TEST - PID:", process.pid);

    res.json({
        message: "OK",
        pid: process.pid
    });
});
export default router;
