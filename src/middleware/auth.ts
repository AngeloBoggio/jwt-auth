import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token){
        return res.status(401).json({error: 'Access token required'});
    }
    
    jwt.verify(token,JWT_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({error: "Invalid or expired token"});
        }
        (req as any).user = user;
        next();
    });
};
