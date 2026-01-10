import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
	let token = req.headers.authorization;

	if (token && token.startsWith('Bearer ')) {
		try {
			token = token.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
			(req as any).user = { id: decoded.id };
			next();
		} catch (err) {
			return res.status(401).json({ message: 'Not authorized, token failed' });
		}
	} else {
		return res.status(401).json({ message: 'Not authorized, no token' });
	}
};
