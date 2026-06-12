import express from "express"
import { addTask, getTask, removeTask} from "../controllers/taskController.js"
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.post("/addTask", requireAuth, addTask)
router.get("/getTask",requireAuth, getTask)
router.get("/removeTask",requireAuth, removeTask)

router.get("/test", (req, res) => {
    console.log("Hit backend PID:", process.pid);
    res.json({
        message: "OK",
        pid: process.pid
    });
});

export default router;
