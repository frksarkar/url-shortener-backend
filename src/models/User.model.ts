import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - password
 */

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function () {
	const user = this as any;
	if (!user.isModified('password')) return;
	user.password = await bcrypt.hash(user.password, 12);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
	return bcrypt.compare(candidate, this.password);
};

export default model('User', userSchema);
