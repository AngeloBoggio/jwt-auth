import { Router } from "express";
import { register, signIn } from "../controllers/authController";
import { validateRegister, validateSignIn } from "../middleware/validate";
import asyncHandler from "express-async-handler";
import { requireRole } from "../middleware/roleMiddleware";
import { dashboard } from "../controllers/dashboardController";

const router = Router();

// Register route
router.post("/register", validateRegister, asyncHandler(register));

// Signin route
router.post("/signin", validateSignIn, asyncHandler(signIn));

// Restricted route
router.post("/dashboard", requireRole(["admin"]), asyncHandler(dashboard));

export default router;
