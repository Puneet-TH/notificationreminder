import { Router } from "express";
import { login } from "../controllers/user.controllers.js";
import { signup } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/isAuthenticated.js"

const router = Router()

router.route("/signup").post(signup)
router.route("/login").post(login)

export default router
