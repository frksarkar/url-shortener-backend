import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { SignOptions } from 'jsonwebtoken';

interface JwtPayload {
	id: string;
}

export const generateToken = (id: string): string => {
	const secret = process.env.JWT_SECRET!;
	const payload: JwtPayload = { id };
	const options: SignOptions = {
		expiresIn: Number(process.env.JWT_EXPIRE) || 604800, // 604800 seconds = 7 days
	};

	return jwt.sign(payload, secret, options);
};
