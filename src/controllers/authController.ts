import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users, User } from '../models/user';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body;

  // Check if the user exists
  if (users.find((user) => user.email === email)) {
    res.status(400).json({ error: 'User already exists' });
	return;
  }
  
  // This try is reached once the safety conditions have been met and user input is valid
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user
    const newUser: User = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      role, 
    };

    users.push(newUser);
    console.log({users});

    // Generate JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Registration Failed...' });
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Find user
  const user = users.find((user) => user.email === email);
  if (!user) {
    res.status(401).json({ error: 'Invalid Credentials' });
	return;
  }

  try {
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid Credentials' });
	return;
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login Failed' });
	return;
  }
};


