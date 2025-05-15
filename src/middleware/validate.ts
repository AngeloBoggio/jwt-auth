import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRegister = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6}).withMessage('Password must be at least 6 characters long'),
  body('role').notEmpty().withMessage('Role is required').isIn(['admin', 'user', 'guest']).withMessage('Invalid role. Allowed roles are admin, user, or guest'), 

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
	return;
    }
    next(); // This allows the request to proceed to the next handler (e.g., `register`)
  },
];

export const validateSignIn = [
	body('email').isEmail().withMessage('Invalid email format'),
	body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
			return;
		}
		next();
	},
];
