// middleware/roleMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define your JWT Payload type
interface CustomJwtPayload extends JwtPayload {
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// Role-based Access Control Middleware
export const requireRole = (requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Use unknown first, then cast to CustomJwtPayload
      const decoded = jwt.verify(
        token,
        JWT_SECRET
      ) as unknown as CustomJwtPayload;

      if (!decoded.role) {
        return res
          .status(403)
          .json({ error: "Access denied: Role is missing in JWT" });
      }

      if (!requiredRoles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ error: "Access denied: Insufficient permissions" });
      }

      next();
    } catch (error) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
  };
};
