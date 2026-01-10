import { Request, Response } from 'express';
import { User } from '../models';
import { generateToken } from '../utils';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'All fields are required' });
		}
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const user = await User.create({ name, email, password });
		const token = generateToken(user._id.toString());

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const isMatch = await (user as any).comparePassword(password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = generateToken(user._id.toString());

		res.json({
			user: { _id: user._id, name: user.name, email: user.email },
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

// @desc    Get user profile (protected)
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response) => {
	try {
		const user = await User.findById((req as any).user.id).select('-password');
		if (!user) return res.status(404).json({ message: 'User not found' });
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};
