"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
// Role-based Access Control Middleware
const requireRole = (requiredRoles) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ error: "Authorization header is missing" });
            return;
        }
        const token = authHeader.split(" ")[1];
        try {
            // Use unknown first, then cast to CustomJwtPayload
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            if (!decoded.role) {
                res
                    .status(403)
                    .json({ error: "Access denied: Role is missing in JWT" });
                return;
            }
            if (!requiredRoles.includes(decoded.role)) {
                res
                    .status(403)
                    .json({ error: "Access denied: Insufficient permissions" });
                return;
            }
            next();
        }
        catch (error) {
            res.status(403).json({ error: "Invalid or expired token" });
            return;
        }
    };
};
exports.requireRole = requireRole;
