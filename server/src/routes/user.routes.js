import { Router } from "express";
import { login, logout } from "../controllers/user.controllers.js";
import { signup } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/isAuthenticated.js"

const router = Router()

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").post(logout)

export default router
