"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const SALT_ROUNDS = 10;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    // Check if the user exists
    if (user_1.users.find((user) => user.email === email)) {
        res.status(400).json({ error: 'User already exists' });
        return;
    }
    // This try is reached once the safety conditions have been met and user input is valid
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, SALT_ROUNDS);
        // Create new user
        const newUser = {
            id: user_1.users.length + 1,
            email,
            password: hashedPassword,
            role,
        };
        user_1.users.push(newUser);
        console.log({ users: user_1.users });
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Registration Failed...' });
    }
});
exports.register = register;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Find user
    const user = user_1.users.find((user) => user.email === email);
    if (!user) {
        res.status(401).json({ error: 'Invalid Credentials' });
        return;
    }
    try {
        // Verify password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid Credentials' });
            return;
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Login Failed' });
        return;
    }
});
exports.signIn = signIn;
