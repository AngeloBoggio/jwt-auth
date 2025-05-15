"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validate_1 = require("../middleware/validate");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = (0, express_1.Router)();
// Register route
router.post('/register', validate_1.validateRegister, (0, express_async_handler_1.default)(authController_1.register));
// Signin route
router.post('/signin', validate_1.validateSignIn, (0, express_async_handler_1.default)(authController_1.signIn));
exports.default = router;
