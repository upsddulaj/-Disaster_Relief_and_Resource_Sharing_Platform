import jwt from 'jsonwebtoken';

export const generateToken = (payload, expiresIn = '7d') =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
