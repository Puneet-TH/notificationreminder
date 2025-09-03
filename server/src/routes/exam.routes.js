import { Router } from "express";
import { createExam, 
    sendUserNotifications, 
    stopNotificationJob,
    startNotificationJob } from "../controllers/exam.controllers.js";
import { verifyJWT } from "../middleware/isAuthenticated.js";

const router = Router();
//all are protected routes requiring singup
router.route("/create-exam").post(verifyJWT,createExam)
router.route("/sendUserNotifications").post(verifyJWT, sendUserNotifications)
router.route("/startNotificationJob").post(verifyJWT, startNotificationJob)
router.route("/stopNotificationJob").post(verifyJWT, stopNotificationJob)

export default router